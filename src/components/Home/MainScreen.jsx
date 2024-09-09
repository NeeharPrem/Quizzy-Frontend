import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allQuizzes } from '../../api/user';

const Card = ({ children, className }) => (
    <div className={`rounded-lg p-4 shadow-xl transition-transform transform hover:scale-105 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, className }) => (
    <button className={`px-4 py-2 rounded-full text-sm font-semibold ${className}`}>
        {children}
    </button>
);

const QuizDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allQuizzes();
                if (response && response.data && response.data.quizzes) {
                    setQuizzes(response.data.quizzes);
                }
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-full px-4 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <Link key={index} to={`/quiz/${quiz._id}`}>
                            <Card className="bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 text-white hover:bg-gradient-to-r hover:from-purple-800 hover:via-blue-800 hover:to-indigo-800">
                                <div className="flex flex-col h-full">
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
                                        <p className="text-gray-200">{quiz.description}</p>
                                    </div>
                                    <Button className="bg-yellow-400 text-black mt-4">Take Quiz</Button>
                                </div>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <p>No quizzes available.</p>
                )}
            </div>
        </div>
    );
};

export default QuizDashboard;