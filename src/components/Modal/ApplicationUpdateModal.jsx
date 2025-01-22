import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApplicationUpdateModal = ({ isOpen, closeModal, handleImage, applicantsData, setApplicantsData, handleSubmitForm }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [degree, setDegree] = useState(applicantsData?.degree);
    const [gender, setGender] = useState(applicantsData?.gender);
    const [studyGap, setStudyGap] = useState(applicantsData?.studyGap);

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
                                    Update Applicants <span className='text-[#0AB99D]'>Information</span>
                                </Dialog.Title>

                                {/* Scholar Ship Info  */}
                                <div className="mt-8 flex items-center justify-center px-0">
                                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
                                        <form onSubmit={handleSubmitForm} className="space-y-4">

                                            <div className="grid grid-cols-1 gap-4">
                                                {/* Applicant's Phone Number */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Phone Number</label>
                                                    <input
                                                        type="phone"
                                                        placeholder="Enter Applicants Phone Number"
                                                        className="input input-bordered w-full"
                                                        required
                                                        value={applicantsData?.applicantsPhoneNumber}
                                                        onChange={e =>
                                                            setApplicantsData({ ...applicantsData, applicantsPhoneNumber: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                {/* Applicants Image */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Image</label>
                                                    <div className="input input-bordered flex items-center">
                                                        <input
                                                            type="file"
                                                            onChange={e => handleImage(e.target.files[0])}
                                                            placeholder='Enter Applicants Image'
                                                            className=" w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Applicants Address */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Applicant's Address</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="Enter Applicants address"
                                                        value={applicantsData?.applicantsAddress}
                                                        className="input input-bordered w-full"
                                                        onChange={e =>
                                                            setApplicantsData({ ...applicantsData, applicantsAddress: e.target.value })
                                                        }
                                                    />
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
                                                        onChange={e => {
                                                            setApplicantsData({ ...applicantsData, gender: e.target.value }),
                                                                setGender(e.target.value)
                                                        }
                                                        }
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
                                                        onChange={e => {
                                                            setApplicantsData({ ...applicantsData, degree: e.target.value }),
                                                                setDegree(e.target.value)
                                                        }
                                                        }
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
                                                        required
                                                        placeholder="Enter SSC Result"
                                                        value={applicantsData?.sscResult}
                                                        className="input input-bordered w-full"
                                                        onChange={e =>
                                                            setApplicantsData({ ...applicantsData, sscResult: e.target.value })
                                                        }
                                                    />

                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">HSC Result</label>
                                                    <input
                                                        type="text"
                                                        name='application-fees'
                                                        placeholder="Enter HSC Result"
                                                        required
                                                        value={applicantsData?.hscResult} // Bind state to the input field
                                                        className="input input-bordered w-full"
                                                        onChange={e =>
                                                            setApplicantsData({ ...applicantsData, hscResult: e.target.value })
                                                        }
                                                    />
                                                </div>

                                                {/* Study Gap */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Study Gap</label>
                                                    <select className="select select-bordered w-full"
                                                        value={studyGap} // Bind state to the dropdown
                                                        onChange={e => {
                                                            setApplicantsData({ ...applicantsData, studyGap: e.target.value }), setStudyGap(e.target.value)
                                                        }
                                                        }
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
                                                        "Update"
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

export default ApplicationUpdateModal;