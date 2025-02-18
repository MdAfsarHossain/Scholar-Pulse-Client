import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {

    const { user, logOut } = useAuth() || {};
    const [role] = useRole();


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


    // const users = {
    //     name: "John Doe",
    //     email: "johndoe@example.com",
    //     role: "Student",
    //     bio: "Passionate about learning and exploring new technologies. Currently pursuing a degree in Computer Science.",
    //     profilePicture: "https://via.placeholder.com/150", // Replace with actual image URL
    //     joined: "January 2022",
    //     location: "New York, USA",
    //     skills: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    // };

    return (
        <div className="min-h-screen mt-24">

            <Helmet>
                <title>Scholar Pulse | Profile</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Profile <span className='text-[#0AB99D]'>Page</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            <div className="container mx-auto px-4 mt-8">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-white"
                            />
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-bold text-white">{user?.displayName}</h1>
                                <h1>{/* Role (if applicable) */}
                                    {role && role !== "User" && (
                                        <span className={`mt-2 px-3 py-1 font-bold ${role === "Moderator" && 'text-indigo-500 rounded-full bg-indigo-100 text-base text-center'} ${role === "User" && 'text-blue-500 rounded-full  bg-blue-100/60 text-base text-center'} ${role === "Admin" && 'text-pink-500 rounded-full text-base bg-pink-100/60 text-center'}`}>
                                            {role}
                                        </span>
                                    )}</h1>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6">
                        <div className="space-y-4">
                            {/* <div>
                                <h2 className="text-lg font-semibold text-gray-800">About Me</h2>
                                <p className="text-gray-600">{user?.bio}</p>
                            </div> */}

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                                <ul className="text-gray-600">
                                    <li>Email: {user?.email}</li>
                                    {/* <li>Location: {user?.location}</li> */}
                                    <li>Joined: {formattedDate}</li>
                                </ul>
                            </div>

                            <div>
                                {/* <h2 className="text-lg font-semibold text-gray-800">Skills</h2> */}
                                {/* <div className="flex flex-wrap gap-2">
                                    {user?.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    {/* <div className="p-6 border-t border-gray-200">
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                            Edit Profile
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;