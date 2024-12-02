import { Routes, Route } from "react-router-dom";
import {
    faBooks,
    faCar,
    faCog,
    faFilePdf,
    faHome,
    faUsers,
} from "@fortawesome/pro-regular-svg-icons";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ClientRoute from "./ClientRoute";
import UserRoute from "./UserRoute";

import Page404 from "../views/errors/Page404";
import PageRequestPermission from "../views/errors/PageRequestPermission";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageEditProfile from "../views/private/PageEditProfile/PageEditProfile";
import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageUser from "../views/private/PageUser/PageUser";
import PageUserForm from "../views/private/PageUser/PageUserForm";
import PageUserPermission from "../views/private/PageUser/PageUserPermission";
import PagePermission from "../views/private/PagePermission/PagePermission";
import PageEmailTemplate from "../views/private/PageSystemSettings/PageEmailTemplate/PageEmailTemplate";
import PageSettings from "../views/private/PageReferences/PageSettings/PageSettings";
import PagePdfFiles from "../views/private/PagePdfFiles/PagePdfFiles";
import PageComponents from "../views/private/PageComponents/PageComponents";
import PageHome from "../views/clients/PageHome/PageHome";
import PageCars from "../views/clients/PageCars/PageCars";
import PageAboutUs from "../views/clients/PageAboutUs/PageAboutUs";
import PageContactUs from "../views/clients/PageContactUs/PageContactUs";
import PageRegister from "../views/public/PageRegister/PageRegister";
import PageSignUp from "../views/clients/SignUp/PageSignUp";
import PageUsersComponents from "../views/clients/PageUsers/PageUsersComponents";
import CarsList from "../views/private/PageCars/CarsList";
import AddCar from "../views/private/PageCars/Components/AddCar";
import PageHomeClient from "../layouts/client/PageHomeClient";

export default function RouteList() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ClientRoute
                        title="Home"
                        pageId="PageHome"
                        component={PageHome}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                    />
                }
            />

            <Route
                path="/our-cars"
                element={
                    <ClientRoute
                        title="Our Cars"
                        pageId="PageOurCars"
                        component={PageCars}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                    />
                }
            />

            <Route
                path="/about-us"
                element={
                    <ClientRoute
                        title="About Us"
                        pageId="PageAboutUs"
                        component={PageAboutUs}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                    />
                }
            />

            <Route
                path="/contact-us"
                element={
                    <ClientRoute
                        title="Contact Us"
                        pageId="PageContactUs"
                        component={PageContactUs}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                    />
                }
            />

            <Route
                path="/sign-in"
                element={
                    <PublicRoute
                        title="Sign In"
                        pageId="PageLogin"
                        component={PageLogin}
                    />
                }
            />

            <Route
                path="/sign-up"
                element={
                    <PublicRoute
                        title="Sign Up"
                        pageId="PageSignUp"
                        component={PageSignUp}
                    />
                }
            />

            <Route
                path="/userHome"
                element={
                    <UserRoute
                        moduleName="User Page"
                        title="UserHome"
                        subtitle="User"
                        pageId="PageUserHome"
                        pageHeaderIcon={faHome}
                        breadcrumb={[
                            {
                                name: "Home",
                            },
                        ]}
                        component={PageHome}
                    />
                }
            />

            <Route
                path="/edit-profile"
                element={
                    <PrivateRoute
                        moduleName="Edit Profile"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserProfile"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Edit Profile",
                            },
                        ]}
                        component={PageEditProfile}
                    />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute
                        // moduleCode="M-01"
                        moduleName="Dashboard"
                        title="Dashboard"
                        subtitle="ADMIN"
                        pageId="PageDashboard"
                        pageHeaderIcon={faHome}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                            },
                        ]}
                        component={PageDashboard}
                    />
                }
            />

            <Route
                path="/pdf-files"
                element={
                    <PrivateRoute
                        // moduleCode="M-01"
                        moduleName="PDF Files"
                        title="Files"
                        subtitle="PDF"
                        pageId="PagePdfFiles"
                        pageHeaderIcon={faFilePdf}
                        breadcrumb={[
                            {
                                name: "PDF Files",
                            },
                        ]}
                        component={PagePdfFiles}
                    />
                }
            />

            {/* users */}
            <Route
                path="/users"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current"
                        title="Users"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Users",
                            },
                            {
                                name: "Current",
                            },
                        ]}
                        component={PageUser}
                    />
                }
            />

            <Route
                path="/users/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Add"
                        title="Users"
                        subtitle="ADD"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Users",
                                link: "/users",
                            },
                            {
                                name: "Add User",
                            },
                        ]}
                        component={PageUserForm}
                    />
                }
            />

            <Route
                path="/users/edit/:id"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Edit"
                        title="Users Current"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Users",
                                link: "/users",
                            },
                            {
                                name: "Edit User",
                            },
                        ]}
                        component={PageUserForm}
                    />
                }
            />

            <Route
                path="/users/permission/:id"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="User Current Edit Permission"
                        title="User's Edit Permission"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Users",
                                link: "/users",
                            },
                            {
                                name: "Edit Permission",
                            },
                        ]}
                        component={PageUserPermission}
                    />
                }
            />

            {/* end users */}

            {/* permission */}

            <Route
                path="/permission"
                element={
                    <PrivateRoute
                        // moduleCode="M-04"
                        moduleName="Permission"
                        title="Permission"
                        subtitle="Permission"
                        pageId="PagePermission"
                        pageHeaderIcon={faBooks}
                        breadcrumb={[
                            {
                                name: "Permission",
                            },
                        ]}
                        component={PagePermission}
                    />
                }
            />

            {/* end permission */}

            {/* system settings */}
            <Route
                path="/system-settings/email-templates"
                element={
                    <PrivateRoute
                        // moduleCode="M-04"
                        moduleName="System Settings - Email Template"
                        title="Templates"
                        subtitle="EMAIL"
                        pageId="PageSystemSettingsEmailTemplate"
                        pageHeaderIcon={faCog}
                        breadcrumb={[
                            {
                                name: "System Settings",
                            },
                            {
                                name: "Email Templates",
                            },
                        ]}
                        component={PageEmailTemplate}
                    />
                }
            />

            <Route
                path="/system-settings/admin-settings"
                element={
                    <PrivateRoute
                        // moduleCode="M-04"
                        moduleName="System Settings - Admin Settings"
                        title="Settings"
                        subtitle="ADMIN"
                        pageId="PageSystemSettingsEmailTemplate"
                        pageHeaderIcon={faCog}
                        breadcrumb={[
                            {
                                name: "System Settings",
                            },
                            {
                                name: "Admin Settings",
                            },
                        ]}
                        component={PageSettings}
                    />
                }
            />

            {/* end system settings */}

            <Route
                path="/components"
                element={
                    <PrivateRoute
                        // moduleCode="M-04"
                        moduleName="Components"
                        title="Components"
                        subtitle="LIST"
                        pageId="PageComponents"
                        pageHeaderIcon={faCog}
                        breadcrumb={[
                            {
                                name: "Components",
                            },
                        ]}
                        component={PageComponents}
                    />
                }
            />

            <Route
                path="/cars"
                element={
                    <PrivateRoute
                        // moduleCode="M-04"
                        moduleName="CARS"
                        title="Car List"
                        subtitle="CAR LIST"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faCog}
                        breadcrumb={[
                            {
                                name: "Cars",
                            },
                        ]}
                        component={CarsList}
                    />
                }
            />

            <Route
                path="/cars/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Car Current Add"
                        title="Cars"
                        subtitle="ADD"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faCar}
                        breadcrumb={[
                            {
                                name: "Cars",
                                link: "/cars",
                            },
                            {
                                name: "Add Car",
                            },
                        ]}
                        component={AddCar}
                    />
                }
            />

            <Route
                path="/cars/edit/:id"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Car Current Edit"
                        title="Cars"
                        subtitle="EDIT"
                        pageId="PageUserEdit"
                        pageHeaderIcon={faCar}
                        breadcrumb={[
                            {
                                name: "Cars",
                                link: "/cars",
                            },
                            {
                                name: "Edit Car Info",
                            },
                        ]}
                        component={AddCar}
                    />
                }
            />

            <Route
                path="/request-permission"
                element={<PageRequestPermission />}
            />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
