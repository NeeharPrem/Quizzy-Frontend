import { Link } from 'react-router-dom';
import { allQuizzes, deleteQuiz } from '../../api/admin';
import React, { useState, useEffect } from 'react';

function MainComp({ handleaddQuiz }) {
    const [quizzes, setQuizzes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    const handleDelete = async (id) => {
        try {
            const response = await deleteQuiz(id)
        } catch (error) {
            console.log(error)
        }
        console.log(`Quiz with ID ${id} has been deleted`);
        setQuizzes(quizzes.filter(quiz => quiz._id !== id));
        setIsModalOpen(false);
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
                console.log(error);
            }
        };
        fetchQuizzes();
    }, []);
    
    const handleAddQuiz = () => {
        handleaddQuiz();
    };

  return (
    <div>
          <div className='flex-grow p-4'>
              <div className="container mx-auto p-6">
                  <div className='flex flex-row gap-4'>
                      <div className="flex flex-row justify-between mb-4">
                          <button onClick={handleAddQuiz} className="bg-green-500 text-white rounded py-2 px-4 hover:bg-green-700">Add New Quiz</button>
                      </div>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="table table-zebra border-2">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {quizzes.length > 0 ? (
                                  quizzes.map(quiz => (
                                      <tr key={quiz._id}>
                                          <td>{quiz.title}</td>
                                          <td>{quiz.description}</td>
                                          <td>
                                              <button className="bg-yellow-500 text-white py-1 px-2 rounded-lg mr-2 hover:bg-yellow-700">
                                                  Edit
                                              </button>
                                              <button
                                                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-700"
                                                  onClick={() => openDeleteModal(quiz)}>
                                                  Delete
                                              </button>
                                          </td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr>
                                      <td colSpan="3" className="text-center">No quizzes available</td>
                                  </tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                      <h2 className="text-xl font-semibold mb-4">Delete Quiz</h2>
                      <p>Are you sure you want to delete the quiz <strong>{quizToDelete.title}</strong>?</p>
                      <div className="flex justify-end mt-6">
                          <button
                              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-700"
                              onClick={closeModal}
                          >
                              Cancel
                          </button>
                          <button
                              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                              onClick={() => handleDelete(quizToDelete._id)}
                          >
                              Delete
                          </button>
                      </div>
                  </div>
              </div>
          )}
    </div>
  )
}

export default MainComp
