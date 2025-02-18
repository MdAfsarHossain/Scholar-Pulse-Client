import { useQuery } from '@tanstack/react-query';
import { FaStar } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Helmet } from 'react-helmet-async';
import { FreeMode, Pagination } from 'swiper/modules';
import useAuth from '../../hooks/useAuth';

const ScholarshipDetails = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: scholarShipData, isLoading, refetch } = useQuery({
        queryKey: ['scholarShipData', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-scholartship/${id}`);
            return data;
        }
    });

    const { data: reviews = [], isLoading: reviewIsLoading, refetch: reviewFefetch } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${id}`);
            return data;
        }
    })

    const { _id, scholarshipName, universityName, universityCountryName, universityCity, subjectCategory, tuitionFees, applicationDeadline, scholarshipPostedDate, scholarshipCategory, degree, worldRank, applicationFees, serviceCharge, universityImage, postedUserEmail, description } = scholarShipData || {};


    const fakeReviews = [
        {
            image: "https://i.ibb.co.com/nc69KQh/tarek.jpg",
            name: "John Doe",
            date: "01/12/2025",
            rating: 4.5,
            comments: "Great opportunity with excellent support!",
        },
        {
            image: "https://i.ibb.co.com/nc69KQh/tarek.jpg",
            name: "Jane Smith",
            date: "12/10/2024",
            rating: 5,
            comments: "Highly recommend applying for this scholarship!",
        },
        {
            image: "https://i.ibb.co.com/nc69KQh/tarek.jpg",
            name: "Alice Johnson",
            date: "11/09/2024",
            rating: 4,
            comments: "Good scholarship but the application process was a bit lengthy.",
        },
        {
            image: "https://i.ibb.co.com/nc69KQh/tarek.jpg",
            name: "Alice Johnson",
            date: "11/09/2024",
            rating: 4,
            comments: "Good scholarship but the application process was a bit lengthy.",
        },
        {
            image: "https://i.ibb.co.com/nc69KQh/tarek.jpg",
            name: "Alice Johnson",
            date: "11/09/2024",
            rating: 4,
            comments: "Good scholarship but the application process was a bit lengthy.",
        },
    ];

    if (isLoading || reviewIsLoading) return <LoadingSpinner />



    return (
        <div className="max-w-7xl mx-auto p-6 mt-20">

            {/* Dynamic Title */}
            <Helmet>
                <title>Scholar Plus | {universityName}</title>
            </Helmet>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-lg p-6">
                <img
                    src={universityImage}
                    alt="University Logo"
                    className="w-32 h-32 object-cover rounded-full"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">University Name: {universityName}</h1>
                    <p className="text-gray-600">
                        <span className="font-medium">Location:</span> {universityCity}, {universityCountryName}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Scholarship Category:</span> {scholarshipCategory}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Degree:</span> {degree}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Subject Category:</span> {subjectCategory}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Application Deadline:</span> {new Date(applicationDeadline).toLocaleDateString()}

                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Tuition Fees: $</span>{tuitionFees}
                    </p>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Scholarship Details</h2>
                <p className="text-gray-700 mb-4">
                    {description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-gray-600">
                        <span className="font-medium">Stipend:</span> ${scholarShipData?.stipend ? scholarShipData?.stipend : 0}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Post Date:</span> {new Date(scholarshipPostedDate).toLocaleDateString()}

                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Service Charge:</span> ${serviceCharge}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Application Fees:</span> ${applicationFees}
                    </p>
                </div>
                <Link
                    to={`/checkout/${_id}`}
                >
                    <button
                        disabled={!user}
                        className="disabled:cursor-not-allowed py-2 px-4 bg-[#0AB99D] text-white border-[#0AB99D] border-2 font-bold rounded-md mt-4 hover:bg-transparent transition-all hover:text-[#0AB99D]">
                        Apply for Scholarship
                    </button>
                </Link>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-4">User Reviews</h2>
                <>
                    <Swiper
                        spaceBetween={30}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"

                        breakpoints={{
                            // Small devices
                            0: {
                                slidesPerView: 1,
                            },
                            // Medium devices (e.g., tablets)
                            768: {
                                slidesPerView: 2,
                            },
                            // Large devices (e.g., desktops)
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {
                            reviews?.map((review) =>
                                <SwiperSlide key={review?._id} className='h-56 border-[1px] border-[#0AB99D] rounded-lg'>
                                    <div className="bg-white shadow-md rounded-lg p-4 w-full h-64">
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                src={review?.reviewrImage}
                                                alt={review?.reviewrName}
                                                className="w-16 h-16 object-cover rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-bold text-xl">{review?.reviewrName}</h3>
                                                <p className="text-base text-gray-500">{review?.timestamp}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={`text-3xl ${i < Math.floor(review?.reviewRating) ? "text-yellow-500" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                            <span className="ml-2 text-lg text-gray-600">{review?.reviewRating}/5</span>
                                        </div>
                                        <p className="text-gray-700 text-lg">{review.reviewComment}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </>
            </div>
        </div>
    );

};

export default ScholarshipDetails;