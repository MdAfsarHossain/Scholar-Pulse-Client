import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { SiCodesignal } from "react-icons/si";
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="footer footer-center mt-28 p-0 lg:p-10 md:p-0 border-0">

            {/* New Content */}
            <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center lg:justify-between items-center lg:items-start border-0 w-full py-10 lg:pr-10">
                <div className="flex flex-col gap-3">
                    <aside className="flex flex-col justify-center lg:justify-start items-center gap-4">
                        <p><SiCodesignal className="text-7xl text-[#0AB99D]" /></p>
                        <p className="font-bold uppercase text-3xl">
                            Scholar <span className="text-[#0AB99D]">Pulse</span>
                        </p>
                    </aside>

                    {/* Address, Phone, Email */}
                    <div className="flex flex-col gap-2 mt-5">
                        {/* Address */}
                        <div className="flex flex-row justify-start items-center gap-5">
                            <IoLocationOutline className="text-xl" />
                            <h1 className="text-base text-gray-700 font-medium">Oxyzen, Chattogram, Bangladesh</h1>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-row justify-start items-center gap-5">
                            <IoCallOutline className="text-xl" />
                            <h1 className="text-base text-gray-700 font-medium">+880 123 456 789</h1>
                        </div>

                        {/* Mail */}
                        <div className="flex flex-row justify-start items-center gap-5">
                            <IoMailOutline className="text-xl" />
                            <h1 className="text-base text-gray-700 font-medium">afsar291722@gmail.com</h1>
                        </div>
                    </div>
                </div>

                {/* Navlink */}
                <div className="flex flex-row justify-between w-full lg:w-auto px-5 md:px-14 lg:justify-between gap-8 lg:gap-48 border-0">
                    {/* Nav-1 */}
                    <div className="py-3 flex flex-col gap-5 justify-start items-start">
                        <div className="">
                            <h1 className="text-xl font-bold border-b-2 pb-1 border-[#0AB99D]">Navigate</h1>
                        </div>
                        <ul className="flex flex-col md:flex-col items-start gap-1 md:gap-5 text-base">
                            <li><Link
                                to='/'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >Home</Link></li>

                            <li><Link
                                to='/all-scholarships'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >All Scholarships</Link></li>

                            <li><Link
                                to='/'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >About Us</Link></li>

                            <li><Link
                                to='/'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >Contact Us</Link></li>
                        </ul>
                    </div>


                    {/* Nav-2 */}
                    <div className="py-3 flex flex-col gap-5 justify-start items-start">
                        <div className="">
                            <h1 className="text-xl font-bold border-b-2 pb-1 border-[#0AB99D]">Help</h1>
                        </div>
                        <ul className="flex flex-col md:flex-col items-start gap-1 md:gap-5 text-base">
                            <li><Link
                                to='/'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >Benefits</Link></li>

                            <li><Link
                                to='/'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >Requirements</Link></li>

                            <li><Link
                                to='/artifacts-reviews'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >FAQs</Link></li>

                            <li><Link
                                to='/history-blogs'
                                className="hover:text-[#0AB99D] transition-all font-semibold"
                            >Terms and Conditions</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copyright */}
            <div className="pb-5">
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </div>
        </footer>
    );
};

export default Footer;