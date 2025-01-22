import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../../api';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ApplicantModal = ({ isOpen, closeModal, handleDelete, applicationFees, scholarShipData, setScholarShipData, handleSubmitForm }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [degree, setDegree] = useState(scholarShipData?.degree);
    const [gender, setGender] = useState("Men");
    const [studyGap, setStudyGap] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { data: applicantsInfoFromDB, isLoading } = useQuery({
        queryKey: ['applicantsInfoFromDB', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;


    // Format the date as MM/DD/YYYY
    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const onSubmit = async (data) => {
        // TODO: Add API call to save scholarship data
        setLoading(true);
        const applicantsPhoneNumber = data.applicantsPhoneNumber;
        const applicantsAddress = data.applicantsAddress;
        const hscResult = data.hscResult;
        const sscResult = data.sscResult;
        const scholarshipId = scholarShipData?._id;

        const applicantsImage = data.applicantsImage[0];

        const formData = new FormData();
        formData.append("image", applicantsImage);

        try {

            // 1. Upload imag and get image url
            const image_url = await imageUpload(applicantsImage);

            const applicantsData = {
                applicantsPhoneNumber,
                // photo
                applicantsAddress,
                gender,
                degree,
                sscResult,
                hscResult,
                studyGap,
                applicationFees,
                universityName: scholarShipData?.universityName,
                scholarshipName: scholarShipData?.scholarshipName,
                subjectCategory: scholarShipData?.subjectCategory,
                applicationDeadline: scholarShipData?.applicationDeadline,
                applicantsEmail: user?.email,
                applicantsName: user?.displayName,
                applicantsImage: image_url,
                scholarshipId,
                userId: applicantsInfoFromDB?._id,
            }
            // console.table(applicantsData);

            // 2. Save the applicants data to the database

            const { data } = await axiosSecure.post('/add-application', applicantsData);

            //         // Save the scholarship data to the database

            toast.success("Scholarship applied successfully!");
            navigate('/dashboard/my-applications');
        } catch (error) {
            toast.error(error.message);
        } finally {
            closeModal();
            setLoading(false);
        }
    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed top-20 lg:top-20 inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-bold leading-6 text-gray-900 text-center"
                                >
                                    Add Applicants <span className='text-[#0AB99D]'>Information</span>
                                </Dialog.Title>

                                {/* Scholar Ship Info  */}
                                <div className="mt-8 flex items-center justify-center px-0">
                                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                            <div className="grid grid-cols-1 gap-4">
                                                {/* Applicant's Phone Number */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Phone Number</label>
                                                    <input
                                                        type="phone"
                                                        placeholder="Enter Applicants Phone Number"
                                                        className="input input-bordered w-full"
                                                        {...register("applicantsPhoneNumber", { required: true })}
                                                    />
                                                    {errors.applicantsPhoneNumber && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>

                                                {/* Applicants Image */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Image</label>
                                                    <div className="input input-bordered flex items-center">
                                                        <input
                                                            type="file"
                                                            placeholder='Enter Applicants Image'
                                                            className=" w-full"
                                                            {...register("applicantsImage", { required: true })}
                                                        />
                                                    </div>
                                                    {errors.applicantsImage && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Applicants Address */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Applicants address"
                                                        className="input input-bordered w-full"
                                                        {...register("applicantsAddress", { required: true })}
                                                    />
                                                    {errors.applicantsAddress && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>
                                            </div>


                                            {/* Applicants Gender */}
                                            <div className="grid grid-cols-1  gap-4">
                                                {/* Gender */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Gender
                                                    </label>
                                                    <select className="select select-bordered w-full"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option disabled selected>
                                                            Select Gender
                                                        </option>
                                                        <option value="Men">Men</option>
                                                        <option value="Women">Women</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>

                                                {/* Degree */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicants Applying Degree</label>
                                                    <select className="select select-bordered w-full"
                                                        value={degree}
                                                        onChange={(e) => setDegree(e.target.value)}
                                                    >
                                                        <option disabled selected>
                                                            Select degree
                                                        </option>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Bachelor">Bachelor</option>
                                                        <option value="Masters">Masters</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* SSC, HSC Result and Study Gap */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">SSC Result</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter SSC Result"
                                                        className="input input-bordered w-full"
                                                        {...register("sscResult", { required: true })}
                                                    />
                                                    {errors.sscResult && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}

                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">HSC Result</label>
                                                    <input
                                                        type="text"
                                                        name='application-fees'
                                                        placeholder="Enter HSC Result"
                                                        className="input input-bordered w-full"
                                                        {...register("hscResult", { required: true })}
                                                    />
                                                    {errors.hscResult && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>

                                                {/* Study Gap */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Study Gap</label>
                                                    <select className="select select-bordered w-full"
                                                        value={studyGap} // Bind state to the dropdown
                                                        onChange={(e) => setStudyGap(e.target.value)}
                                                    >
                                                        <option disabled selected>
                                                            Select gap
                                                        </option>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* University Information */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">University Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter University Name"
                                                        value={scholarShipData?.universityName}
                                                        readOnly
                                                        className="input input-bordered w-full"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Scholarships Category</label>
                                                    <input
                                                        type="text"
                                                        name="world-rank"
                                                        placeholder="Enter Scholarships Category"
                                                        value={scholarShipData?.scholarshipCategory}
                                                        readOnly
                                                        className="input input-bordered w-full"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Subject Category</label>
                                                    <input
                                                        type="text"
                                                        name="world-rank"
                                                        placeholder="Enter Subject Category"
                                                        value={scholarShipData?.subjectCategory}
                                                        readOnly
                                                        className="input input-bordered w-full"
                                                    />
                                                </div>
                                            </div>


                                            {/* Submit Button */}
                                            <div className="form-control mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    // onClick={closeModal}
                                                    className="disabled:cursor-not-allowed block w-full py-2 rounded-lg text-center bg-[#0AB99D] text-white font-bold text-xl border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all hover:border-[#0AB99D] uppercase"
                                                >
                                                    {loading ? (
                                                        <TbFidgetSpinner className="animate-spin m-auto" />
                                                    ) : (
                                                        "Apply"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/* End of Scholar Ship Info  */}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ApplicantModal;