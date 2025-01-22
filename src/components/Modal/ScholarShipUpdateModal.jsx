import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import DatePicker from "react-datepicker";
import { TbFidgetSpinner } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { imageUpload } from '../../api';

const ScholarShipUpdateModal = ({ isOpen, closeModal, scholarShipData, setScholarShipData, handleSubmitForm, handleImage }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [subjectCategory, setSubjectCategory] = useState(scholarShipData?.subjectCategory);
    const [scholarshipCategory, setScholarshipCategory] = useState(scholarShipData?.scholarshipCategory);
    const [degree, setDegree] = useState(scholarShipData?.degree);
    const [applicationDeadline, setApplicationDeadline] = useState(scholarShipData?.applicationDeadline);
    const [scholarshipPostedDate, setScholarshipPostedDate] = useState(new Date());

    // Format the date as MM/DD/YYYY
    const formattedDate = scholarshipPostedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    Update <span className='text-[#0AB99D]'>Scholarship</span>
                                </Dialog.Title>

                                {/* Scholar Ship Info  */}
                                <div className="mt-8 flex items-center justify-center px-0">
                                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5">
                                        <form onSubmit={handleSubmitForm} className="space-y-4">

                                            <div className="grid grid-cols-1 gap-4">
                                                {/* Scholarship Name */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Scholarship Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder='Enter Scholarship Name'
                                                        value={scholarShipData.scholarshipName}
                                                        className="input input-bordered w-full"
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, scholarshipName: e.target.value })
                                                        }
                                                    />

                                                </div>

                                                {/* University Image */}
                                                <div className="form-control">
                                                    <label className="label font-medium">University Image</label>

                                                    <div className="input input-bordered flex items-center">

                                                        <input
                                                            type="file"
                                                            placeholder='Enter University Image'
                                                            className=" w-full"
                                                            onChange={e => handleImage(e.target.files[0])}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* University Details */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">University Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter university name"
                                                        value={scholarShipData?.universityName}
                                                        className="input input-bordered w-full"
                                                        required
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, universityName: e.target.value })
                                                        }
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">University Country</label>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter university country"
                                                            value={scholarShipData?.universityCountryName}
                                                            className="input input-bordered w-full"
                                                            required
                                                            onChange={e =>
                                                                setScholarShipData({ ...scholarShipData, universityCountryName: e.target.value })
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">University City</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter university city"
                                                        value={scholarShipData?.universityCity}
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, universityCity: e.target.value })
                                                        }
                                                        className="input input-bordered w-full"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">World Rank</label>
                                                    <input
                                                        type="number"
                                                        name="world-rank"
                                                        placeholder="Enter university rank"
                                                        value={scholarShipData?.worldRank}
                                                        className="input input-bordered w-full"
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, worldRank: e.target.value })
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                                {/* descripton */}
                                                <div className="form-control">
                                                    <label className="label font-medium">Description</label>
                                                    <textarea
                                                        type="text"
                                                        placeholder="Enter description here"
                                                        value={scholarShipData?.description}
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, description: e.target.value })
                                                        }
                                                        required
                                                        className="input input-bordered w-full textarea text-base"
                                                    />
                                                </div>
                                            </div>

                                            {/* Subject & Scholarship Categories */}
                                            <div className="grid grid-cols-1  gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Subject Category</label>
                                                    <select className="select select-bordered w-full" value={subjectCategory} // Bind state to the dropdown
                                                        onChange={(e) => { setSubjectCategory(e.target.value), setScholarShipData({ ...scholarShipData, subjectCategory: e.target.value }) }}>
                                                        <option disabled selected>
                                                            Select category
                                                        </option>
                                                        <option value="Agriculture">Agriculture</option>
                                                        <option value="Engineering">Engineering</option>
                                                        <option value="Doctor">Doctor</option>
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Scholarship Category</label>
                                                    <select className="select select-bordered w-full"
                                                        value={scholarshipCategory} // Bind state to the dropdown
                                                        onChange={(e) => { setScholarshipCategory(e.target.value), setScholarShipData({ ...scholarShipData, scholarshipCategory: e.target.value }) }}
                                                    >
                                                        <option disabled selected>
                                                            Select category
                                                        </option>
                                                        <option value="Full Fund">Full Fund</option>
                                                        <option value="Partial">Partial</option>
                                                        <option value="Self Fund">Self-Fund</option>
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Posted User Email</label>
                                                    <input
                                                        type="text"
                                                        defaultValue={user?.email}
                                                        readOnly
                                                        className="input input-bordered w-full"
                                                    />
                                                </div>
                                            </div>

                                            {/* Degree, Tuition Fees & Application Fees */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Degree</label>
                                                    <select className="select select-bordered w-full"
                                                        value={degree} // Bind state to the dropdown
                                                        onChange={(e) => { setDegree(e.target.value), setScholarShipData({ ...scholarShipData, degree: e.target.value }) }}
                                                    >
                                                        <option disabled selected>
                                                            Select degree
                                                        </option>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Bachelor">Bachelor</option>
                                                        <option value="Masters">Masters</option>
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Tuition Fees</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter tuition fees"
                                                        value={scholarShipData?.tuitionFees}
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, tuitionFees: e.target.value })
                                                        }
                                                        className="input input-bordered w-full"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Application Fees</label>
                                                    <input
                                                        type="number"
                                                        name='application-fees'
                                                        placeholder="Enter application fees"
                                                        value={scholarShipData?.applicationFees}
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, applicationFees: e.target.value })
                                                        }
                                                        className="input input-bordered w-full"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Service Charge, Deadline, and Post Date */}
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="form-control">
                                                    <label className="label font-medium">Service Charge</label>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter service charge"
                                                        name="service-charge"
                                                        value={scholarShipData?.serviceCharge}
                                                        onChange={e =>
                                                            setScholarShipData({ ...scholarShipData, serviceCharge: e.target.value })
                                                        }
                                                        className="input input-bordered w-full"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Application Deadline</label>
                                                    {/* Date Picker Input Field */}
                                                    <DatePicker
                                                        className="border p-2 rounded-md w-full"
                                                        selected={applicationDeadline}
                                                        onChange={date => {
                                                            setScholarShipData({ ...scholarShipData, applicationDeadline: date }),
                                                                setApplicationDeadline(date)
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label font-medium">Scholarship Post Date</label>
                                                    <input
                                                        value={formattedDate} // Nicely formatted date
                                                        readOnly
                                                        type="text"
                                                        className="input input-bordered w-full"
                                                    />
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="form-control mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={loading} className="disabled:cursor-not-allowed block w-full py-2 rounded-lg text-center bg-[#0AB99D] text-white font-bold text-xl border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all hover:border-[#0AB99D]"
                                                >
                                                    {loading ? (
                                                        <TbFidgetSpinner className="animate-spin m-auto" />
                                                    ) : (
                                                        "Update Scholarship"
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

export default ScholarShipUpdateModal;