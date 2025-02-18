import { Helmet } from "react-helmet-async";

const ScholarshipBlogs = () => {

    const scholarships = [
        {
          id: 1,
          title: "Scholarship for STEM Students",
          description: "This scholarship is available for students pursuing degrees in Science, Technology, Engineering, and Mathematics.",
          deadline: "2025-12-31",
          link: "#"
        },
        {
          id: 2,
          title: "Merit-Based Scholarship",
          description: "This scholarship is awarded to students with outstanding academic achievements.",
          deadline: "2025-11-15",
          link: "#"
        },
        {
          id: 3,
          title: "Need-Based Scholarship",
          description: "This scholarship is designed to support students who demonstrate financial need.",
          deadline: "2025-10-30",
          link: "#"
        },
        {
          id: 4,
          title: "Women in Tech Scholarship",
          description: "This scholarship supports women pursuing careers in technology and computer science.",
          deadline: "2025-01-15",
          link: "#"
        },
        {
          id: 5,
          title: "International Student Scholarship",
          description: "This scholarship is available for international students studying in the United States.",
          deadline: "2025-12-01",
          link: "#"
        },
        {
          id: 6,
          title: "Creative Arts Scholarship",
          description: "This scholarship is for students pursuing degrees in fine arts, music, or creative writing.",
          deadline: "2024-02-28",
          link: "#"
        },
        {
          id: 7,
          title: "Community Service Scholarship",
          description: "This scholarship rewards students who have demonstrated exceptional community service.",
          deadline: "2023-11-30",
          link: "#"
        },
        {
          id: 8,
          title: "First-Generation College Student Scholarship",
          description: "This scholarship is for students who are the first in their family to attend college.",
          deadline: "2024-03-01",
          link: "#"
        },
        {
          id: 9,
          title: "Entrepreneurship Scholarship",
          description: "This scholarship supports students with innovative business ideas and entrepreneurial spirit.",
          deadline: "2024-01-31",
          link: "#"
        },
        {
          id: 10,
          title: "Environmental Science Scholarship",
          description: "This scholarship is for students studying environmental science or sustainability.",
          deadline: "2024-04-15",
          link: "#"
        },
        {
          id: 11,
          title: "Athletic Scholarship",
          description: "This scholarship is awarded to student-athletes who excel in their sport.",
          deadline: "2023-12-15",
          link: "#"
        },
        {
          id: 12,
          title: "Graduate Research Scholarship",
          description: "This scholarship supports graduate students conducting research in their field of study.",
          deadline: "2024-05-01",
          link: "#"
        },
        {
          id: 13,
          title: "Minority Student Scholarship",
          description: "This scholarship is for students from underrepresented minority groups.",
          deadline: "2024-02-15",
          link: "#"
        },
        {
          id: 14,
          title: "Study Abroad Scholarship",
          description: "This scholarship helps students fund their study abroad programs.",
          deadline: "2024-03-31",
          link: "#"
        },
        {
          id: 15,
          title: "Veterans Scholarship",
          description: "This scholarship is for military veterans pursuing higher education.",
          deadline: "2024-06-01",
          link: "#"
        }
      ];


    return (

        <div className="min-h-screen mt-24">

            <Helmet>
                <title>Scholar Pulse | Scholarships Blogs</title>
            </Helmet>

            {/* Heading */}
            <div className="flex flex-col items-center justify-center">
                <h1 className='uppercase font-bold text-3xl md:text-4xl'>Scholarships <span className='text-[#0AB99D]'>Blogs</span></h1>
                <div className="mt-1 h-[2px] bg-[#0AB99D] w-36"></div>
            </div>
            {/* End of Heading */}

            <div className="container mx-auto px-4 mt-8">
                {/* <h1 className="text-4xl font-bold text-center mb-10">Scholarships Blogs</h1> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((scholarship) => (
                        <div key={scholarship.id} className="card bg-base-100 shadow-xl hover:scale-105 transition-all">
                            <div className="card-body">
                                <h2 className="card-title">{scholarship.title}</h2>
                                <p>{scholarship.description}</p>
                                <p className="text-sm text-gray-500">Deadline: {scholarship.deadline}</p>
                                {/* <div className="card-actions justify-end">
                                    <a href={scholarship.link} className="btn btn-primary">Apply Now</a>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScholarshipBlogs;