/** 
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Classes from "layouts/classes";
import Wards from "layouts/wards";
import Subjects from "layouts/subjects";
import CreateClass from "layouts/classes/CreateClass";

// @mui icons
import Icon from "@mui/material/Icon";
import UserManagement from "layouts/user-management";
import CreateUser from "layouts/user-management/CreateUser";
import CreateWard from "layouts/wards/createWard";
import CreateSuject from "layouts/subjects/CreateSubject";
import AdminDashboard from "layouts/dashboard/AdminDashboard";
import StudentDashboard from "layouts/dashboard/StudentDashboard";
import StudentClass from "layouts/classes/studentIndex";
import StudentWard from "layouts/wards/studetIndex";
import StudentSubject from "layouts/subjects/StudentIndex";
import TeacherDashboard from "layouts/dashboard/TeacherDashboard";

const authUser = JSON.parse(localStorage.getItem('authUser'));
const userRole = authUser?.role || "";

const allRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <AdminDashboard />,
  },
  {
    type: "collapse",
    name: "Classes",
    key: "classes",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/classes",
    component: <Classes />,
  },
  {
    type: "",
    name: "Create Class",
    key: "create-class",
    route: "/classes/create-class",
    component: <CreateClass />,
  },
  {
    type: "collapse",
    name: "Wards",
    key: "wards",
    icon: <Icon fontSize="small">hotel</Icon>,
    route: "/wards",
    component: <Wards />,
  },
  {
    type: "",
    name: "Create Ward",
    key: "create-ward",
    route: "/wards/create-ward",
    component: <CreateWard />,
  },
  {
    type: "collapse",
    name: "Subjects",
    key: "subjects",
    icon: <Icon fontSize="small">science</Icon>,
    route: "/subjects",
    component: <Subjects />,
  },
  {
    type: "",
    name: "Create Subjects",
    key: "create-subjects",
    icon: <Icon fontSize="small">science</Icon>,
    route: "/subjects/create-subject",
    component: <CreateSuject />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/user-management",
    component: <UserManagement />,
  },
  {
    type: "",
    name: "Create User",
    key: "create-user",
    route: "/user-management/create-user",
    component: <CreateUser />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "My Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

const teachersRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <TeacherDashboard />,
  },
  {
    type: "collapse",
    name: "Classes",
    key: "classes",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/classes",
    component: <Classes />,
  },
  {
    type: "collapse",
    name: "Subjects",
    key: "subjects",
    icon: <Icon fontSize="small">science</Icon>,
    route: "/subjects",
    component: <Subjects />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "My Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

const studentsRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <StudentDashboard />,
  },
  {
    type: "collapse",
    name: "Class",
    key: "class",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/class",
    component: <StudentClass />,
  },
  {
    type: "collapse",
    name: "Ward",
    key: "ward",
    icon: <Icon fontSize="small">hotel</Icon>,
    route: "/ward",
    component: <StudentWard />,
  },
  {
    type: "collapse",
    name: "Subjects",
    key: "subjects",
    icon: <Icon fontSize="small">science</Icon>,
    route: "/subjects",
    component: <StudentSubject />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "My Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

const hostelMastersRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <AdminDashboard />,
  },
  {
    type: "collapse",
    name: "Wards",
    key: "wards",
    icon: <Icon fontSize="small">hotel</Icon>,
    route: "/wards",
    component: <Wards />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "My Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

let routes = [];
switch (userRole) {
  case 'TEACHER':
    routes = teachersRoutes;
    break;
  case 'HOSTEL_MASTER':
    routes = hostelMastersRoutes;
    break;
  case 'STUDENT':
    routes = studentsRoutes;
    break;
  case 'ADMINISTRATOR':
    routes = allRoutes;
    break;

}
export default routes;
