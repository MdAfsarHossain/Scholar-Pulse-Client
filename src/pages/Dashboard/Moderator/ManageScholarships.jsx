import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ManageScholarshipTableRow from '../../../components/Dashboard/TableRows/ManageScholarshipTableRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageScholarships = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isOpen, setIsOpen] = useState(false);

    const { data: manageScholarships = [], isLoading, refetch } = useQuery({
        queryKey: ['manageScholarships'],
        queryFn: async () => {
            const { data } = await axiosSecure('/manage-scholarships')
            return data
        }
    })

    function openModal() {
        setIsOpen(true)
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | Manage Scholarships</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Manage <span className='text-[#0AB99D]'>Scholarships</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            {/* Manage Scholarships Table */}
            <div className="mb-20">
                {/* mx-auto */}
                <section className="container px-4 lg:px-0 md:w-[420px] lg:w-[1000px]">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-[#0AB99D] dark:border-[#0AB99D] md:rounded-lg">
                                    <table className="min-w-full divide-y divide-[#0AB99D]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Scholarship Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>University Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Subject Category</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">Degree</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">Applications Fees</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-[#0AB99D] ">
                                            {
                                                manageScholarships?.map((scholarship) => <ManageScholarshipTableRow
                                                    key={scholarship?._id}
                                                    scholarship={scholarship}
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
            {/* End of manage Scholarships table */}
        </div>
    );
};

export default ManageScholarships;