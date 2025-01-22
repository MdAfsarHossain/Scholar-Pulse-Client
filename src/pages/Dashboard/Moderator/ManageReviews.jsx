import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReviewCard from '../../../components/Dashboard/Admin/ReviewCard';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageReviews = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);

    const { data: allReviews = [], isLoading, refetch } = useQuery({
        queryKey: ['allReviews', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-reviews`);
            return data;
        }
    });


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | Manage Reviews</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Manage <span className='text-[#0AB99D]'>Reviews</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            {/* All Reviews  */}
            <div className="mb-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 mt-10 md:px-5 lg:px-0">
                {
                    allReviews?.map((review) =>
                        <ReviewCard
                            key={review?._id}
                            review={review}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                            refetch={refetch}
                        />)
                }
            </div>
            {/* End of All Reviews  */}
        </div>
    );
};

export default ManageReviews;