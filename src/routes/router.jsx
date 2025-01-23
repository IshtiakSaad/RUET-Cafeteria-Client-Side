import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetailPage from "../pages/MealDetails/MealDetailPage";
import JoinUs from "../pages/JoinUs/JoinUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Checkout from "../pages/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h1>Error 404: Page Not Found</h1>, 
    children: [
      {
        path: "/",
        element: <Home></Home>, 
      },
      {
        path: "/meals",
        element: <Meals></Meals>, 
      },
      {
        path: "/meals/:id", 
        element: <MealDetailPage></MealDetailPage>, 
      },
      {
        path: "/login",
        element: <JoinUs></JoinUs>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/upcoming-meals",
        element: <UpcomingMeals></UpcomingMeals>
      },
      {
        path: '/cart',
        element: <Checkout></Checkout>
      }
    ],
  },
]);

export default router;
