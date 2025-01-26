import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetailPage from "../pages/MealDetails/MealDetailPage";
import JoinUs from "../pages/JoinUs/JoinUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Checkout from "../pages/Checkout/Checkout";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import AddFood from "../pages/AddFood/AddFood";
import AllUsers from "../pages/Dashboard/AllUsers";
import ManageFoods from "../pages/Dashboard/ManageFoods";
import UpdateFood from "../pages/UpdateFood/UpdateFood";
import ManageUpcomingFoods from "../pages/Dashboard/ManageUpcomingFoods";
import ManageFoodReviews from "../pages/Dashboard/ManageFoodReviews";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import RequestedMeals from "../pages/Dashboard/RequestedMeals";
import EditReviewPage from "../pages/Dashboard/EditReviewPage";

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
        element: <JoinUs></JoinUs>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/upcoming-meals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
      {
        path: "/checkout/:packageName",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "/addfood",
        element: (
          <AdminRoute>
            <AddFood></AddFood>
          </AdminRoute>
        ),
      },
      {
        path: "/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/managefoods",
        element: (
          <AdminRoute>
            <ManageFoods></ManageFoods>
          </AdminRoute>
        ),
      },
      {
        path: "/updatefood/:id",
        element: (
          <AdminRoute>
            <UpdateFood></UpdateFood>
          </AdminRoute>
        ),
      },
      {
        path: "/manage-upcoming-foods",
        element: (
          <AdminRoute>
            <ManageUpcomingFoods></ManageUpcomingFoods>
          </AdminRoute>
        ),
      },
      {
        path: "/manage-food-reviews",
        element: (
          <AdminRoute>
            <ManageFoodReviews></ManageFoodReviews>
          </AdminRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "/serve-meals",
        element: (
          <AdminRoute>
            <RequestedMeals></RequestedMeals>
          </AdminRoute>
        ),
      },
      {
        path: "/edit-review/:reviewId",
        element: <EditReviewPage></EditReviewPage>,
      },
    ],
  },
]);

export default router;
