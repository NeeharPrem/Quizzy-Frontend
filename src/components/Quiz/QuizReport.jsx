import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { report } from '../../api/user';
import Loader from '../common/Loader';

function QuizReport() {
    const quizResult = useSelector(state => state.quiz.currentQuiz);
    const userName = useSelector(state => state.quiz.name);
    const timeTaken = useSelector(state => state.quiz.timeTaken);

    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = {
                    result: quizResult,
                    name: userName,
                    timeTaken: timeTaken
                };
                setIsLoading(true);
                const response = await report(data);
                setReportData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReport();
    }, [quizResult, userName, timeTaken]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!reportData) {
        return <div>Error loading report data.</div>;
    }

    const totalQuestions = quizResult.length;
    const correctAnswers = reportData.result.filter(q => q.isCorrect).length;
    const score = correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="flex w-full justify-center gap-6">
                <h2 className="text-2xl font-semibold mb-2">Quiz Report for {userName}</h2>
                <div className='border rounded bg-white shadow-md p-4 mb-6'>
                    <p className="text-lg">Score: {score} / {totalQuestions}</p>
                </div>
                <div className='border rounded bg-white shadow-md p-4 mb-6'>
                    <p className="text-lg">Percentage: {percentage.toFixed(2)}%</p>
                </div>
                <div className='border rounded bg-white shadow-md p-4 mb-6'>
                    <p className="text-lg">Time Taken: {formatTime(timeTaken)}</p>
                </div>
            </div>

            <div className="border rounded bg-white shadow-md p-4">
                <h2 className="text-2xl font-semibold mb-4">Detailed Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reportData.result.map((question, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded ${question.isCorrect ? 'bg-green-100' : 'bg-red-100'
                                } flex flex-col justify-between`}
                        >
                            <div>
                                <p className="font-semibold mb-2">Question {index + 1}:</p>
                                <p className="mb-2">{question.question}</p>
                                <p className="mb-1"><span className="font-medium">Your Answer:</span> {question.answer}</p>
                                <p className="mb-1"><span className="font-medium">Correct Answer:</span> {question.right || question.answer}</p>
                            </div>
                            <p className="mt-2 text-right font-semibold">
                                {question.isCorrect ? 'Correct' : 'Incorrect'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuizReport;