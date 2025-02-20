import BannerSection from "../../components/BannerSection";
import FAQSection from "../../components/FAQ";
import HostelBenefits from "../../components/HostelBenefits";
import MealsByCategory from "../../components/MealsByCategory";
import MembershipSection from "../../components/MembershipSection";
import NewsletterSection from "../../components/Newsletter";
import SalesPromotions from "../../components/SalesPromotion";
import Testimonials from "../../components/Testimonials";

const Home = () => {

    return (
        <div>
            <BannerSection />
            <MealsByCategory />
            <MembershipSection />
            <HostelBenefits />
            <SalesPromotions />
            <Testimonials />
            <NewsletterSection />
            <FAQSection />
        </div>
    );
};

export default Home;
