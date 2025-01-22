import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import DeleteModal from '../../Modal/DeleteModal';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const ReviewCard = ({ review, isOpen, setIsOpen, openModal, closeModal, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { data: scholarShipData = [], isLoading } = useQuery({
        queryKey: ['scholarshipData', review?.scholarshipId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-scholartship/${review?.scholarshipId}`);
            return data;
        }
    })

    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/review/${review?._id}`);
            toast.success("Review deleted successfully!")
            refetch();
        } catch (error) {
            toast.error(error.message);
        } finally {
            closeModal();
        }
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <div className='border-[1px] p-3 rounded-md border-[#0AB99D] flex flex-col justify-between'>

                <div className="">
                    {/* University Name */}
                    <div className="flex flex-row gap-3">
                        <p className='font-semibold'>University Name: </p>
                        <p>{review?.universityName}</p>
                    </div>

                    {/* Subject Name */}
                    <div className="flex flex-row gap-3">
                        <p className='font-semibold'>Subject Category: </p>
                        <p>{scholarShipData?.subjectCategory}</p>
                    </div>

                    {/* Review Info */}
                    <div className=" w-full">
                        <div className="rounded-lg p-4">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={review?.reviewrImage}
                                    alt={review?.reviewrName}
                                    className="w-12 h-12 object-cover rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold">{review?.reviewrName}</h3>
                                    <p className="text-sm text-gray-500">{review?.timestamp}</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-2">
                                {[...Array(5)]?.map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`${i < Math.floor(review?.reviewRating) ? "text-yellow-500" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">{review?.reviewRating}/5</span>
                            </div>
                            <p className="text-gray-700">{review?.reviewComment}</p>
                        </div>
                    </div>
                    {/* End of Review Info */}
                </div>

                <div className="flex flex-row justify-start items-end">
                    <button
                        onClick={openModal}
                        className='bg-red-500 text-white font-bold px-8 py-2 rounded-md border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all'
                    >Delete</button>
                </div>
            </div>

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                handleDelete={handleDelete}
            />
            {/* End of Delete Modal */}

        </>
    );
};

export default ReviewCard;