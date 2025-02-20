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
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import RulesAndGuidelines from "../pages/Rules/Rules";
import Profile from "../pages/Dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/profile",
        element: (
            <PrivateRoute>
                <Profile></Profile>
            </PrivateRoute>
        )
      },
      {
        path: "/rules",
        element: <RulesAndGuidelines></RulesAndGuidelines>,
      },
      {
        path: "/addfood",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddFood></AddFood>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/allusers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/managefoods",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageFoods></ManageFoods>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/updatefood/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateFood></UpdateFood>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-upcoming-foods",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUpcomingFoods></ManageUpcomingFoods>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-food-reviews",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageFoodReviews></ManageFoodReviews>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard></AdminDashboard>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/serve-meals",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <RequestedMeals></RequestedMeals>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-review/:mealId/:reviewId",
        element: (
          <PrivateRoute>
              <EditReviewPage></EditReviewPage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
