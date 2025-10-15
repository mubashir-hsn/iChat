import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../contextApi/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from './Loading';

const SignUp = () => {

  const [authUser, setAuthUser] = useAuth()
  const [loading, setLoading] = useState(false); // Add loading state

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //  watch password and confirm password field
  const password = watch("password", "")
  const confirmPassword = watch("confirmPassword", "")

  const validatePassword = (value) => {
    return value === password || "Password do not match."
  }

  const onSubmit = async (data) => {
    const userInfo = {
      fullName: data.fullName,
      email: data.email,
      gender: data.gender,
      password: data.password,
      confirmPassword: data.confirmPassword
    };
    setLoading(true);
    await axios.post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          setTimeout(()=>{
            toast.success('User signup successfully.');
          },300)
          }
          localStorage.setItem('ChatApp', JSON.stringify(response.data)); // Storing as JSON string in localStorage
          setAuthUser(response.data);
        setTimeout(() => {
          setLoading(false); 
        }, 2000)
      })
      .catch((error) => {
        // Log the actual error to debug
        console.log(error);
        setLoading(false); 
        // Handle error message
        if (error.response) {  // Fixing the error handling here
          toast.error('Error: ' + error.response.data.message);
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

      <h1 className='mb-5 text-4xl text-center border-b-2 border-b-green-600 font-medium text-green-600'>Welcome to iChat</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md'>
        <p className='text-2xl text-slate-200 font-bold text-center mb-6'>Signup</p>

        {/* Username */}
        <label className="mb-2 input input-bordered bg-gray-700 flex items-center space-x-2">
          <FaUser className='text-sm' />
          <input type="text" className="grow" placeholder="Fullname" {...register("fullName", { required: true })} />
        </label>
        {errors.fullName && <span className='text-red-500 text-sm'>This field is required</span>}

        {/* Email */}
        <label className="mb-2 input input-bordered bg-gray-700 flex items-center space-x-2">
          <MdEmail className='text-sm' />
          <input
            type="text"
            className="grow" placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              }
            })} />
        </label>
        {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}


        {/* Gender */}
        <div className="mb-2 text-[15px] bg-gray-700 py-3 rounded-xl flex items-center space-x-4 pl-5">
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Male" {...register("gender", { required: true })} className="w-4 h-4 radio radio-info" defaultChecked />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="gender" value="Female" {...register("gender", { required: true })} className="w-4 h-4 radio radio-info" />
            <span>Female</span>
          </label>
        </div>
        {errors.gender && <span className='text-red-500 text-sm'>This field is required</span>}

        {/* Password */}
        <label className="mb-2 input input-bordered bg-gray-700 flex items-center space-x-2">
          <FaKey className='text-sm' />
          <input
            type="password" className="grow" placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })} />
        </label>
        {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}

        {/* Confirm Password */}
        <label className="mb-2 input input-bordered bg-gray-700 flex items-center space-x-2">
          <FaKey className='text-sm' />
          <input type="password" className="grow" placeholder='Confirm Password' {...register("confirmPassword", { required: true, validate: validatePassword })} />
        </label>
        {errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}

        {/* Signup button & text */}
        <input type="submit" value="Signup" className='w-full py-2 bg-green-700 hover:bg-green-800 rounded-lg text-white text-center cursor-pointer' />
        <p className='text-center text-slate-200 py-1'>Have an account? <Link to={'/login'} className='text-blue-600 hover:underline'>Login</Link></p>
      </form>



    </div>
  )
}

export default SignUp