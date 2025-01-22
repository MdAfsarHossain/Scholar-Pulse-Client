// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

// import required modules
import { Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="px-5 lg:px-0 -mt-2 mb-8">
            <Swiper
                rewind={true}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                // modules={[Navigation]}
                // Autoplay,
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="w-full h-[380px] lg:h-[460px] rounded-lg hero bg-[url(https://i.ibb.co.com/qBpH5Wq/ETH-Zurich.jpg)] bg-cover bg-no-repeat bg-center">
                        <div className="hero-overlay bg-opacity-65 rounded-lg">
                            <div className="px-12 lg:px-16 border-0 md:w-3/4 lg:w-1/2 flex flex-col gap-5 justify-center items-start border-black h-full rounded-lg">
                                <h1 className="font-bold uppercase text-4xl md:text-5xl lg:text-7xl text-white">
                                    ETH Zurich
                                </h1>
                                <p className="text-base lg:text-lg text-gray-50 line-clamp-5 md:line-clamp-none">
                                    ETH Zurich (Swiss Federal Institute of Technology Zurich) is a world-renowned university located in Zurich, Switzerland. Established in 1855, it is consistently ranked among the top universities globally, particularly for science, technology, engineering, and mathematics (STEM).
                                </p>
                                <div className="">
                                    <button className="btn bg-[#0AB99D] text-white border-2 border-[#0AB99D] hover:bg-transparent hover:border-[#0AB99D] font-bold">
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full h-[380px] lg:h-[460px] rounded-lg hero bg-[url(https://i.ibb.co.com/DkDfCfZ/Imperial-College-London.png)] bg-cover bg-no-repeat bg-center">
                        <div className="hero-overlay bg-opacity-65 rounded-lg">
                            <div className="px-12 lg:px-16 border-0 md:w-3/4 lg:w-3/5 flex flex-col gap-5 justify-center items-start border-black h-full rounded-lg">
                                <h1 className="font-bold uppercase text-4xl md:text-5xl lg:text-7xl text-white">
                                    Imperial College London
                                </h1>
                                <p className="text-base lg:text-lg text-gray-50 line-clamp-5 md:line-clamp-none">
                                    Imperial College London, located in the heart of London, is a globally recognized university specializing in science, engineering, medicine, and business. Founded in 1907, it consistently ranks among the world’s top institutions. Imperial is renowned for its cutting-edge research, interdisciplinary approach, and strong industry connections.
                                </p>
                                <div className="">
                                    <button className="btn bg-[#0AB99D] text-white border-2 border-[#0AB99D] hover:bg-transparent hover:border-[#0AB99D] font-bold">
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-full h-[380px] lg:h-[460px] rounded-lg hero bg-[url(https://i.ibb.co.com/2jfkzP3/Stanford-University.jpg)] bg-cover bg-no-repeat bg-center">
                        <div className="hero-overlay bg-opacity-65 rounded-lg">
                            <div className="px-12 lg:px-16 border-0 md:w-3/4 lg:w-3/5 flex flex-col gap-5 justify-center items-start border-black h-full rounded-lg">
                                <h1 className="font-bold uppercase text-4xl md:text-5xl lg:text-7xl text-white">
                                    Stanford University
                                </h1>
                                <p className="text-base lg:text-lg text-gray-50 line-clamp-5 md:line-clamp-none">
                                    Stanford University, located in Stanford, California, is one of the world’s leading institutions for higher education and research. Established in 1885, it is renowned for its academic excellence, entrepreneurial spirit, and innovation. Stanford offers a wide range of programs across disciplines like engineering, business, medicine, and the humanities.
                                </p>
                                <div className="">
                                    <button className="btn bg-[#0AB99D] text-white border-2 border-[#0AB99D] hover:bg-transparent hover:border-[#0AB99D] font-bold">
                                        View More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;

// https://i.ibb.co.com/qBpH5Wq/ETH-Zurich.jpg
// https://i.ibb.co.com/DkDfCfZ/Imperial-College-London.png
// https://i.ibb.co.com/2jfkzP3/Stanford-University.jpg