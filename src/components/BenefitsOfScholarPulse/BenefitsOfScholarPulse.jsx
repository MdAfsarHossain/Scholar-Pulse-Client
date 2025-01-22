import React from 'react';

const BenefitsOfScholarPulse = () => {
    return (
        <div className='mt-20 flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between items-center px-5 lg:px-0'>
            <div className="flex flex-col md:justify-center lg:justify-normal md:items-center lg:items-start text-center lg:text-start gap-3 lg:w-[750px] border-0">
                <h1 className='text-3xl lg:text-6xl font-bold'>Perks and Benefits of Having
                    <span className='text-[#0AB99D] uppercase'> Scholar Pulse</span> Scholarships
                </h1>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center items-center border-2 px-5 py-8 rounded-lg border-orange-500 gap-3">
                    <div className="bg-orange-500 p-2 rounded-full shadow-2xl">
                        <img className='w-12' src="/tuition-fees.png" alt="" />
                    </div>
                    <div className="">
                        <h1 className='text-lg font-semibold'>Tuition Fees</h1>
                        <h1 className='text-lg text-white font-semibold'>.</h1>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center border-2 px-5 py-8 rounded-lg border-green-500 gap-3">
                    <div className="bg-green-500 p-2 rounded-full shadow-2xl">
                        <img className='w-12' src="/home.png" alt="" />
                    </div>
                    <div className=" text-center">
                        <h1 className='text-lg font-semibold'>Board & Lodging</h1>
                        <p className='text-lg font-semibold hidden md:block'>Allowances</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center border-2 px-5 py-8 rounded-lg border-green-500 gap-3">
                    <div className="bg-green-500 p-2 rounded-full shadow-2xl">
                        <img className='w-12' src="/transportation.png" alt="" />
                    </div>
                    <div className="text-center">
                        <h1 className='text-lg font-semibold'>Transportation</h1>
                        <p className='text-lg font-semibold'>Allowancess</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center border-2 px-5 py-8 rounded-lg border-orange-500 gap-3">
                    <div className="bg-orange-500 p-2 rounded-full shadow-2xl flex justify-center items-center">
                        <img className='w-12 text-center' src="/supplies.png" alt="" />
                    </div>
                    <div className="text-center">
                        <h1 className='text-lg font-semibold'>Necessity</h1>
                        <h1 className='text-lg font-semibold'>Supplies</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsOfScholarPulse;