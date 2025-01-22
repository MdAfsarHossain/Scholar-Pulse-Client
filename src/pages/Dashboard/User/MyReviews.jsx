import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MyReviewTableRow from '../../../components/Dashboard/TableRows/MyReviewTableRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isOpen, setIsOpen] = useState(false);

    const { data: singleUserReviews, isLoading, refetch } = useQuery({
        queryKey: ['singleUserReviews', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/review/${user?.email}`);
            return data;
        }
    })

    function openModal() {
        // console.log('open modal');
        setIsOpen(true)
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | My Review</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>My <span className='text-[#0AB99D]'>Reviews</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            {/* Manage My Applications Table */}
            <div className="mb-20">
                {/* mx-auto */}
                <section className="container px-5 lg:px-0 md:w-[420px] lg:w-[1000px]">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-0">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-2">
                                <div className="overflow-hidden border border-[#0AB99D] dark:border-[#0AB99D] md:rounded-lg">
                                    <table className="min-w-full divide-y divide-[#0AB99D]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Scholarship Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>University Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right border-0">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Review Comments</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Review Date</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-center rtl:text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-[#0AB99D] w-5">
                                            {
                                                singleUserReviews?.map((review) => <MyReviewTableRow
                                                    key={review?._id}
                                                    review={review}
                                                    refetch={refetch}
                                                    openModal={openModal}
                                                />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
            {/* End of manage my applications table */}
        </div>
    );
};

export default MyReviews;