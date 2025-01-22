import ApplySteps from "../../components/ApplySteps/ApplySteps";
import BecomeDoctor from "../../components/BecomeDoctor/BecomeDoctor";
import BenefitsOfScholarPulse from "../../components/BenefitsOfScholarPulse/BenefitsOfScholarPulse";
import Banner from "../../components/Shared/Banner/Banner";
import TopScholarships from "../../components/TopScholarships/TopScholarships";


const Home = () => {
    return (
        <div className="mt-24">
            <Banner />

            <TopScholarships />

            <BecomeDoctor />

            <ApplySteps />

            <BenefitsOfScholarPulse />
        </div>
    );
};

export default Home;