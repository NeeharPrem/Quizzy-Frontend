import React, { useState } from "react";

const QuizTaker = () => {
    const [name, setName] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAnswerSelect = (optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleSubmitQuiz = () => {
       
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz Taker</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                className="border border-gray-300 rounded-md p-2 mb-4"
            />
            {currentQuestion < questions.length && (
                <div>
                    <h2 className="text-lg font-semibold mb-2">{questions[currentQuestion].question}</h2>
                    <div className="space-y-2">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`bg-blue-200 rounded-md p-2 ${answers[currentQuestion] === index ? 'bg-blue-400' : ''}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        {currentQuestion > 0 && (
                            <button onClick={handlePreviousQuestion} className="bg-gray-200 rounded-md p-2 mr-2">Previous</button>
                        )}
                        {currentQuestion < questions.length - 1 && (
                            <button onClick={handleNextQuestion} className="bg-gray-200 rounded-md p-2">Next</button>
                        )}
                        {currentQuestion === questions.length - 1 && (
                            <button onClick={handleSubmitQuiz} className="bg-green-400 rounded-md p-2">Submit Quiz</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizTaker;