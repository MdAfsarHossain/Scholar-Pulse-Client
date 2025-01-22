import React from 'react';

const BecomeDoctor = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between items-center py-16 gap-10 px-5 md:px-5 lg:px-0'>
            {/* Description */}
            <div className="flex-1 flex flex-col gap-5 ">
                <div className="flex flex-col gap-4">
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold  md:text-start'>People who desires to become an <span className='text-[#0AB99D] uppercase font-bold'>engineer</span> are given an opportunity by our Scholarship!</h1>
                    <p>Our Scholarship provides aspiring engineers with an incredible opportunity to achieve their dreams! Designed to support talented and driven individuals, this program offers financial assistance and resources to help students pursue their engineering education. Whether you're passionate about innovation, problem-solving, or building the future, our scholarship is here to empower your journey toward becoming an engineer. Start shaping your future today!.</p>
                </div>

                <div className="mt-5">
                    <button
                        className='px-8 py-2 border-2 border-[#0AB99D] text-[#0AB99D] hover:bg-[#0AB99D] hover:text-white font-bold rounded-full transition-all'
                    >Learn More</button>
                </div>
            </div>

            {/* Image */}
            <div className="flex-1">
                <img className='rounded-md' src="/engineer.avif" alt="" />
            </div>
        </div>
    );
};

export default BecomeDoctor;