import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

const Profile = () => {
    const [role, isLoading] = useRole();
    const { user, logOut } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: userProfileData = [], isLoading: userProfileDataLoading, refetch } = useQuery({
        queryKey: ['userProfileData', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`);
            return data;
        }
    })

    let formattedDate;

    if (userProfileData?.timestamp) {
        formattedDate = new Date(userProfileData.timestamp).toLocaleDateString();
        // console.log(formattedDate); // Example: 12/15/2022
    }

    if (isLoading || userProfileDataLoading) return <LoadingSpinner />

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center">

            {/* Dynamic Title */}
            <Helmet>
                <title>Scholar Plus | My Profile</title>
            </Helmet>

            {/* Profile Header */}
            <div className="bg-white shadow-md rounded-lg w-full p-6 flex flex-col items-center">
                {/* User Image */}
                <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring text-[#0AB99D] ring-offset-base-100 ring-offset-2">
                        <img src={userProfileData?.image} alt={userProfileData?.name} />
                    </div>
                </div>

                {/* User Name */}
                <h1 className="mt-4 text-2xl font-bold text-gray-800">{userProfileData?.name}</h1>

                {/* Role (if applicable) */}
                {role && role !== "User" && (
                    <span className={`mt-2 px-3 py-1 font-bold ${role === "Moderator" && 'text-indigo-500 rounded-full bg-indigo-100 text-base text-center'} ${role === "User" && 'text-blue-500 rounded-full  bg-blue-100/60 text-base text-center'} ${role === "Admin" && 'text-pink-500 rounded-full text-base bg-pink-100/60 text-center'}`}>
                        {role}
                    </span>
                )}
            </div>

            {/* Additional User Info */}
            <div className="mt-6 bg-white shadow-md rounded-lg w-full p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {userProfileData?.email}
                    </p>
                    {/* Joined Date */}
                    <p className="text-gray-600">
                        <span className="font-medium">Joined Date:</span> {formattedDate}
                    </p>
                </div>
            </div>

            {/* Optional Section */}
            <div className="mt-6 bg-white shadow-md rounded-lg w-full p-6 mb-20">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
                <div className="flex space-x-4">
                    <button className="bg-[#0AB99D] text-white border-2 border-[#0AB99D] rounded-md px-3 py-2 font-semibold hover:bg-transparent hover:text-[#0AB99D] transition-all">Edit Profile</button>
                    <button
                        onClick={logOut}
                        className="bg-red-500 text-white border-2 border-red-500 rounded-md px-3 py-2 font-semibold hover:bg-transparent hover:text-red-500 transition-all">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;