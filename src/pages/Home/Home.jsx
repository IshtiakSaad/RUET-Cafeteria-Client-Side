import BannerSection from "../../components/BannerSection";
import HostelBenefits from "../../components/HostelBenefits";
import MealsByCategory from "../../components/MealsByCategory";
import MembershipSection from "../../components/MembershipSection";
import Testimonials from "../../components/Testimonials";

const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <MealsByCategory></MealsByCategory>
            <MembershipSection></MembershipSection>
            <HostelBenefits></HostelBenefits>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;