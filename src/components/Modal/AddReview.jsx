import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddReview = ({ isOpen, closeModal, application }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rating, setRating] = useState(5);

    // Format the date as MM/DD/YYYY
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const reviewRating = rating;
        const reviewComment = data.reviewComment;
        const timestamp = formattedDate;

        try {


            const reviewData = {
                reviewRating,
                reviewComment,
                timestamp,
                scholarshipName: application?.scholarshipName,
                universityName: application?.universityName,
                userId: application?.userId,
                scholarshipId: application?.scholarshipId,
                reviewrName: user?.displayName,
                reviewrImage: user?.photoURL,
                reviewrEmail: user?.email,
            }

            const { data } = await axiosSecure.post(`/add-review`, reviewData);
            toast.success("Review added successfully!");
            navigate(`/dashboard/my-reviews`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            closeModal();
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative " onClose={closeModal}>
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

                <div className="fixed inset-0 overflow-y-auto">
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
                                    Add <span className='text-[#0AB99D]'>Review</span>
                                </Dialog.Title>

                                {/* Scholar Ship Info  */}
                                <div className="mt-8 flex items-center justify-center px-0">
                                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            {/* SSC, HSC Result and Study Gap */}
                                            <div className="grid grid-cols-1 gap-4">

                                                {/* Rating */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Rating Point</label>
                                                    <select className="select select-bordered w-full"
                                                        value={rating} // Bind state to the dropdown
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option disabled selected>
                                                            Select Ratig Point
                                                        </option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* University Information */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Review Comment</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter review here"
                                                        className="input input-bordered w-full"
                                                        {...register("reviewComment", { required: true })}
                                                    />
                                                    {errors.reviewComment && (
                                                        <span className="text-red-500">This field is required</span>
                                                    )}
                                                </div>

                                                {/* Current Date */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Review Date</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter University Name"
                                                        value={formattedDate}
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
                                                    className="disabled:cursor-not-allowed block w-full py-2 rounded-lg text-center bg-[#0AB99D] text-white font-bold text-xl border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all hover:border-[#0AB99D] uppercase"
                                                >
                                                    {loading ? (
                                                        <TbFidgetSpinner className="animate-spin m-auto" />
                                                    ) : (
                                                        "Add Review"
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

export default AddReview;