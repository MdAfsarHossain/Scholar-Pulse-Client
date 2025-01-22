import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";
import { imageUpload } from "../../../api";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";
import ScholarShipUpdateModal from "../../Modal/ScholarShipUpdateModal";

const ManageScholarshipTableRow = ({ scholarship, refetch, openModal }) => {
    const axiosSecure = useAxiosSecure();
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scholarShipData, setScholarShipData] = useState(scholarship);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleUpdateOpenModal = () => {
        setUpdateModalIsOpen(true);
    }

    const handleUpdateCloseModal = () => {
        setUpdateModalIsOpen(false);
    }

    //   handle Image update
    const handleImage = async image => {
        try {
            // upload image
            const image_url = await imageUpload(image)
            setScholarShipData({ ...scholarShipData, universityImage: image_url })
            // setLoading(false)
        } catch (err) {
            // setLoading(false)
            toast.error(err.message)
        }
    }


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const updatedScholarShipData = Object.assign({}, scholarShipData)
        delete updatedScholarShipData._id

        try {
            const { data } = await axiosSecure.put(`/scholarship/update/${scholarship?._id}`, updatedScholarShipData);

            // console.log(data);
            refetch();
            toast.success("Scholarship Data updated successfully!");
        } catch (error) {
            // console.log(error.message);
            toast.error(error.message);
        } finally {
            handleUpdateCloseModal()
        }
    }

    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/scholarship/delete/${scholarship?._id}`);
            // console.log(`deleted successfully ${scholarship?._id}`);
            toast.success("Scholarship data has been deleted successfully!");
            refetch();
        } catch (error) {
            toast.error(error.message)
            // console.error(error.message);
        } finally {
            closeModal();
        }
    }

    return (
        <tr>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{scholarship?.scholarshipName}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{scholarship?.universityName}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{scholarship?.subjectCategory}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <p className={`w-24 ${scholarship?.degree === "Diploma" && 'text-indigo-500 rounded-full bg-indigo-100 text-base text-center'} ${scholarship?.degree === "Bachelor" && 'text-blue-500 rounded-full  bg-blue-100/60 text-base text-center'} ${scholarship?.degree === "Masters" && 'text-pink-500 rounded-full text-base bg-pink-100/60 text-center'}`}>
                    {scholarship?.degree}
                </p>

            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap text-center">{scholarship?.applicationFees}</td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex flex-row items-center gap-5 justify-center">
                    {/* Details */}
                    <Link
                        to={`/scholarshipDetails/${scholarship?._id}`}
                        className=""
                    >
                        <button
                            className="disabled:cursor-not-allowed transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none">
                            <HiOutlineBookOpen className="text-gray-600 w-6 h-6  transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none" />
                        </button>
                    </Link>

                    {/* Edit */}
                    <button
                        onClick={handleUpdateOpenModal}
                        className="disabled:cursor-not-allowed">
                        <FaRegEdit className="text-gray-600 w-5 h-5 transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D]" />
                    </button>

                    {/* Cancel */}
                    <button
                        onClick={openModal}
                        className="disabled:cursor-not-allowed">
                        <ImCancelCircle className="text-gray-600 w-5 h-5  transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none" />
                    </button>
                </div>
            </td>

            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                handleDelete={handleDelete}
            />

            <ScholarShipUpdateModal
                isOpen={updateModalIsOpen}
                closeModal={handleUpdateCloseModal}
                handleDelete={handleDelete}
                scholarShipData={scholarShipData}
                setScholarShipData={setScholarShipData}
                handleSubmitForm={handleSubmitForm}
                handleImage={handleImage}
            />
        </tr>
    );
};

export default ManageScholarshipTableRow;