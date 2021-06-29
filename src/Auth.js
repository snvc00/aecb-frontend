import React, { useEffect, useState } from "react";
import app from "./firebase.js";
import { Loading } from "carbon-components-react";
import { useHistory } from "react-router";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            
            if (user) {
                fetch(`${process.env.REACT_APP_BACKEND_API}/api/auth`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": sessionStorage.getItem("token")
                    }
                })
                .then(async response => ({ data: await response.json(), responseOk: response.ok }))
                .then(({ data, responseOk }) => {
                    if (responseOk) {
                        const role = user.email.split("@")[1] === process.env.REACT_APP_ADMIN_DOMAIN ? "admin" : "client";
                        setUserRole(role);
                    }
                    else {
                        throw data.detail;
                    }
                })
                .catch(error => {
                    setErrorMessage(String(error));
                    app.auth().signOut();
                });
            }
            else {
                sessionStorage.removeItem("token");
            }

            setPending(false);
        });
    }, []);

if (pending) {
    return <Loading />
}

return (
    <AuthContext.Provider
        value={{
            currentUser,
            userRole,
            errorMessage
        }}
    >
        {children}
    </AuthContext.Provider>
);
};