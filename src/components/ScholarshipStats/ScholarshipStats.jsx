import React from 'react';

const ScholarshipStats = () => {

    const stats = [
        {
            id: 1,
            number: "500+",
            label: "Scholarships Available",
        },
        {
            id: 2,
            number: "10,000+",
            label: "Students Helped",
        },
        {
            id: 3,
            number: "$5M+",
            label: "Awarded in Funds",
        },
        {
            id: 4,
            number: "100+",
            label: "Partner Institutions",
        },
    ];

    return (
        <div className="bg-[url(https://images.unsplash.com/photo-1471107191679-f26174d2d41e?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-fixed bg-cover bg-no-repeat bg-opacity-20 mt-16 py-12 mb-16 rounded-md" >
            {/* // <div className="mt-10 py-12 mb-16"> */}
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="flex flex-col items-center justify-center">
                    <h1 className='uppercase font-bold text-3xl md:text-4xl text-white'>Our <span className='text-[#0AB99D]'>Impact</span></h1>
                    <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
                </div>
                {/* End of Heading */}

                {/* <h2 className="text-3xl font-bold text-center text-white mb-8">Our Impact</h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-14 border-0 border-[#0AB99D] rounded-md py-12">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-black bg-opacity-55 p-6 rounded-lg text-center text-white"
                        >
                            <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                            <p className="text-gray-200">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ScholarshipStats;