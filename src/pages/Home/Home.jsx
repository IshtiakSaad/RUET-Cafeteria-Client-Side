import BannerSection from "../../components/BannerSection";
import HostelBenefits from "../../components/HostelBenefits";
import MealsByCategory from "../../components/MealsByCategory";
import MembershipSection from "../../components/MembershipSection";
import Testimonials from "../../components/Testimonials";

const Home = () => {

    return (
        <div>
            <BannerSection />
            <MealsByCategory />
            <MembershipSection />
            <HostelBenefits />
            <Testimonials />
        </div>
    );
};

export default Home;
