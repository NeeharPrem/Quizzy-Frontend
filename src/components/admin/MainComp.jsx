import React, { useState, useEffect } from 'react';
import { allQuizzes, deleteQuiz } from '../../api/admin';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

function MainComp({ handleaddQuiz, handleedit }) {
    const [quizzes, setQuizzes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteQuiz(id);
            setQuizzes(quizzes.filter(quiz => quiz._id !== id));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    const openDeleteModal = (quiz) => {
        setQuizToDelete(quiz);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuizToDelete(null);
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await allQuizzes();
                if (response) {
                    setQuizzes(response.quizzes);
                }
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchQuizzes();
    }, []);

    const handleEditQuiz = (id) => {
        handleedit(id);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quiz Management</h2>
                <div className="mb-6">
                    <button
                        onClick={handleaddQuiz}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                    >
                        <PlusCircle className="mr-2" size={20} />
                        Add New Quiz
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.length > 0 ? (
                                quizzes.map(quiz => (
                                    <tr key={quiz._id} className="border-b">
                                        <td className="px-4 py-2">{quiz.title}</td>
                                        <td className="px-4 py-2">{quiz.description}</td>
                                        <td className="px-4 py-2">
                                            <button onClick={() => handleEditQuiz(quiz._id)} className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-yellow-600 transition-colors duration-300 flex items-center">
                                                <Edit2 size={16} className="mr-1" /> Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
                                                onClick={() => openDeleteModal(quiz)}
                                            >
                                                <Trash2 size={16} className="mr-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">No quizzes available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Quiz</h2>
                        <p className="mb-6">Are you sure you want to delete the quiz <strong>{quizToDelete.title}</strong>?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-600 transition-colors duration-300"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                                onClick={() => handleDelete(quizToDelete._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainComp;