import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { useForm} from "react-hook-form"
import axios from 'axios';
import { useAuth } from '../contextApi/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from './Loading';

const Login = () => {
  const [authUser, setAuthUser] = useAuth()
  const [loading, setLoading] = useState(false); // Add loading state

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        const userInfo = {
          email: data.email,
          password: data.password,
        };
        setLoading(true);
        axios.post("/api/user/login", userInfo)
          .then((response) => {
            if (response.data) {
            setTimeout(()=>{
              toast.success('User login successfully.');
            },300)
            }
            localStorage.setItem('ChatApp', JSON.stringify(response.data)); // Storing as JSON string in localStorage
            setAuthUser(response.data)
            setTimeout(()=>{
              setLoading(false); 
            },2000)
          })
          .catch((error) => {
            // Log the actual error to debug
            console.log(error);
            setLoading(false); 
            
            // Handle error message
            if (error.response) {  // Fixing the error handling here
              toast.error(error.response.data.message)
            } else {
              toast.error('Unknown error occurred.');
            }
          });
      };

      if (loading) {
        return <Loading/>
      }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-900 text-slate-300'>
           
              <h1 className='mb-7 text-4xl border-b-2 border-b-green-600 font-medium text-center text-green-600'>Welcome to iChat</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=' bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md'>
                <p className='text-2xl text-slate-200 font-bold text-center mb-6'>Login</p>
                {/* email */}
                <label className="mb-4 input input-bordered bg-gray-700 flex items-center space-x-2">
                <MdEmail className='text-sm'/>
                    <input type="text" className="grow rounded-md" placeholder="Email"  {...register("email", { required: true })}/>
                </label>
                {errors.email && <span className='text-red-500 text-sm'>This field is required</span>}
                {/* password */}

                <label className="mb-4 input input-bordered bg-gray-700 flex items-center space-x-2">
                <FaKey className='text-sm'/>
                    <input type="password" className="grow rounded-md" placeholder="Password"  {...register("password", { required: true })}/>
                </label>
                {errors.password && <span className='text-red-500 text-sm'>This field is required</span>}


                {/* signup button & text */}
                <input type="submit" value="Login" className='w-full py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white text-center cursor-pointer'/>
                  <p className='text-center text-slate-200 py-1'>Don't have an account? <Link to={'/signup'} className='text-blue-600 hover:underline'>Signup</Link></p> 
            </form>
           

        </div>
  )
}

export default Login