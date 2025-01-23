import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import MealDetailPage from "../pages/MealDetails/MealDetailPage";
import Login from "../pages/Login/Login";
import JoinUs from "../pages/Login/Login";

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
      }
    ],
  },
]);

export default router;
