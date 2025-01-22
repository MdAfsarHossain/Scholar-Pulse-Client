import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../api";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
    const { user } = useAuth() || {};
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const [subjectCategory, setSubjectCategory] = useState("Agriculture");
    const [scholarship, setScholarship] = useState("Full Fund");
    const [degree, setDegree] = useState("Diploma");
    const [applicationDeadline, setApplicationDeadline] = useState(new Date());
    const [scholarshipPostedDate, setScholarshipPostedDate] = useState(new Date());
    let tuitionFees = 0;

    // Format the date as MM/DD/YYYY
    const formattedDate = scholarshipPostedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const onSubmit = async (data) => {
        // TODO: Add API call to save scholarship data
        setLoading(true);
        const scholarshipName = data.scholarshipName;
        const universityName = data.universityName;
        const universityCountryName = data.universityCountryName;
        const universityCity = data.universityCity;
        const worldRank = data.worldRank;
        const applicationFees = data.applicationFees;
        const serviceCharge = data.serviceCharge;
        const tuitionFees = data.tuitionFees;
        const description = data.description;
        const universityImage = data.universityImage[0];
        // const photoUrl = data.universityImage;

        const formData = new FormData();
        formData.append("image", universityImage);

        try {

            // 1. Upload imag and get image url
            const image_url = await imageUpload(universityImage);

            const scholarShipData = {
                scholarshipName,
                universityName,
                universityCountryName,
                universityCity,
                description,
                subjectCategory,
                scholarshipCategory: scholarship,
                tuitionFees,
                applicationDeadline,
                scholarshipPostedDate,
                degree,
                worldRank,
                applicationFees,
                serviceCharge,
                universityImage: image_url,
                postedUserEmail: user?.email
            }

            // 2. Save the scholarship data to the database
            const { data } = await axiosSecure.post('/add-scholarship', scholarShipData);

            // Save the scholarship data to the database
            toast.success("New ScholarShip Data added successfully!");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Helmet>
                <title>Scholar Pulse | Add Scholarship</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Add <span className='text-[#0AB99D]'>Scholarship</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            <div className="min-h-screen  flex items-center justify-center px-4 mb-20">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Scholarship Name */}
                            <div className="form-control">
                                <label className="label font-medium">Scholarship Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter scholarship name"
                                    className="input input-bordered w-full"
                                    {...register("scholarshipName", { required: true })}
                                />
                                {errors.scholarshipName && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>

                            {/* University Image */}
                            <div className="form-control">
                                <label className="label font-medium">University Image</label>
                                <div className="input input-bordered flex items-center">
                                    <input
                                        type="file"
                                        placeholder="Enter university image"
                                        className=" w-full"
                                        {...register("universityImage", { required: true })}
                                    />
                                </div>
                                {errors.universityImage && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                        </div>

                        {/* University Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* University Name */}
                            <div className="form-control">
                                <label className="label font-medium">University Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter university name"
                                    className="input input-bordered w-full"
                                    {...register("universityName", { required: true })}
                                />
                                {errors.universityName && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>

                            {/* University Country */}
                            <div className="form-control">
                                <label className="label font-medium">University Country</label>
                                <div className="flex items-center justify-center">
                                    <input
                                        type="text"
                                        placeholder="Enter university country"
                                        className="input input-bordered w-full"
                                        {...register("universityCountryName", { required: true })}
                                    />
                                    {errors.universityCountryName && (
                                        <span className="text-red-500">This field is required</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* University City */}
                            <div className="form-control">
                                <label className="label font-medium">University City</label>
                                <input
                                    type="text"
                                    placeholder="Enter university city"
                                    className="input input-bordered w-full"
                                    {...register("universityCity", { required: true })}
                                />
                                {errors.universityCity && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>

                            {/* University World rank */}
                            <div className="form-control">
                                <label className="label font-medium">World Rank</label>
                                <input
                                    type="number"
                                    placeholder="Enter university rank"
                                    className="input input-bordered w-full"
                                    {...register("worldRank", { required: true })}
                                />
                                {errors.worldRank && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {/* descripton */}
                            <div className="form-control">
                                <label className="label font-medium">Description</label>
                                <textarea
                                    type="text"
                                    placeholder="Enter description here"
                                    className="input input-bordered w-full textarea text-base"
                                    {...register("description", { required: true })}
                                />
                                {errors.description && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                        </div>

                        {/* Subject & Scholarship Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label font-medium">Subject Category</label>
                                <select className="select select-bordered w-full" value={subjectCategory} // Bind state to the dropdown
                                    onChange={(e) => setSubjectCategory(e.target.value)}>
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
                                    value={scholarship} // Bind state to the dropdown
                                    onChange={(e) => setScholarship(e.target.value)}
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label font-medium">Degree</label>
                                <select className="select select-bordered w-full"
                                    value={degree} // Bind state to the dropdown
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
                            <div className="form-control">
                                <label className="label font-medium">Tuition Fees</label>
                                <input
                                    type="number"
                                    placeholder="Enter tuition fees"
                                    defaultValue={0}
                                    className="input input-bordered w-full"
                                    {...register("tuitionFees", { required: false })}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium">Application Fees</label>
                                <input
                                    type="number"
                                    placeholder="Enter application fees"
                                    className="input input-bordered w-full"
                                    {...register("applicationFees", { required: true })}
                                />
                                {errors.applicationFees && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                        </div>

                        {/* Service Charge, Deadline, and Post Date */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="form-control">
                                <label className="label font-medium">Service Charge</label>
                                <input
                                    type="number"
                                    placeholder="Enter service charge"
                                    className="input input-bordered w-full"
                                    {...register("serviceCharge", { required: true })}
                                />
                                {errors.serviceCharge && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label font-medium">Application Deadline</label>
                                {/* Date Picker Input Field */}
                                <DatePicker
                                    className="border p-2 rounded-md w-full lg:w-auto"
                                    selected={applicationDeadline}
                                    onChange={(date) => setApplicationDeadline(date)}
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
                                disabled={loading}
                                className="disabled:cursor-not-allowed block w-full py-2 rounded-lg text-center bg-[#0AB99D] text-white font-bold text-xl border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] transition-all hover:border-[#0AB99D]"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className="animate-spin m-auto" />
                                ) : (
                                    "Add Scholarship"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddScholarship;
