import { useState } from "react";
import { toast } from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ApplicationDetailsModal from "../../Modal/ApplicationDetailsModal";
import DeleteModal from "../../Modal/DeleteModal";
import FeedbackModal from "../../Modal/FeedbackModal";

const AppliedScholarshipTableRow = ({ scholarship, refetch, openModal }) => {
    const axiosSecure = useAxiosSecure();


    const [isOpen, setIsOpen] = useState(false);
    const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
    const [feedbackModalIsOpen, setFeedbackModalIsOpen] = useState(false);
    const [scholarShipData, setScholarShipData] = useState(scholarship);
    const [selectedStatus, setSelectedStatus] = useState(scholarship?.status)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleDetailsOpenModal = () => {
        setDetailsModalIsOpen(true);
    }

    const handleDetailsCloseModal = () => {
        setDetailsModalIsOpen(false);
    }

    const handleFeedbackOpenModal = () => {
        setFeedbackModalIsOpen(true);
    }

    const handleFeedbackCloseModal = () => {
        setFeedbackModalIsOpen(false);
    }


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const updatedScholarShipData = Object.assign({}, scholarShipData)
        delete updatedScholarShipData._id

        // const formData = new FormData();
        // formData.append("image", updatedScholarShipData?.universityImage);


        // const image_url = await imageUpload(updatedScholarShipData?.universityImage);

        // updatedScholarShipData.universityImage = image_url;
        // console.log(updatedScholarShipData)
        // return;

        try {
            // const { data } = await axiosSecure.put(`/scholarship/update/${scholarship?._id}`, updatedScholarShipData);

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

    const handleChangeStatus = async (newStatus) => {
        setSelectedStatus(newStatus)

        try {
            await axiosSecure.patch(`/application-status/${scholarship?._id}`, { status: newStatus });
            toast.success("Scholarship status updated successfully!");
            refetch();
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDelete = async () => {
        try {
            await axiosSecure.patch(`/application-status/${scholarship?._id}`, { status: "Rejected" });
            toast.success("This applications canceled successfully!");
            refetch();
        } catch (error) {
            toast.error(error.message);
        } finally {
            closeModal();
        }
    }

    return (
        <tr>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <img src={scholarship?.applicantsImage} alt="" className="h-16 w-16 rounded-full" />
            </td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{scholarship?.applicantsName}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{scholarship?.applicantsEmail}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">{scholarship?.scholarshipName}</td>
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <p className={`w-24 ${scholarship?.status === "Processing" && 'text-indigo-500 rounded-full bg-indigo-300/60 text-base text-center'} ${scholarship?.status === "Pending" && 'text-blue-500 rounded-full  bg-blue-100/60 text-base text-center'} ${scholarship?.status === "Rejected" && 'text-red-500 rounded-full  bg-red-300/60 text-base text-center'} ${scholarship?.status === "Completed" && 'text-green-500 rounded-full text-base bg-green-200/60 text-center'}`}>
                    {scholarship?.status}
                </p>
            </td>

            {/* Update Status */}
            <td className={`px-4 py-4 text-smwhitespace-nowrap border-0`}>

                <select
                    className="disabled:cursor-not-allowed border-[1px] text-center rounded-md  md:w-24 lg:w-28 border-[#0AB99D]"
                    value={selectedStatus} // Bind state to the dropdown
                    onChange={(e) => handleChangeStatus(e.target.value)}
                    disabled={selectedStatus === 'Completed'}
                >
                    <option disabled selected>
                        {selectedStatus}
                    </option>
                    {
                        selectedStatus === "Pending" && <>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                        </>
                    }
                    {
                        selectedStatus === "Processing" && <>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </>
                    }
                    {
                        selectedStatus === "Rejected" && <>
                            <option value="Processing">Processing</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </>
                    }
                </select>
                {/* </div> */}
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex flex-row items-center gap-5 justify-center">
                    {/* Details */}
                    <button
                        onClick={handleDetailsOpenModal}
                        className="disabled:cursor-not-allowed transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none">
                        <HiOutlineBookOpen className="text-gray-600 w-6 h-6  transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none" />
                    </button>

                    {/* Feedback */}
                    <button
                        onClick={handleFeedbackOpenModal}
                        className="disabled:cursor-not-allowed">
                        <FaRegEdit className="text-gray-600 w-5 h-5 transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D]" />
                    </button>

                    {/* Reject */}
                    <button
                        disabled={selectedStatus === 'Completed'}
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

            <ApplicationDetailsModal
                isOpen={detailsModalIsOpen}
                closeModal={handleDetailsCloseModal}
                scholarship={scholarship}
            />

            <FeedbackModal
                isOpen={feedbackModalIsOpen}
                closeModal={handleFeedbackCloseModal}
                scholarship={scholarship}
                refetch={refetch}
            />
        </tr>
    );
};

export default AppliedScholarshipTableRow;