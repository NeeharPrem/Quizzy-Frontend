import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allQuizzes } from '../../api/user';

const Card = ({ children, className }) => (
    <div className={`rounded-lg p-4 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, className }) => (
    <button className={`px-3 py-1 rounded-full text-sm font-semibold ${className}`}>
        {children}
    </button>
);

const QuizItem = ({ icon, title, description }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
        <div className="w-12 h-12 flex-shrink-0">{icon}</div>
        <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

const QuizDashboard = () => {
    const [quizzes,setQuizzes]= useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allQuizzes();
                if (response && response.data && response.data.quizzes) {
                    setQuizzes(response.data.quizzes);
                }
                console.log(quizzes, 'gg');
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-full px-4 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-blue-600 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-yellow-300 mb-2">Daily Challenge</div>
                            <div>Test Your Knowledge</div>
                        </div>
                        <div className="text-3xl font-bold">SEP<br />23</div>
                    </div>
                    <Button className="bg-yellow-300 text-blue-600 mt-4">Start Quiz</Button>
                </Card>

                <Card className="bg-green-600 text-white">
                    <h2 className="font-semibold mb-2">Quiz Master Challenge:</h2>
                    <p className="text-sm mb-4">General Knowledge Extravaganza</p>
                    <Button className="bg-white text-green-600">Begin Challenge</Button>
                </Card>

                <Card className="bg-purple-600 text-white">
                    <h2 className="font-semibold mb-2">Themed Quiz Series:</h2>
                    <p className="text-sm mb-4">History Through the Ages</p>
                    <Button className="bg-white text-purple-600">Explore Quizzes</Button>
                </Card>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Quiz Categories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <Link to={'/quizzess'}>
                    <QuizItem
                        icon={<div className="bg-red-500 w-full h-full rounded-lg flex items-center justify-center text-white">SCI</div>}
                        title="Science Quiz"
                        description="Test your scientific knowledge"
                    />
                </Link> */}
                {quizzes.length > 0 && quizzes.map((quiz, index) => (
                    <Link key={index} to={`/quiz/${quiz._id}`}>
                        <div className="card bg-base-100 w-96 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{quiz.title}</h2>
                                <p>{quiz.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuizDashboard;