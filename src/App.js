import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./scss/style.scss";
import authRoutes from "./authRoutes";
import { useDispatch } from "react-redux";
import localStorageConstants from "src/constants/localstorageConstants";
import { SET_LOADER, SET_LOGIN_STATUS } from "src/redux/actions";
import { useSelector } from "react-redux";
import { CFade } from "@coreui/react";
import Loader from "./components/loader";
const Loading = () => {
  return (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
};

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem(localStorageConstants.userId);
  const loginStatus = useSelector((state) => state?.commonReducer?.loginStatus);
  const loading = useSelector((state) => state.commonReducer.loader);
  const history = useHistory();
  console.log(loginStatus, loading, "gyta");
  if (userId) {
    dispatch({ type: SET_LOGIN_STATUS, payload: true });
    history.push("/dashboard");
  } else {
    history.push("/login");
  }

  return (
    <>
      <Loader loading={loading} />
      <Switch>
        {authRoutes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <CFade>
                    <route.component {...props} />
                  </CFade>
                )}
              />
            )
          );
        })}
        {loginStatus ? (
          <Route
            //exact={true}
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        ) : null}
      </Switch>
    </>
  );
}

export default App;
export { Loading };
