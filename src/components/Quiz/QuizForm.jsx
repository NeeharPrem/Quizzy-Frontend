import React, { useState } from "react";
import { addquiz } from "../../api/user";
import { toast } from "react-toastify";

const QuizForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: "",
        options: ["", "", "", ""],
        correct: ""
    });

    const handleQuestionChange = (event) => {
        setCurrentQuestion({ ...currentQuestion, question: event.target.value });
    };

    const handleOptionChange = (index, event) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = event.target.value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const handleCorrectAnswer = (event) => {
        setCurrentQuestion({ ...currentQuestion, correct: event.target.value });
    };

    const addQuestion = () => {
        if (currentQuestion.question && currentQuestion.options.every(opt => opt) && currentQuestion.correct) {
            setQuestions([...questions, currentQuestion]);
            setCurrentQuestion({ question: "", options: ["", "", "", ""], correct: "" });
        } else {
            toast.error('Please fill all fields for the question');
        }
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (questions.length < 5) {
            return toast.error('Need Minimum 5 questions');
        }
        const data = { title, description, questions };
        addquiz(data);
    };

    return (
        <div className="flex">
            <div className="w-1/2 p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Add Question</h2>
                <input
                    type="text"
                    placeholder="Enter the question"
                    value={currentQuestion.question}
                    onChange={handleQuestionChange}
                    className="w-full p-2 mb-2 border rounded-md"
                />
                {currentQuestion.options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e)}
                        className="w-full p-2 mb-2 border rounded-md"
                    />
                ))}
                <div className="mb-2">
                    <label className="block font-semibold mb-1">Correct Answer:</label>
                    <select
                        value={currentQuestion.correct}
                        onChange={handleCorrectAnswer}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select correct answer</option>
                        {currentQuestion.options.map((option, index) => (
                            <option key={index} value={option}>{option || `Option ${index + 1}`}</option>
                        ))}
                    </select>
                </div>
                <button onClick={addQuestion} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Add Question
                </button>
            </div>
            <div className="max-w-10 border-2 ml-2">
            </div>

            <div className="w-1/2 p-4 overflow-auto">
                <h2 className="text-xl font-bold mb-4">Quiz Details</h2>
                <input
                    type="text"
                    placeholder="Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-2 border rounded-md"
                />
                <textarea
                    placeholder="Quiz Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-2 border rounded-md"
                />
                <h3 className="text-lg font-semibold mb-2">Added Questions:</h3>
                {questions.map((q, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-200 rounded">
                        <p><strong>Q{index + 1}:</strong> {q.question}</p>
                        <button
                            onClick={() => removeQuestion(index)}
                            className="text-red-500 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
                >
                    Create Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizForm;