import React from 'react';
// Import Swiper React components
import { SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const ScholarshipDetailsReviewCard = ({ review }) => {
    return (
        <>
            <SwiperSlide className='h-56'>Slide 1</SwiperSlide>
            {/* <SwiperSlide className='h-56'>Slide 2</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 3</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 4</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 5</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 6</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 7</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 8</SwiperSlide>
            <SwiperSlide className='h-56'>Slide 9</SwiperSlide> */}
        </>
    );
};

export default ScholarshipDetailsReviewCard;