import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SortUsersByRole from '../../../components/Dashboard/Admin/SortUsersByRole';
import ManageUserTableRow from '../../../components/Dashboard/TableRows/ManageUserTableRow';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const people = [
    { name: 'ALL' },
    { name: 'User' },
    { name: 'Moderator' },
    { name: 'Admin' },
]

const ManageUsers = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(people[0]);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email, selected],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}?filter=${selected.name}`
                //     , {
                //     headers: {
                //         "authorization": `Bearer ${localStorage.getItem('access-token')}`
                //     }
                // }
            );
            return data;
        }
    })

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        // console.log('open modal');
        setIsOpen(true)
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | Manage Users</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center -z-10">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Manage <span className='text-[#0AB99D]'>Users</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            {/* Sorting  */}
            <SortUsersByRole selected={selected} setSelected={setSelected} people={people} />
            {/* End of Sorting  */}

            {/* Manage Users Table */}
            <div className="mb-20">
                {/* mx-auto */}
                <section className="container px-4 lg:px-0 md:w-[420px] lg:w-[1000px] border-0">
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-[#0AB99D] dark:border-[#0AB99D] md:rounded-lg">
                                    <table className="min-w-full divide-y divide-[#0AB99D]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Image</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right ">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Email</span>
                                                    </div>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">Role</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">Update Role</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-[#0AB99D] ">
                                            {
                                                users?.map((singleUser) => <ManageUserTableRow
                                                    key={singleUser?._id}
                                                    user={singleUser}
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
            {/* End of manage users table */}
        </div >
    );
};

export default ManageUsers;