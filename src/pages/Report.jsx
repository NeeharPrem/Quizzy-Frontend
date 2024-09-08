import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuizReport from '../components/Quiz/QuizReport.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../store/slice/quizslice.js';
import { useParams } from 'react-router-dom';
import { getQuiz } from '../api/user.js';

function Report() {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [userName, setUserName] = useState('')
    const [questions, setQuestions] = useState([])
    const name = useSelector(state => state.quiz.name);
    let { id } = useParams();

    useEffect(() => {
        if (name) {
            setModalIsOpen(false);
        }
    }, [name]);

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleCloseModal = () => {
        if (userName.trim() !== '') {
            dispatch(setName(userName));
            setModalIsOpen(false);
        }
    };

    useEffect(() => {
        console.log(id)
        const data = async () => {
            try {
                const response = await getQuiz(id)
                if (response) {
                    setQuestions(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        data()
    }, [id])


    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-grow flex'>
                {modalIsOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="font-bold text-lg mb-4">Enter Your Name</h3>
                            <div className='w-full flex justify-center'>
                                <input type="text" placeholder="Type here" className="mb-3 input input-bordered w-full max-w-full" onChange={handleNameChange} />
                            </div>
                            <div className="flex justify-center w-full">
                                <button
                                    className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-slate-800"
                                    onClick={handleCloseModal}
                                >
                                    Enter
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {!modalIsOpen && (
                    <div className='flex-col sm:flex-row w-full'>
                        <div>
                            <QuizReport/>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Report;