import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";
import { imageUpload } from "../../../api";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AddReview from "../../Modal/AddReview";
import ApplicationUpdateModal from "../../Modal/ApplicationUpdateModal";
import DeleteModal from "../../Modal/DeleteModal";

const MyApplicationTableRow = ({ application, refetch, openModal }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
    const [applicationUpdateModalIsOpen, setApplicationUpdateModalIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [applicantsData, setApplicantsData] = useState(application);

    const { data: singleScholarshipData, isLoading, } = useQuery({
        queryKey: ['singleScholarshipData', application?.scholarshipId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-scholartship/${application?.scholarshipId}`);
            return data;
        }
    })

    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/delete-application/${application._id}`);
            toast.success("Application deleted successfully!")
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleReviewOpenModal = () => {
        setReviewModalIsOpen(true);
    }

    const handleReviewCloseModal = () => {
        setReviewModalIsOpen(false);
    }

    const handleApplicationUpdateOpenModal = () => {
        setApplicationUpdateModalIsOpen(true);
    }

    const handleApplicationUpdateCloseModal = () => {
        setApplicationUpdateModalIsOpen(false);
    }

    //   handle Image update
    const handleImage = async image => {
        // console.log(image);
        try {
            // upload image
            const image_url = await imageUpload(image)
            // console.log(image_url)
            setApplicantsData({ ...applicantsData, applicantsImage: image_url })
            // setLoading(false)
        } catch (err) {
            toast.error(err.message)
        }
    }

    // Handle Submit form
    const handleSubmitForm = async (e) => {
        // TODO: Add form validation and backend call
        e.preventDefault();

        const updateApplicantsData = Object.assign({}, applicantsData)
        delete updateApplicantsData._id

        try {
            const { data } = await axiosSecure.patch(`/applicant-info/${application?._id}`, updateApplicantsData);

            // console.log(data);
            refetch();
            toast.success("Applicants Data updated successfully!");
        } catch (error) {
            // console.log(error.message);
            toast.error(error.message);
        } finally {
            handleApplicationUpdateCloseModal()
        }
    }

    // Check status 
    const checkStatus = () => {
        if (application?.status === "Processing" || application?.status === "Completed" || application?.status === "Rejected") {
            toast.success(`Application status ${application?.status}. You can not edit this application now.`);
            return;
        }

        handleApplicationUpdateOpenModal();
    }

    return (
        <tr>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{application?.universityName}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{singleScholarshipData?.universityCity}, {singleScholarshipData?.universityCountryName}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{application?.feedback ? application?.feedback : "None"}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{application?.subjectCategory}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{application?.degree}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap text-center">{singleScholarshipData?.applicationFees}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap text-center">{singleScholarshipData?.serviceCharge}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap text-center">
                <p className={`w-24 ${application?.status === "Processing" && 'text-indigo-500 rounded-full bg-indigo-300/60 text-base text-center'} ${application?.status === "Pending" && 'text-blue-500 rounded-full  bg-blue-100/60 text-base text-center'} ${application?.status === "Rejected" && 'text-red-500 rounded-full  bg-red-300/60 text-base text-center'} ${application?.status === "Completed" && 'text-green-500 rounded-full text-base bg-green-200/60 text-center'}`}>
                    {application?.status}
                </p>
            </td>

            <td className="px-2 py-4 text-sm whitespace-nowrap">
                <div className="flex flex-row items-center gap-5 justify-center">
                    {/* Details */}
                    <Link
                        to={`/scholarshipDetails/${application?.scholarshipId}`}
                        className=""
                    >
                        <button
                            className="disabled:cursor-not-allowed transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none">
                            <HiOutlineBookOpen className="text-gray-600 w-6 h-6  transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none" />
                        </button>
                    </Link>

                    {/* Edit */}
                    <button
                        onClick={checkStatus}
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

            <td className="px-2 py-4 text-sm whitespace-nowrap">
                <button
                    onClick={handleReviewOpenModal}
                    className="bg-[#0AB99D] text-white px-2 py-1 rounded-md font-semibold border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all"
                >Add Review</button>

            </td>

            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                handleDelete={handleDelete}
            />

            <AddReview
                isOpen={reviewModalIsOpen}
                closeModal={handleReviewCloseModal}
                handleDelete={handleDelete}
                scholarShipData={application}
                application={application}
            />

            <ApplicationUpdateModal
                isOpen={applicationUpdateModalIsOpen}
                closeModal={handleApplicationUpdateCloseModal}
                handleImage={handleImage}
                applicantsData={applicantsData}
                setApplicantsData={setApplicantsData}
                handleSubmitForm={handleSubmitForm}
            />
        </tr>
    );
};

export default MyApplicationTableRow;