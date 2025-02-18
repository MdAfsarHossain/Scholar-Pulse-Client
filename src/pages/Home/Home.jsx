import ApplySteps from "../../components/ApplySteps/ApplySteps";
import BecomeDoctor from "../../components/BecomeDoctor/BecomeDoctor";
import BenefitsOfScholarPulse from "../../components/BenefitsOfScholarPulse/BenefitsOfScholarPulse";
import NewLetter from "../../components/NewsLetter/NewLetter";
import ScholarshipStats from "../../components/ScholarshipStats/ScholarshipStats";
import Banner from "../../components/Shared/Banner/Banner";
import Test from "../../components/Test/Test";
import Testimonials from "../../components/Testimonials/Testimonials";
import TopScholarships from "../../components/TopScholarships/TopScholarships";


const Home = () => {
    return (
        <div className="mt-24">
            <Banner />

            <TopScholarships />

            <BecomeDoctor />

            <ApplySteps />

            <BenefitsOfScholarPulse />

            <ScholarshipStats />

            <Testimonials />

            <NewLetter />
        </div>
    );
};

export default Home;