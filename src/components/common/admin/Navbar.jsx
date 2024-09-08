import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout } from '../../../api/admin.js';
import { adminLogout } from '../../../store/slice/quizslice.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await logout()
            if(response){
                console.log(response)
                if(response.status === 200){
                    dispatch(adminLogout())
                    navigate('/admin/login')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold hover:text-blue-100 transition-colors duration-300">
                    Quizzy
                </Link>
                <button onClick={handleLogout} className="flex items-center text-white hover:text-blue-100 transition-colors duration-300">
                    <span className="mr-2">Logout</span>
                    <LogOut size={20} />
                </button >
            </div>
        </nav>
    );
};

export default Navbar;