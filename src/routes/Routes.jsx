import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import CheckOut from "../pages/CheckOut/CheckOut";
import AdminStatistics from "../pages/Dashboard/Admin/AdminStatistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import AddScholarship from "../pages/Dashboard/Moderator/AddScholarship";
import ManageAppliedScholarships from "../pages/Dashboard/Moderator/ManageAppliedScholarships";
import ManageReviews from "../pages/Dashboard/Moderator/ManageReviews";
import ManageScholarships from "../pages/Dashboard/Moderator/ManageScholarships";
import MyApplications from "../pages/Dashboard/User/MyApplications";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import { default as Error, default as ErrorPage } from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import AdminModeratorRoute from "./AdminModeratorRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'all-scholarships',
                element: <AllScholarships />,
            },
            {
                path: 'scholarshipDetails/:id',
                // element: <PrivateRoute><ScholarshipDetails /></PrivateRoute>
                element: <ScholarshipDetails />
            },
            {
                path: 'checkout/:id',
                element: <PrivateRoute><CheckOut /></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: 'add-scholarship',
                element: <PrivateRoute><AdminModeratorRoute><AddScholarship /></AdminModeratorRoute></PrivateRoute>
            },
            {
                path: 'statistics',
                element: <PrivateRoute><AdminRoute><AdminStatistics /></AdminRoute></PrivateRoute>
            },
            {
                path: 'manage-users',
                element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
            },
            {
                path: 'manage-scholarships',
                element: <PrivateRoute><AdminModeratorRoute><ManageScholarships /></AdminModeratorRoute></PrivateRoute>
            },
            {
                path: 'manage-applied-scholarships',
                element: <PrivateRoute><AdminModeratorRoute>
                    <ManageAppliedScholarships /></AdminModeratorRoute></PrivateRoute>
            },
            {
                path: 'manage-reviews',
                element: <PrivateRoute><AdminModeratorRoute>
                    <ManageReviews />
                </AdminModeratorRoute></PrivateRoute>
            },
            {
                path: 'my-applications',
                element: <PrivateRoute><UserRoute><MyApplications /></UserRoute> </PrivateRoute>
            },
            {
                path: 'my-reviews',
                element: <PrivateRoute><UserRoute><MyReviews /></UserRoute></PrivateRoute>
            }
        ]
    }
]);

export default router;

// User
// My Profile. (Done)
// My Application. (Dine)
// My reviews. (Done)


// Moderator
// My Profile. (Done)
// Add Scholarship (Done)
// Manage Scholarships. (Done)
// All applied Scholarship. (Done)
// All reviews. (Done)


// Admin
// Admin Profile. (Done)
// Add Scholarship (Done)
// Manage Scholarship. (Done)
// Manage Applied Application. (Done)
// Manage Review. (Done)
// Manage Users. (Done)
// Statistics. (Done)
