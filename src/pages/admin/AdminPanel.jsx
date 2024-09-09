import React, { useState } from 'react';
import Navbar from '../../components/common/admin/Navbar';
import MainComp from '../../components/admin/MainComp';
import CreateQuiz from '../../components/admin/CreateQuiz';
import EditQuiz from '../../components/admin/EditQuiz';

function AdminPanel() {
    const [addQuiz, setAddQuiz] = useState(false);
    const [editQuiz, setEditQuiz] = useState(false);
    const [quizId, setQuizId] = useState(null);

    const handleaddQuiz = () => {
        setAddQuiz(!addQuiz);
        setEditQuiz(false);
        setQuizId(null);
    };

    const handleeditQuiz = (id) => {
        setEditQuiz(true);
        setAddQuiz(false);
        setQuizId(id); 
    };

    const handleHomeClick = () => {
        setAddQuiz(false);
        setEditQuiz(false);
        setQuizId(null);
    };

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-1 p-2 flex flex-col'>
                {(addQuiz || editQuiz) && (
                    <div className='mb-2'>
                        <div className="breadcrumbs text-sm">
                            <ul>
                                <li onClick={handleHomeClick} className="cursor-pointer">Home</li>
                            </ul>
                        </div>
                    </div>
                )}
                <div className='border-2 overflow-hidden'>
                    {addQuiz ? (
                        <CreateQuiz />
                    ) : editQuiz ? (
                        <EditQuiz quizId={quizId} /> 
                    ) : (
                        <MainComp handleedit={handleeditQuiz} handleaddQuiz={handleaddQuiz} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;