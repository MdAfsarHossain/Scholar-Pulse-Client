
const Testimonials = () => {

    const testimonials = [
        {
            id: 1,
            name: "Afsar Hossain",
            role: "Computer Science Student",
            testimonial:
                "Thanks to the STEM Scholarship, I was able to focus on my studies without worrying about tuition fees. It's been a life-changing opportunity!",
            image: "https://i.ibb.co.com/R0ZFtSK/boy.png",
        },
        {
            id: 2,
            name: "John Smith",
            role: "Engineering Student",
            testimonial:
                "The Women in Tech Grant helped me pursue my dream career in technology. I'm forever grateful for this support!",
            image: "https://i.ibb.co.com/m00kL3N/account.png",
        },
        {
            id: 3,
            name: "Afrahim Hossen",
            role: "Medical Student",
            testimonial:
                "Receiving the Future Doctors Scholarship allowed me to continue my medical studies with confidence. This financial aid has been a blessing!",
            image: "https://i.ibb.co.com/Qcn5SWn/man.png",
        },
        {
            id: 4,
            name: "Aminul Islam",
            role: "Business Administration Student",
            testimonial:
                "The Entrepreneurial Leaders Fund gave me the resources to start my first business while completing my studies. I'm beyond thankful!",
            image: "https://i.ibb.co.com/XsDMjGw/465445905-563403159568630-618165361735235674-n.jpg",
        },
        {
            id: 5,
            name: "Anwar Hossen",
            role: "Data Science Student",
            testimonial:
                "Thanks to the AI Innovators Scholarship, I gained access to cutting-edge research and tools that have enhanced my learning experience.",
            image: "https://i.ibb.co.com/k9rWVBp/tarek.jpg",
        },
        {
            id: 6,
            name: "Tarek Hossen",
            role: "Environmental Science Student",
            testimonial:
                "The Green Future Grant helped me work on sustainable projects that make a real impact. I’m honored to be part of this initiative.",
            image: "https://i.ibb.co.com/SfY0pk9/tarek.jpg",
        },
    ];



    return (
        <div className="py-12 mb-14">
            <div className="container mx-auto px-0">
                {/* Heading */}
                <div className="flex flex-col items-center justify-center">
                    <h1 className='uppercase font-bold text-3xl md:text-4xl'>What Our <span className='text-[#0AB99D]'>Students Say</span></h1>
                    <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
                </div>
                {/* End of Heading */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-5 lg:px-0">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700">{testimonial.testimonial}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;