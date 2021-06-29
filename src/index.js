import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./pages/Welcome";
import NewClient from "./pages/NewClient";
import UpdateClientAddress from "./pages/UpdateClientAddress";
import RegisteredClients from "./pages/RegisteredClients";
import NewCreditCard from "./pages/NewCreditCard";
import UpdateCreditCard from "./pages/UpdateCreditCard";
import RegisteredCreditCards from "./pages/RegisteredCreditCards";
import CreditCardPreapproval from "./pages/CreditCardPreapproval";
import PreapprovalRequestRecords from "./pages/PreapprovalRequestRecords";
import AdminClients from "./pages/AdminClients";
import AdminCreditCards from "./pages/AdminCreditCards";
import ErrorHandler from "./pages/ErrorHandler/ErrorHandler";
import AdminPromotions from "./pages/AdminPromotions";
import NewPromotion from "./pages/NewPromotion";
import RegisteredPromotions from "./pages/RegisteredPromotions";
import UpdatePromotion from "./pages/UpdatePromotion";
import AdminInsurances from "./pages/AdminInsurances";
import NewInsurance from "./pages/NewInsurance";
import UpdateInsurance from "./pages/UpdateInsurance";
import RegisteredInsurances from "./pages/RegisteredInsurances";
import Promotions from "./pages/Promotions";
import Insurances from "./pages/Insurances";
import PrivateRoute from "./PrivateRoute";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import "./index.css";
import "./index.scss";

import reportWebVitals from "./reportWebVitals";
//import "carbon-components/scss/globals/scss/styles.scss";
import ClientPreapprovalRequests from "./pages/ClientPreapprovalRequests";

import { AuthProvider } from "./Auth";
import Login from "./pages/Login";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/card-promotions" component={Promotions} />
                    <Route exact path="/card-insurances" component={Insurances} />

                    {/* Clients */}
                    <PrivateRoute exact path="/preapproval" accessTo="client" component={CreditCardPreapproval} />
                    <PrivateRoute exact path="/preapproval/history" accessTo="client" component={ClientPreapprovalRequests} />

                    {/* Admins: Clients */}
                    <PrivateRoute exact path="/clients" accessTo="admin" component={AdminClients} />
                    <PrivateRoute exact path="/clients/register" accessTo="admin" component={NewClient} />
                    <PrivateRoute exact path="/clients/update/:id" accessTo="admin" component={UpdateClientAddress} />
                    <PrivateRoute exact path="/clients/registered" accessTo="admin" component={RegisteredClients} />
                    <PrivateRoute exact path="/clients/preapprovals" accessTo="admin" component={PreapprovalRequestRecords} />
                    {/* Admins: Tarjetas */}
                    <PrivateRoute exact path="/cards" accessTo="admin" component={AdminCreditCards} />
                    <PrivateRoute exact path="/cards/register" accessTo="admin" component={NewCreditCard} />
                    <PrivateRoute exact path="/cards/update/:id" accessTo="admin" component={UpdateCreditCard} />
                    <PrivateRoute exact path="/cards/registered" accessTo="admin" component={RegisteredCreditCards} />
                    {/* Admins: Promotions */}
                    <PrivateRoute exact path="/promotions" accessTo="admin" component={AdminPromotions} />
                    <PrivateRoute exact path="/promotions/register" accessTo="admin" component={NewPromotion} />
                    <PrivateRoute exact path="/promotions/update/:id" accessTo="admin" component={UpdatePromotion} />
                    <PrivateRoute exact path="/promotions/registered" accessTo="admin" component={RegisteredPromotions} />
                    {/* Admins: Insurances */}
                    <PrivateRoute exact path="/insurances" accessTo="admin" component={AdminInsurances} />
                    <PrivateRoute exact path="/insurances/register" accessTo="admin" component={NewInsurance} />
                    <PrivateRoute exact path="/insurances/update/:id" accessTo="admin" component={UpdateInsurance} />
                    <PrivateRoute exact path="/insurances/registered" accessTo="admin" component={RegisteredInsurances} />

                    <Route exact path="/error">
                        <ErrorHandler code=":(" message="Your account has not the required role to access this page." />
                    </Route>
                    <Route path="*">
                        <ErrorHandler code={404} message="Not Found" />
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    </React.StrictMode >,
    document.getElementById("root")
);

reportWebVitals(console.log);
