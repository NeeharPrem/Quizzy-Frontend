import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { ChevronLeft, SkipForward, ChevronRight } from 'lucide-react';
import { setAnswers } from '../../store/slice/quizslice.js';

const QuizComponent = ({ quizdata }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timer, setTimer] = useState(0);
    const [start, setStart] = useState(false);
    const name = useSelector(state => state.quiz.name);
    const dispatch=useDispatch()
    
    if (quizdata){
        console.log(quizdata.quiz.questions[0])
    }
    useEffect(() => {
        if (start) {
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
        console.log(answer);
        if (!answers.includes(answer)){
            setAnswers([...answers, answer]);
            dispatch(setAnswersAction(answer));
            setCurrentQuestion(currentQuestion + 1);
            setTimer(0);
        } else {
            console.log('Answer already selected for this question');
        }
    };

    const Card = ({ children, className }) => (
        <div className={`rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );

    const StudyPlanItem = ({ icon, title }) => (
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
            <div className="w-12 h-12 flex-shrink-0">{icon}</div>
            <div>
                <h3 className="font-semibold">{title}</h3>
            </div>
        </div>
    );

    const setAnswersAction = (answer) => ({
        type: 'quiz/setAnswers',
        payload: answer
    });

    return (
        <div className="max-w-4xl mx-auto p-4 font-sans">
            <div className='flex flex-row justify-between'>
                <p className='text-5xl font-extrabold lg:mb-5 md:mb-3 sm:mb-3 xs:mb-3'>All the best {name}</p>
                {timer !== 0 && (
                    <div className="font-bold lg:mt-7">Timer: {timer}</div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8 w-full">
                <Card className="bg-white text-back w-full">
                    <div className="flex justify-between items-start">
                        <div className='text-2xl'>
                            {quizdata.quiz.questions[currentQuestion] && (
                                <p>{quizdata.quiz.questions[currentQuestion].text}</p>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
            {start ? (
                <>
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Options</h2>
                </div><div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        {quizdata.quiz.questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 text-lg"
                                onClick={() => handleAnswerSelect(option)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div><div className='flex lg:justify-center xs:justify-center sm:justify-evenly md:justify-evenly mt-6 gap-4'>
                        <button
                            className='bg-gray-200  text-black font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center'
                            onClick={() => {
                                if (currentQuestion > 0) {
                                    setCurrentQuestion(currentQuestion - 1);
                                }
                            }}
                        >
                            <ChevronLeft size={20} className="mr-1" />
                            Previous
                        </button>
                        <button
                            className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center"
                            onClick={() => {
                                if (currentQuestion < quizdata.quiz.questions.length - 1) {
                                    setCurrentQuestion(currentQuestion + 1);
                                }
                            }}
                        >
                            Next
                            <ChevronRight size={20} className="ml-1" />
                        </button>
                    </div>
                    </>
            ):(
              <>
              <div className='flex justify-center w-full'>
                <button className='bg-yellow-300 lg:w-44 h-10'onClick={handleStartQuiz}>Start Quiz</button>
              </div>
              </>
            )}
        </div>
    );
};

export default QuizComponent;