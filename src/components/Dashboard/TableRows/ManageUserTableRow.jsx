import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";


const ManageUserTableRow = ({ user, refetch, openModal }) => {
    const { _id, name, image, email, role } = user || {}
    const [selectedRole, setSelectedRole] = useState(role);
    const axiosSecure = useAxiosSecure();


    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleChangeRole = async (newRole) => {
        setSelectedRole(newRole);

        if (newRole === role) {
            return;
        }

        if (role === "Admin") {
            toast.error("Admin role is not allowed to be changed!");
            return;
        }

        try {
            await axiosSecure.patch(`/user-role/${_id}`, { newRole });
            refetch();
            toast.success("User role has been changed successfully!");
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/user/${_id}`);
            // console.log(`deleted successfully ${_id}`);
            refetch();
            toast.success("User has been deleted successfully!");
        } catch (error) {
            toast.error(error.message)
        } finally {
            closeModal();
        }
    }

    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src={image} alt={name} />
                    </div>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">{name}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{email}</td>
            <td className={`px-4 py-4 text-smwhitespace-nowrap`}>
                <p className={`w-24 ${role === "Moderator" && 'text-indigo-500 rounded-full bg-indigo-100 text-base text-center'} ${role === "User" && 'text-blue-500 rounded-full  bg-blue-100/60 text-base text-center'} ${role === "Admin" && 'text-pink-500 rounded-full text-base bg-pink-100/60 text-center'}`}>{role}</p>
            </td>

            <td className={`px-4 py-4 text-smwhitespace-nowrap`}>

                <div className="">
                    <select
                        className="disabled:cursor-not-allowed border-2 text-center rounded-md w-24 border-[#0AB99D]"
                        value={selectedRole} // Bind state to the dropdown
                        onChange={(e) => handleChangeRole(e.target.value)}
                        disabled={role === 'Admin'}
                    >
                        <option disabled selected>
                            {selectedRole}
                        </option>
                        {
                            role === "User" && <>
                                <option value="Moderator">Moderator</option>
                                <option value="Admin">Admin</option>
                            </>
                        }
                        {
                            role === "Moderator" && <>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </>
                        }
                    </select>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    <button
                        disabled={role === 'Admin'}
                        onClick={openModal}
                        className="disabled:cursor-not-allowed transition-colors duration-200 dark:hover:text-red-500  hover:text-red-500 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </td>

            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                handleDelete={handleDelete}
            />
        </tr>
    );
};

export default ManageUserTableRow;