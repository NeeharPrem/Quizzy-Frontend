import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAnswer,setTimeTaken} from '../../store/slice/quizslice.js';

const QuizComponent = ({ quizdata }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [start, setStart] = useState(false);
    const name = useSelector(state => state.quiz.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (start) {
            const startTimeStamp = Date.now();
            setStartTime(startTimeStamp);
            const timerInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
            return () => clearInterval(timerInterval);
        }
    }, [start]);
    const handleStartQuiz = () => {
        setStart(true);
    };
    const handleAnswerSelect = (answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion]: answer
        }));
    };

    const handleNextQuestion = () => {
        const currentQuestionId = quizdata.quiz.questions[currentQuestion]._id;
        const selectedAnswer = selectedAnswers[currentQuestion];
        if (selectedAnswer) {
            dispatch(setAnswer({ questionId: currentQuestionId, answer: selectedAnswer }));
        }
        if (currentQuestion < quizdata.quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = () => {
        const currentQuestionId = quizdata.quiz.questions[currentQuestion]._id;
        const selectedAnswer = selectedAnswers[currentQuestion];

        if (selectedAnswer) {
            dispatch(setAnswer({ questionId: currentQuestionId, answer: selectedAnswer }));
        }
        const endTime = Date.now();
        const totalTimeTaken = Math.floor((endTime - startTime) / 1000);
        dispatch(setTimeTaken(totalTimeTaken));

        navigate('/report');
    };

    const isLastQuestion = currentQuestion === quizdata.quiz.questions.length - 1;

    return (
        <div className="max-w-4xl mx-auto p-4 font-sans">
            <div className='flex flex-row justify-between'>
                <p className='text-5xl font-extrabold lg:mb-5 md:mb-3 sm:mb-3 xs:mb-3'>All the best {name}</p>
                {timer !== 0 && (
                    <div className="font-bold lg:mt-7">Timer: {timer}</div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8 w-full">
                <div className="rounded-lg p-4 bg-white text-black w-full">
                    <div className="flex justify-between items-start">
                        <div className='text-2xl'>
                            {quizdata.quiz.questions[currentQuestion] && (
                                <p>{quizdata.quiz.questions[currentQuestion].text}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {start ? (
                <>
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Options</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        {quizdata.quiz.questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`p-2 rounded-lg text-lg transition-all duration-300 ease-in-out
                                    ${selectedAnswers[currentQuestion] === option
                                        ? 'bg-green-500 text-white shadow-lg shadow-green-300'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                onClick={() => handleAnswerSelect(option)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                    <div className='flex lg:justify-center xs:justify-center sm:justify-evenly md:justify-evenly mt-6 gap-4'>
                        <button
                            className='bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center'
                            onClick={() => {
                                if (currentQuestion > 0) {
                                    setCurrentQuestion(currentQuestion - 1);
                                }
                            }}
                        >
                            <ChevronLeft size={20} className="mr-1" />
                            Previous
                        </button>
                        {isLastQuestion ? (
                            <button
                                className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center"
                                onClick={handleSubmit}
                            >
                                Submit
                                <ChevronRight size={20} className="ml-1" />
                            </button>
                        ) : (
                            <button
                                className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center"
                                onClick={handleNextQuestion}
                            >
                                Next
                                <ChevronRight size={20} className="ml-1" />
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className='flex justify-center w-full'>
                    <button className='bg-yellow-300 lg:w-44 h-10' onClick={handleStartQuiz}>Start Quiz</button>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;