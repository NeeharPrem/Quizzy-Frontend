import React from 'react';
import { Link } from 'react-router-dom';

const Questions = () => {
    const questions = [
        { id: 1, question: 'Question 1' },
        { id: 2, question: 'Question 2' },
        { id: 3, question: 'Question 3' },
        { id: 4, question: 'Question 4' },
        { id: 5, question: 'Question 5' },
        { id: 6, question: 'Question 6' },
        { id: 7, question: 'Question 7' },
        { id: 8, question: 'Question 8' },
        { id: 9, question: 'Question 9' },
        { id: 10, question: 'Question 10' },
        { id: 10, question: 'Question 10' }
    ];

    const handleQuestionSelection = (questionId) => {
        // Handle the selection of a question and navigate to the question section
        console.log(`Selected question: ${questionId}`);
        // Add your navigation logic here
    };

    return (
        <div className='flex flex-col h-[450px] overflow-y-auto'>
            {questions.map((question) => (
                <Link to={'/quiz'}>
                    <div key={question.id} className='bg-white border-2 p-4 mb-4 cursor-pointer' onClick={() => handleQuestionSelection(question.id)}>
                        <h2>{question.question}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Questions;