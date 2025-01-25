// import { useEffect } from "react";
// import axios from "axios";
import BannerSection from "../../components/BannerSection";
import HostelBenefits from "../../components/HostelBenefits";
import MealsByCategory from "../../components/MealsByCategory";
import MembershipSection from "../../components/MembershipSection";
import Testimonials from "../../components/Testimonials";

const Home = () => {
    // useEffect(() => {
    //     const updateFoodStatus = async () => {
    //         try {
    //             const response = await axios.post('http://localhost:3000/update-food-status');
    //             console.log("Update successful:", response.data.message);
    //         } catch (error) {
    //             console.error("Error updating food status:", error);
    //         }
    //     };

    //     updateFoodStatus();
    // }, []); // Empty dependency array ensures this runs only once

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
