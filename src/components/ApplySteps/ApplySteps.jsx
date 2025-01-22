import React from 'react';

const ApplySteps = () => {
    return (
        <div className='px-5 lg:px-0'>
            {/* Heading */}
            <div className="flex flex-col items-center justify-center text-center lg:text-start md:w-96 md:mx-auto">
                <h1 className='uppercase font-bold text-3xl md:text-4xl text-center'>Few Steps to Apply <span className='text-[#0AB99D]'>for Scholarships</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {/* Steps - 1 */}
                <div className="border-[1px]  p-5 flex flex-col justify-center items-center rounded-xl gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <div className="">
                        <h1 className='font-bold text-3xl'>1</h1>
                    </div>
                    <div className="">
                        <img className='w-16' src="/apply.png" alt="" />
                    </div>
                    <div className="w-40 text-center">
                        <h1 className='text-lg font-semibold'>See if there's an open Application</h1>
                    </div>
                </div>

                {/* Steps - 2 */}
                <div className="border-[1px]  p-5 flex flex-col justify-center items-center rounded-xl gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <div className="">
                        <h1 className='font-bold text-3xl'>2</h1>
                    </div>
                    <div className="">
                        <img className='w-20' src="/documents.png" alt="" />
                    </div>
                    <div className="w-52 text-center">
                        <h1 className='text-lg font-semibold'>Gather the following documents</h1>
                    </div>
                </div>

                {/* Steps - 3 */}
                <div className="border-[1px]  p-5 flex flex-col justify-center items-center rounded-xl gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <div className="">
                        <h1 className='font-bold text-3xl'>3</h1>
                    </div>
                    <div className="">
                        <img className='w-20' src="/account.png" alt="" />
                    </div>
                    <div className="w-40 text-center">
                        <h1 className='text-lg font-semibold'>Create an Account</h1>
                        <p className='text-white'>.</p>
                    </div>
                </div>

                {/* Steps - 4 */}
                <div className="border-[1px]  p-5 flex flex-col justify-center items-center rounded-xl gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <div className="">
                        <h1 className='font-bold text-3xl'>4</h1>
                    </div>
                    <div className="">
                        <img className='w-20' src="/form.png" alt="" />
                    </div>
                    <div className="w-40 text-center">
                        <h1 className='text-lg font-semibold'>Fill out the application form</h1>
                    </div>
                </div>

                {/* Steps - 5 */}
                <div className="border-[1px]  p-5 flex flex-col justify-center items-center rounded-xl gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <div className="">
                        <h1 className='font-bold text-3xl'>5</h1>
                    </div>
                    <div className="">
                        <img className='w-16' src="/review.png" alt="" />
                    </div>
                    <div className="w-40 text-center">
                        <h1 className='text-lg font-semibold'>Review and Submit</h1>
                        <p className='text-white'>.</p>
                    </div>
                </div>

                {/* Steps - 6 */}
                <div className="border-[1px]  p-5 flex flex-col justify-center items-center rounded-xl gap-3 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <div className="">
                        <h1 className='font-bold text-3xl'>6</h1>
                    </div>
                    <div className="">
                        <img className='w-20' src="/email.png" alt="" />
                    </div>
                    <div className="w-40 text-center">
                        <h1 className='text-lg font-semibold'>Wait for results in your email.</h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ApplySteps;