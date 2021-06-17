
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, accessTo, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  const userType = !!currentUser ? (currentUser.email.split("@")[1] === "alumnos.udg.mx" ? "admin" : "client") : "";

  return (
    <Route
      {...rest}
      render={routeProps =>
        userType !== "" ? (
          userType === accessTo ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to="/error" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;