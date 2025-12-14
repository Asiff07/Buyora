import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
           if(currentState === 'Sign Up'){
            const response = await axios.post(backendUrl + '/api/users/register',{name,email,password});
            if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem('token',response.data.token);
                toast.success(response.data.msg);
            }else{
                toast.error(response.data.msg);
            }
           }else{
            const response = await axios.post(backendUrl + '/api/users/login',{email,password});
            if(response.data.success){
                setToken(response.data.token);
                localStorage.setItem('token',response.data.token);
                toast.success(response.data.msg);
            }else{
                toast.error(response.data.msg);
            }
           }
        } catch(error){
            console.log(error);
            
            toast.error(error.message);
        }
    }
    useEffect(()=>{
      if(token){
        navigate('/');
      }
    },[token])

    const toggleForm = (state) => {
        setCurrentState(state);
        setName('');
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-700 placeholder-gray-400' placeholder='Name' required />}
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-700 placeholder-gray-400' placeholder='Email' required />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-700 placeholder-gray-400' placeholder='Password' required />
            <div className='w-full flex justify-between text-sm -mt-2'>
                {currentState === 'Login' ? <p className='cursor-pointer'>Forgot your password?</p> : <div></div>}
                {
                    currentState === 'Login' ?
                        <p onClick={() => toggleForm('Sign Up')} className='cursor-pointer'>Create Account</p>
                        :
                        <p onClick={() => toggleForm('Login')} className='cursor-pointer'>Login Here</p>
                }
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-sm '>
                {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
        </form>
    )
}

export default Login;