import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contextApi/AuthProvider';
import Logout from './Logout';
import { RxCross2 } from 'react-icons/rx';
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const getInitials = (fullName) => {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    const firstInitial = nameParts[0]?.charAt(0)?.toUpperCase();
    const secondInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0)?.toUpperCase() : nameParts[0]?.charAt(1)?.toUpperCase();
    return firstInitial + secondInitial;
};

const UserProfile = () => {
    const [authUser, setAuthUser] = useAuth();
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: authUser?.user?.fullName || '',
        email: authUser?.user?.email || '',
        about: authUser?.user?.about || '',
    });

    useEffect(() => {
        console.log("Auth User updated:", authUser);  // Log to see if authUser updates
    }, [authUser]);

    const handleEditing = () => {
        setIsEditing(!isEditing);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Toggle the visibility of the user information div
    const toggleInfoVisibility = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    // Get the initials from the user's full name
    const initials = getInitials(authUser?.user?.fullName);

    // Handle form submission using Axios
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                '/api/user/update-profile',
                formData,
                {
                    withCredentials: true, // Include cookies in the request
                }
            );
    
            // Get the updated user data from the response
            const updatedUser = response.data;
    
            // Update the context and also cache it in Cookies/localStorage
            setAuthUser(updatedUser);  // This will now also update localStorage and Cookies
    
            toast.success("Profile updated successfully.");
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };
    

    return (
        <>
            <div className='h-[10vh] w-full flex justify-start items-center bg-slate-800'>
                <div className=' flex w-full justify-start items-center'>
                    <div onClick={toggleInfoVisibility} className='select-none cursor-pointer py-1 pl-5 flex justify-start items-center space-x-2'>
                        <div className="avatar">
                            <div className="w-9 h-9 leading-[36px] text-[14px] text-center rounded-full bg-green-400 text-white font-medium">
                                {initials}
                            </div>
                        </div>
                        <div>
                            <h1 className='text-[14px]'>{authUser?.user?.fullName?.toUpperCase()}{" "}<span>(You)</span></h1>
                        </div>
                    </div>
                </div>
            </div>

            {isInfoVisible && (
                <div className='w-[90%] h-[500px] flex flex-col justify-start items-start p-3 rounded-lg shadow-lg bg-gray-800 top-5 left-6 absolute z-10'>
                    <div className=' flex flex-col w-full justify-center items-center mt-10'>
                        <div className='select-none cursor-pointer flex flex-col justify-center items-center space-y-3'>
                            <div className="avatar online">
                                <div className="w-16 h-16 leading-[64px] text-xl text-center rounded-full bg-green-400 text-white font-bold">
                                    {initials}
                                </div>
                            </div>
                            {!isEditing && (
                                <div>
                                    <h1 className='text-lg font-semibold tracking-wider'>{authUser?.user?.fullName}</h1>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className='p-1 mt-5 text-[14px] text-slate-200 space-y-2 uppercase'>
                                <h1>Name : <input name='fullName' className='p-2 rounded bg-slate-700 text-sm text-white border-none outline-none' onChange={handleInputChange} type="text" value={formData.fullName} /></h1>
                                <h1>Email : <input name='email' className='p-2 rounded bg-slate-700 text-sm text-white border-none outline-none' onChange={handleInputChange} type="email" value={formData.email} /></h1>
                                <h1>About : <input name='about' className='p-2 rounded bg-slate-700 text-sm text-white border-none outline-none' onChange={handleInputChange} type="text" value={formData.about} /></h1>
                                <button type="submit" className='p-1 text-white w-full my-2 bg-green-500 rounded hover:bg-green-600 border-none outline-none'>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className='p-1 mt-5 text-[14px] text-slate-200 space-y-2 uppercase'>
                            <h1>Status : <span className='text-slate-400'>Online</span></h1>
                            <h1>Email : <span className='text-slate-400'>{authUser?.user?.email}</span></h1>
                            <h1>About : <span className='text-slate-400'>{authUser?.user?.about}</span></h1>
                        </div>
                    )}

                    <div onClick={handleEditing} className='w-full text-center p-1 h-10 flex text-sm justify-center items-center bg-slate-700 rounded-lg hover:bg-slate-900 cursor-pointer duration-300'>
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </div>

                    <div className='mt-5 w-full flex justify-between items-center'>
                        <div><Logout /></div>
                        <div className='w-36 p-1 h-10 flex text-sm justify-center items-center bg-slate-700 rounded-lg hover:bg-slate-900 cursor-pointer duration-300'>
                            <Link to={'/change-password'}>Change Password</Link>
                        </div>
                    </div>

                    <div onClick={toggleInfoVisibility} className='w-8 h-8 flex items-center justify-center text-white bg-slate-700 cursor-pointer rounded-full text-xl font-medium absolute top-2 left-2 hover:bg-slate-900 duration-200'>
                        <RxCross2 />
                    </div>

                    <div className='mt-10 p-2 text-[13px] text-slate-500 select-none'>
                        <p>Developed and Managed By <br /> Mubashir Hassan.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
