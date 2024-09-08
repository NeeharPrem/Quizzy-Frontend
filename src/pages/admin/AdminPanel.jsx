import Navbar from '../../components/common/admin/Navbar';
import MainComp from '../../components/admin/MainComp';
import CreateQuiz from '../../components/admin/CreateQuiz';
import { useState} from 'react';


function AdminPanel() {
    const [addQuiz,setAddQuiz]=useState(false)
    const [editQuiz,setEditQuiz]=useState(false)

    const handleaddQuiz=()=>{
        setAddQuiz(true)
    }
    
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='p-5'>
                <div className='border-2 '>
                    {addQuiz ? <CreateQuiz /> : <MainComp handleaddQuiz={handleaddQuiz} />}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;