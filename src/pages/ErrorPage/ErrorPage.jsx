import { Link } from "react-router-dom";

const Error = () => {
    return (
        <section className="flex items-center h-full p-16 ">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-red-500">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>

                    <Link
                        to='/'
                    >
                        <button
                            className="px-8 py-3 rounded bg-[#0AB99D] text-white font-bold border-2 border-[#0AB99D] hover:bg-transparent hover:text-[#0AB99D] hover:border-[#0AB99D] transition-all">Back to homepage</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Error;