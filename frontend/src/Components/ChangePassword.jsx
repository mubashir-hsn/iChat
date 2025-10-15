import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link} from "react-router-dom";
import { useAuth } from "../contextApi/AuthProvider";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [authUser] = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(oldPassword=='' || newPassword=='' || confirmPassword==''){
            setError("All fields are required.");
            return;
        }
        if(newPassword.length<8){
            setError('New Password must atleast 8 characters.')
            return;
        }
       else if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/user/change-password", {
                oldPassword,
                newPassword
            }, {
                headers: {
                    "Content-Type": "application/json" // Ensure the content type is JSON
                }
            }
            );
            toast.success("Password change successfully.")
            
            setError("");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
             
        } catch (err) {
            toast.error(err.response.data.message || "An error occurred")
        }
    };

    return (
        <div className="flex flex-col justify-start items-center w-screen min-h-screen bg-gray-900">
           
            <div className="w-full mt-16 md:mt-0 md:w-1/2 flex flex-col items-start justify-start p-3 md:p-8">
                
                <div className="flex items-start justify-start text-xl font-semibold text-slate-300 space-x-1">
                    <div>Hello, <span className="text-green-500">{authUser?.user?.fullName.toUpperCase()}</span></div>
                </div>
                <p className="text-[16px] mt-1 text-slate-400 text-start md:pl-9">Change your password here. Your password must be atleast 8 characters including symbols , numbers or letters.</p>
            </div>
            
            
            <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl text-green-600 font-bold text-center mb-6">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-slate-300 mb-2">Old Password</label>
                        <input
                            type="password"
                            className="w-full p-2 bg-gray-700 text-slate-400 border-none rounded-md focus:outline-none"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-300 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 bg-gray-700 text-slate-400 border-none rounded-md focus:outline-none"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-slate-300 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full p-2  bg-gray-700 text-slate-400 border-none rounded-md focus:outline-none"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className=" text-red-500 text-sm p-2 rounded mb-1">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
                    >
                        Change Password
                    </button>
                </form>
            </div>
            <Link to={'/'} className='w-20 absolute top-5 left-6 p-1 tracking-wider h-10 flex text-sm justify-center items-center bg-slate-700 rounded-lg text-white hover:bg-slate-950 cursor-pointer duration-300'>
              Back
            </Link>
        </div>
    );
};

export default ChangePassword;
