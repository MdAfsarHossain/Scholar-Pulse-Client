import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../Shared/LoadingSpinner';
import SingleScholarship from '../SingleScholarship/SingleScholarship';

const TopScholarships = () => {

    const axiosSecure = useAxiosSecure();

    const { data: topScholarShips = [], isLoading, isError } = useQuery({
        queryKey: ['topScholarShips'],
        queryFn: async () => {
            const { data } = await axiosSecure('/top-scholarships');
            return data;
        }
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Top <span className='text-[#0AB99D]'>Scholarships</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 mb-10 px-5 lg:px-0">
                {topScholarShips?.map((data) => <SingleScholarship
                    key={data?._id}
                    scholarshipData={data}

                />)}
            </div>

            <div className="mb-10 md:mb-10 flex flex-row justify-center items-center">
                <Link
                    to='/all-scholarships'
                >
                    <button
                        className='bg-[#0AB99D] text-white px-8 py-2 rounded-md font-bold border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all'
                    >See All</button>
                </Link>
            </div>

        </div>
    );
};

export default TopScholarships;


// How to get scholarships data from allScholarshipsCollection which scholarship has Low
// application fees and is also recently posted in the server side  .