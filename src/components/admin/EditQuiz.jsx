import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { getQuiz, editQuiz } from '../../api/admin';
import { toast } from 'react-toastify';

const EditQuiz = ({ quizId }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [editedQuestions, setEditedQuestions] = useState({});
    const [correctAnswerId, setCorrectAnswerId] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            createdBy: "",
            description: "",
            questions: []
        },
        onSubmit: (values) => {
            const updatedQuestions = values.questions.map(q =>
                editedQuestions[q._id] ? { ...q, ...editedQuestions[q._id] } : q
            );
            const updatedQuestionsWithCorrectAnswer = updatedQuestions.map(q => ({
                ...q,
                isCorrect: q.options.filter(o => o._id === correctAnswerId)
            }));

            const updatedValues = { ...values, questions: updatedQuestionsWithCorrectAnswer };

            editQuiz(quizId, updatedValues)
                .then(() => {
                    toast.success('Quiz updated successfully');
                    setEditedQuestions({});
                    setCorrectAnswerId(null);
                })
                .catch(error => {
                    toast.error('Error updating quiz: ' + error.message);
                });
        }
    });

    useEffect(() => {
        getQuiz(quizId)
            .then(quiz => {
                formik.setValues(quiz.data.quiz);
            })
            .catch(error => {
                toast.error('Error fetching quiz: ' + error.message);
            });
    }, [quizId]);

    const handleQuestionSelect = (question) => {
        setSelectedQuestion(question);
        const correctOption = question.options.find(option => option.isCorrect);
        setCorrectAnswerId(correctOption ? correctOption._id : null);
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuestion(prev => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...selectedQuestion.options];
        updatedOptions[index] = { ...updatedOptions[index], [field]: value };
        setSelectedQuestion(prev => ({ ...prev, options: updatedOptions }));
    };

    const handleCorrectAnswerChange = (index) => {
        const selectedOption = selectedQuestion.options[index];
        setCorrectAnswerId(selectedOption._id);
    };

    const saveQuestionChanges = () => {
        if (selectedQuestion) {
            setEditedQuestions(prev => ({
                ...prev,
                [selectedQuestion._id]: selectedQuestion
            }));
            toast.success('Question changes saved');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-6xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Quiz</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Edit Question</h3>
                            {selectedQuestion && (
                                <>
                                    <input
                                        name="text"
                                        type="text"
                                        value={selectedQuestion.text}
                                        onChange={handleQuestionChange}
                                        placeholder="Enter the question"
                                        className="w-full p-2 mb-2 border rounded-md"
                                    />
                                    {selectedQuestion.options.map((option, index) => (
                                        <div key={option._id} className="mb-2">
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                                placeholder={`Option ${index + 1}`}
                                                className="w-full p-2 mb-1 border rounded-md"
                                            />
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`correct-${index}`}
                                                    name="correctAnswer"
                                                    checked={option._id === correctAnswerId}
                                                    onChange={() => handleCorrectAnswerChange(index)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`correct-${index}`}>Correct Answer</label>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={saveQuestionChanges}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                                    >
                                        Save Question Changes
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Quiz Details</h3>
                            <input
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                placeholder="Quiz Title"
                                className="w-full p-2 mb-2 border rounded-md"
                            />
                            <input
                                name="createdBy"
                                type="text"
                                value={formik.values.createdBy}
                                onChange={formik.handleChange}
                                placeholder="Creator Name"
                                className="w-full p-2 mb-2 border rounded-md"
                            />
                            <textarea
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                placeholder="Quiz Description"
                                className="w-full p-2 mb-2 border rounded-md"
                            />
                            <h4 className="text-lg font-semibold mb-2">Questions:</h4>
                            {formik.values.questions.map((q, index) => (
                                <div key={q._id} className="mb-2 p-2 bg-gray-200 rounded">
                                    <p><strong>Q{index + 1}:</strong> {q.text}</p>
                                    <button
                                        type="button"
                                        onClick={() => handleQuestionSelect(q)}
                                        className="text-blue-500 text-sm mr-2"
                                    >
                                        Edit
                                    </button>
                                    {editedQuestions[q._id] && (
                                        <span className="text-green-500 text-sm">Edited</span>
                                    )}
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                            >
                                Save All Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuiz;