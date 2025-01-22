import { useQuery } from "@tanstack/react-query";
import { CgCalendarDates } from "react-icons/cg";
import { FaStar, FaUniversity } from "react-icons/fa";
import { FaGraduationCap, FaReadme } from "react-icons/fa6";
import { GiBlackBook } from "react-icons/gi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";

const SingleScholarship = ({ scholarshipData }) => {
    const { _id, scholarshipName, universityName, universityCountryName, universityCity, subjectCategory, tuitionFees, applicationDeadline, scholarshipPostedDate, scholarship, degree, worldRank, applicationFees, serviceCharge, universityImage, postedUserEmail } = scholarshipData || {};
    // console.log(Object.keys(scholarshipData).join(","));

    const axiosSecure = useAxiosSecure();

    const { data: averageRatingData = {}, isLoading } = useQuery({
        queryKey: ['averageRating', _id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/average-rating/${_id}`);
            return data;
        }
    })

    if (isLoading) return <LoadingSpinner />

    return (
        <div
            className="border-[1px] border-[#0AB99D] group rounded-md shadow-xl transition-all duration-300 hover:shadow-2xl bg-white"
        >
            {/* Image Section */}
            <div className="overflow-hidden h-52 rounded-t-md">
                <img
                    className="group-hover:scale-105 transition-transform duration-300 h-full w-full object-cover rounded-t-md"
                    src={scholarshipData?.universityImage}
                    alt={scholarshipData?.universityName}
                />
            </div>

            {/* Details Section */}
            <div className="px-4 pt-4 flex flex-col gap-2">
                {/* University Name */}
                <div className="flex items-center gap-2">
                    <FaUniversity className="text-xl text-[#0AB99D]" />
                    <h1 className="text-lg font-semibold truncate">
                        {scholarshipData?.universityName}
                    </h1>
                </div>

                {/* Scholarship Name
                <div className="flex items-center gap-2">
                    <FaReadme className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">{scholarshipData.scholarshipName}</p>
                </div> */}

                {/* Scholarship Category */}
                <div className="flex items-center gap-2">
                    <FaReadme className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">{scholarshipData?.scholarshipCategory}</p>
                </div>

                {/* Degree */}
                <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">{scholarshipData?.degree}</p>
                </div>


                {/* University Address */}
                <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">
                        {scholarshipData?.universityCountryName}, {scholarshipData?.universityCity}
                    </p>
                </div>

                {/* Application Deadline */}
                <div className="flex items-center gap-2">
                    <CgCalendarDates className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">
                        {new Date(applicationDeadline).toLocaleDateString()}
                    </p>
                </div>

                {/* Subject Category */}
                <div className="flex items-center gap-2">
                    <GiBlackBook className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">{subjectCategory}</p>
                </div>

                {/* Application Fees */}
                <div className="flex items-center gap-2">
                    <HiOutlineCurrencyDollar className="text-xl text-[#0AB99D]" />
                    <p className="text-gray-600 truncate">${applicationFees}</p>
                </div>

                {/* Average Rating */}
                <div className="flex items-center gap-2">
                    <FaStar className="text-xl text-yellow-500" />
                    <p className="text-gray-600 truncate">{averageRatingData?.averageRating ? averageRatingData?.averageRating.toFixed(2) : 0}</p>
                </div>
            </div>

            {/* Details Button */}
            <div className="flex justify-center items-center py-4">
                <Link to={`/scholarshipDetails/${_id}`}>
                    <button className="py-2 px-6 bg-[#0AB99D] text-white font-semibold rounded-full transition-all duration-300 hover:bg-transparent border-[#0AB99D] border-2 hover:text-[#0AB99D]">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SingleScholarship;