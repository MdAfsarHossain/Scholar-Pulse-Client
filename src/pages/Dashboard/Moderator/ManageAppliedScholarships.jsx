import { useQuery } from '@tanstack/react-query';
// import { default as React, default as React, useState } from "react";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from 'react-helmet-async';
import AppliedScholarshipTableRow from '../../../components/Dashboard/TableRows/AppliedScholarshipTableRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageAppliedScholarships = () => {
    const axiosSecure = useAxiosSecure();

    const [isOpen, setIsOpen] = useState(false);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const nowDate = new Date();
    const [min, setMin] = useState(nowDate);
    const [max, setMax] = useState(nowDate.getFullYear(), nowDate.getMonth() + 6, nowDate.getDate());

    const [applicationDeadline, setApplicationDeadline] = useState();


    const { data: appliedScholarships = [], isLoading, refetch } = useQuery({
        queryKey: ['appliedScholarships', applicationDeadline],
        queryFn: async () => {
            // Fetch applied scholarships data from the API
            const { data } = await axiosSecure(`/all-applications?newDate=${applicationDeadline}`);
            return data;
        }
    })

    function openModal() {
        setIsOpen(true)
    }

    const dateChanged = (date) => {
        setApplicationDeadline(date);
    }

    const handleRest = () => {
        setApplicationDeadline("");
        refetch();
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | Manage Applied Applications</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-center lg:text-start text-3xl md:text-4xl'>Manage Applied <span className='text-[#0AB99D]'>Applications</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            {/* sorting / filtering */}
            <div className="flex flex-row justify-center items-center mt-5">
                <div className="form-control">
                    <label className="label font-medium flex flex-col justify-center items-center text-center">
                        <p className='text-xl'>Sorting/Filtering</p>
                        <p className='text-xl'>By</p>
                        <p className='text-xl'>Applied or Scholarship Deadline.</p>
                    </label>
                    <div className="flex flex-row gap-10 mt-5 justify-center items-center">
                        {/* Date Picker Input Field */}
                        <DatePicker
                            className="border p-2 rounded-md w-full lg:w-36 border-[#0AB99D] mx-auto flex flex-col justify-center items-center"
                            selected={applicationDeadline}
                            onChange={(date) => dateChanged(date)}
                        />

                        <div className="">
                            <button
                                onClick={handleRest}
                                className='px-8 py-2 rounded-md border-[#0AB99D] bg-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] text-white transition-all hover:border-[#0AB99D] border-2 font-bold'
                            >Reset</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Manage Applied Scholarships Table */}
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
                                                        <span>Applicants Image</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Applicants Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Applicants Email</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Scholarships Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Status</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Update Status</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-[#0AB99D] ">
                                            {
                                                appliedScholarships?.map((scholarship) => <AppliedScholarshipTableRow
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
            {/* End of manage Applied Scholarships table */}

        </div>
    );
};

export default ManageAppliedScholarships;