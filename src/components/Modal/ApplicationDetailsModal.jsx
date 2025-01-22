import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApplicationDetailsModal = ({ isOpen, closeModal, scholarship }) => {
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rating, setRating] = useState(5);

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
                                    className="text-3xl font-bold leading-6 text-gray-900 text-center"
                                >
                                    Applied <span className='text-[#0AB99D]'>Information</span>
                                </Dialog.Title>

                                {/* Scholar Ship Info  */}
                                <div className="mt-8 flex items-center justify-center px-0">
                                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
                                        {/* University Information */}
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="form-control">
                                                <label className="label font-medium">University Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter review here"
                                                    value={scholarship?.universityName}
                                                    readOnly
                                                    className="input input-bordered w-full"
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label font-medium">Applied Degree</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter review here"
                                                    value={scholarship?.degree}
                                                    readOnly
                                                    className="input input-bordered w-full"
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label font-medium">Scholarship Category</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter review here"
                                                    value={scholarship?.scholarshipName}
                                                    readOnly
                                                    className="input input-bordered w-full"
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label font-medium">Subject Category</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter review here"
                                                    value={scholarship?.subjectCategory}
                                                    readOnly
                                                    className="input input-bordered w-full"
                                                />
                                            </div>
                                        </div>


                                        {/* Submit Button */}
                                        <div className="form-control mt-4">
                                            <button
                                                onClick={closeModal}
                                                className="disabled:cursor-not-allowed block w-full py-2 rounded-lg text-center bg-[#0AB99D] text-white font-bold text-xl border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all hover:border-[#0AB99D] uppercase"
                                            >
                                                Close
                                            </button>
                                        </div>
                                        {/* </form> */}
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

export default ApplicationDetailsModal;