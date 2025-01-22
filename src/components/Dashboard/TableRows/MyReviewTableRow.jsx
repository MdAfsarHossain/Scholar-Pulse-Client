import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";
import UpdateReviewModal from "../../Modal/UpdateReviewModal";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviewTableRow = ({ review, refetch, openModal }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [updateReviewModalIsOpen, setUpdateReviewModalIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [reviewData, setReviewData] = useState(review);

    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/review/${review._id}`);
            toast.success("Review deleted successfully!")
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


    const handleUpdateReviewOpenModal = () => {
        setUpdateReviewModalIsOpen(true);
    }

    const handleUpdateReviewCloseModal = () => {
        setUpdateReviewModalIsOpen(false);
    }

    return (
        <tr className="">
            <td className="px-2 py-4 text-sm whitespace-nowrap">{review?.scholarshipName}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{review?.universityName}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{review?.reviewComment}</td>
            <td className="px-2 py-4 text-sm whitespace-nowrap">{new Date(review?.timestamp).toLocaleDateString()}</td>

            <td className="px-2 py-4 text-sm whitespace-nowrap">
                <div className="flex flex-row items-center gap-5 justify-center">
                    {/* Details */}

                    {/* Edit */}
                    <button
                        onClick={handleUpdateReviewOpenModal}
                        className="disabled:cursor-not-allowed">
                        <FaRegEdit className="text-gray-600 w-5 h-5 transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D]" />
                    </button>

                    {/* Cancel */}
                    <button
                        // disabled={universityName === 'Admin'}
                        onClick={openModal}
                        className="disabled:cursor-not-allowed">
                        <ImCancelCircle className="text-gray-600 w-5 h-5  transition-colors duration-200 dark:hover:text-[#0AB99D]  hover:text-[#0AB99D] focus:outline-none" />
                    </button>
                </div>
            </td>

            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                handleDelete={handleDelete}
            />

            <UpdateReviewModal
                isOpen={updateReviewModalIsOpen}
                closeModal={handleUpdateReviewCloseModal}
                handleDelete={handleDelete}
                review={review}
                refetch={refetch}
                reviewData={reviewData}
                setReviewData={setReviewData}
            />
        </tr>
    );
};

export default MyReviewTableRow;