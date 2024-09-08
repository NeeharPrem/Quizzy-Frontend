import React, { useState } from "react";
import { useFormik } from "formik";
import { addquiz } from "../../api/user";
import { toast } from "react-toastify";

const QuizForm = () => {
    const [currentQuestion, setCurrentQuestion] = useState({
        question: "",
        options: ["", "", "", ""],
        correct: ""
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            creater: "",
            description: "",
            questions: []
        },
        onSubmit: (values) => {
            if (values.questions.length < 5) {
                toast.error('Need Minimum 5 questions');
                return;
            }
            addquiz(values)
                .then(() => {
                    toast.success('Quiz created successfully');
                    formik.resetForm();
                    setCurrentQuestion({
                        question: "",
                        options: ["", "", "", ""],
                        correct: ""
                    });
                })
                .catch(error => {
                    toast.error('Error creating quiz: ' + error.message);
                });
        }
    });

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            [name]: value
        }));
    };

    const handleOptionChange = (index, value) => {
        setCurrentQuestion(prevQuestion => ({
            ...prevQuestion,
            options: prevQuestion.options.map((opt, i) => i === index ? value : opt)
        }));
    };

    const addQuestion = () => {
        if (currentQuestion.question && currentQuestion.options.every(opt => opt) && currentQuestion.correct) {
            formik.setFieldValue("questions", [
                ...formik.values.questions,
                currentQuestion
            ]);
            setCurrentQuestion({
                question: "",
                options: ["", "", "", ""],
                correct: ""
            });
        } else {
            toast.error('Please fill all fields for the question correctly');
        }
    };

    const removeQuestion = (index) => {
        const updatedQuestions = formik.values.questions.filter((_, i) => i !== index);
        formik.setFieldValue("questions", updatedQuestions);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="flex">
            <div className="w-1/2 p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Add Question</h2>
                <input
                    name="question"
                    type="text"
                    value={currentQuestion.question}
                    onChange={handleQuestionChange}
                    placeholder="Enter the question"
                    className="w-full p-2 mb-2 border rounded-md"
                />
                {currentQuestion.options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                ))}
                <div className="mb-2">
                    <label className="block font-semibold mb-1">Correct Answer:</label>
                    <select
                        name="correct"
                        value={currentQuestion.correct}
                        onChange={handleQuestionChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select correct answer</option>
                        {currentQuestion.options.map((option, index) => (
                            <option key={index} value={option}>{option || `Option ${index + 1}`}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                    Add Question
                </button>
            </div>

            <div className="max-w-10 border-2 ml-2"></div>

            <div className="w-1/2 p-4 overflow-auto">
                <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
                <input
                    name="title"
                    type="text"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Quiz Title"
                    className="w-full p-2 mb-2 border rounded-md"
                />
                <input
                    name="creater"
                    type="text"
                    value={formik.values.creater}
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
                <h3 className="text-lg font-semibold mb-2">Added Questions:</h3>
                {formik.values.questions.map((q, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-200 rounded">
                        <p><strong>Q{index + 1}:</strong> {q.question}</p>
                        <button
                            type="button"
                            onClick={() => removeQuestion(index)}
                            className="text-red-500 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
                >
                    Create Quiz
                </button>
            </div>
        </form>
    );
};

export default QuizForm;
