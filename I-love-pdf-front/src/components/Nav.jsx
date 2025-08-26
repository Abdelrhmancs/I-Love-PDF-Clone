import logo from '../assets/ilovepdf.svg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Nav = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("JWT");
        if(token) setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("JWT");
        setIsLoggedIn(false);
        navigate('/login');
    }

    return (
        <div className="bg-white h-[60px] shadow-md flex justify-between">
            <div onClick={()=> navigate('/')} className="flex items-start cursor-pointer">
                <img className="w-40 ms-5 p-3" src={logo} alt="" />
            </div>

            <div className="flex -[700px]">
                <ul className="grid place-content-center grid-cols-5 gap-7 font-medium">
                    <li onClick={()=>navigate('/merge')} className='hover:text-[#e5322d] transition duration-300 cursor-pointer'>Merge PDF</li>
                    <li onClick={()=>navigate('/split')} className='hover:text-[#e5322d] transition duration-300 cursor-pointer'>Split PDF</li>
                    <li onClick={()=>navigate('/compress')} className='hover:text-[#e5322d] transition duration-300 cursor-pointer'>Compress PDF</li>
                    <li>Convert PDF</li>
                    <li>All PDF tools</li>
                </ul>
            </div>

            <div className="flex w-[450px] items-center justify-end font-medium">
                {!isLoggedIn && (
                    <>
                        <button onClick={()=>navigate('/login')} className="m-3 text-[14px] hover:text-[#e5322d] transition duration-300">Login</button>
                        <button onClick={()=>navigate('/register')} className="me-[40px] bg-[#e5322d] rounded-lg p-2 text-[15px] text-white hover:bg-[#a12f2b] transtion duration-300">Sign up</button>
                    </>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout} className="me-[40px] bg-[#e5322d] rounded-lg p-2 text-[15px] text-white hover:bg-[#a12f2b] transtion duration-300">Logout</button>
                )}
            </div>
        </div>
    );
};

export default Nav;
