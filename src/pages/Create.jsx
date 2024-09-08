import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuizForm from '../components/Quiz/QuizForm';

function Create() {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='sm:flex-row w-full h-screen p-4'>
                <div style={{ height: '100%' }}>
                    <QuizForm />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Create;