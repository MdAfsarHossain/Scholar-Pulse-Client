import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MyApplicationTableRow from '../../../components/Dashboard/TableRows/MyApplicationTableRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isOpen, setIsOpen] = useState(false);

    const { data: myApplications, isLoading, refetch } = useQuery({
        queryKey: ['myApplications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-applications/${user?.email}`)
            return data;
        }
    })

    function openModal() {
        // console.log('open modal');
        setIsOpen(true)
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | My Applications</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>My <span className='text-[#0AB99D]'>Applications</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            {/* Manage My Applications Table */}
            <div className="mb-20">
                {/* mx-auto */}
                <section className="container px-5 lg:px-0 md:w-[420px] lg:w-[1000px] py-5 border-0">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-0">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-2 mb-20 md:mb-0">
                                <div className="overflow-hidden border border-[#0AB99D] dark:border-[#0AB99D] md:rounded-lg">
                                    <table className="min-w-full divide-y divide-[#0AB99D]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>University Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>University Address</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Feedback</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-2 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Subject Category</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right">Degree</th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right">Applications Fees</th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right">Service Charge</th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right">Status</th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-center rtl:text-center">Action</th>
                                                <th scope="col" className="px-2 py-3.5 text-sm font-normal text-center rtl:text-center">Add Review</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-[#0AB99D]">
                                            {
                                                myApplications?.map((application) => <MyApplicationTableRow
                                                    key={application?._id}
                                                    application={application}
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

export default MyApplications;