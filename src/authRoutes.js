import React from "react";
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const authRoutes = [
  { path: "/login", name: "Login Page", component: Login },

  { path: "/404", name: "Not Found", component: Page404 },
];

export default authRoutes;
