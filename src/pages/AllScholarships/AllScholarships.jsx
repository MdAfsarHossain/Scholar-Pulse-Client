import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaRegFolderOpen } from "react-icons/fa";
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import SingleScholarship from '../../components/SingleScholarship/SingleScholarship';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllScholarships = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");
    const [selectedDegreeType, setSelectedDegreeType] = useState("");
    const [sortType, setSortType] = useState("");

    // For Pagination
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [totalScholarShip, setTotalScholarShip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

    }, [searchText, selectedDegreeType, currentPage]);

    // List of artifacts types
    const degreeType = [
        "All Type",
        "Diploma",
        "Bachelor",
        "Masters",
    ]

    // List of Sorting types
    const sortingType = [
        "ALL",
        "ASC",
        "DESC",
    ]

    const { data: allScholarShips = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['allScholarShips', selectedDegreeType, currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL
                }/all-scholarships?filter=${selectedDegreeType}&search=${searchText}&page=${currentPage}&size=${itemsPerPage}&sort=${sortType}`);
            return data;
        }
    })

    // Count Total Visa
    useEffect(() => {
        const getTotalScholarShip = async () => {
            setFlag(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL
                }/scholarships-count?filter=${selectedDegreeType}&search=${searchText}`
            );
            setFlag(false);
            setTotalScholarShip(data.count);
        };

        useEffect(() => {
            refetch();
        }, [sortType])

        getTotalScholarShip();
    }, [searchText, selectedDegreeType, sortType]);




    const numberOfPages = Math.ceil(totalScholarShip / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

    // Handle Pagination button
    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    };

    // Handle change event
    const handleChange = (event) => {
        setSelectedDegreeType(event.target.value);
    };

    // Handle Sort Type
    const handleChangeSortType = (event) => {
        // console.log(event.target.value);
        setSortType(event.target.value);
    };

    const handleSearchBtn = async () => {
        refetch();
        // setSearchText("");
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL
            }/all-scholarships?filter=${selectedDegreeType}&search=${searchText}`
        );
        setDisplayVisasData(data);
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div className='mt-24'>

            <Helmet>
                <title>Scholar Pulse | All Scholarships</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>All <span className='text-[#0AB99D]'>Scholarships</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}


            {/* Search */}
            <div className="border-0 flex flex-row gap-5 justify-between mt-8 px-5 md:px-10">

                {/* <div className="flex-1 hidden lg:block text-white">
                    <p>.</p>
                </div> */}



                <div className="flex-1 flex flex-row gap-5 justify-center">
                    <input
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        type="text"
                        value={searchText}
                        placeholder="Enter name for search...."
                        className="input input-bordered border-[#0AB99D] lg:w-[350px]"
                    />
                    <button
                        onClick={handleSearchBtn}
                        className="bg-[#0AB99D] font-bold px-5 rounded-lg text-white border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] hover:border-[#0AB99D] transition-all"
                    >
                        Search
                    </button>
                </div>

                {/* Sorting By Artifacte Types */}
                <div className="flex-1 hidden md:block">
                    <div className="flex flex-row gap-3 justify-center items-center">
                        <label htmlFor="artifactType" className="block mb-2 text-lg">
                            Filter:
                        </label>
                        <div className="artifact-dropdown">
                            <select
                                id="artifacteType"
                                value={selectedDegreeType}
                                onChange={handleChange}
                                className="w-full p-2 border border-[#0AB99D] rounded-lg"
                            >
                                <option value="" disabled>
                                    -- Choose Degree --
                                </option>
                                {degreeType.map((type, index) => (
                                    <option
                                        key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            {/* {selectedArtifactType && (
                                <p className="mt-3 text-sm text-green-600">
                                    You selected: <strong>{selectedArtifactType}</strong>
                                </p>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Serach */}

            {
                allScholarShips?.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center py-10">
                        <div className="bg-gray-100 shadow-md p-6 rounded-lg">
                            <div className="text-blue-500 text-8xl mb-4 text-center flex flex-row justify-center items-center">
                                <FaRegFolderOpen />
                            </div>
                            <h1 className="text-4xl font-bold text-red-500">
                                No Data Found!
                            </h1>
                            <p className="text-gray-500 mt-2">
                                It seems like we couldn't find any scholarships matching your criteria. <br />Please try again later! Thank you!</p>
                        </div>
                    </div>
                )
            }

            {/* All Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-16 px-5 lg:px-0">
                {allScholarShips?.map((singleScholarShipData) => (
                    <SingleScholarship
                        key={singleScholarShipData?._id}
                        scholarshipData={singleScholarShipData}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className={`justify-center space-x-1  mt-16 ${allScholarShips?.length === 0 ? 'hidden' : 'flex'}`}>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    title="previous"
                    type="button"
                    className="disabled:cursor-not-allowed inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md  border-[#0AB99D]"
                >
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                {/* Pages Number */}
                {pages.map((btnNum) => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        type="button"
                        className={`inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md  border-[#0AB99D] ${currentPage === btnNum
                            ? "bg-[#0AB99D] text-white border-[#0AB99D]"
                            : ""
                            }`}
                        title="Page 2"
                    >
                        {btnNum}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    title="next"
                    type="button"
                    className="disabled:cursor-not-allowed inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md  border-[#0AB99D]"
                >
                    <svg
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            {/* End of Pagination */}
        </div >
    );
};

export default AllScholarships;