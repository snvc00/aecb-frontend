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
                    <Route exact path="/promociones-tarjetas" component={Promotions} />
                    <Route exact path="/seguros-tarjetas" component={Insurances} />

                    {/* Clientes */}
                    <PrivateRoute exact path="/preaprobacion" accessTo="client" component={CreditCardPreapproval} />
                    <PrivateRoute exact path="/preaprobacion/historial" accessTo="client" component={ClientPreapprovalRequests} />

                    {/* Administrativos: Clientes */}
                    <PrivateRoute exact path="/clientes" accessTo="admin" component={AdminClients} />
                    <PrivateRoute exact path="/clientes/registrar" accessTo="admin" component={NewClient} />
                    <PrivateRoute exact path="/clientes/actualizar/:id" accessTo="admin" component={UpdateClientAddress} />
                    <PrivateRoute exact path="/clientes/registrados" accessTo="admin" component={RegisteredClients} />
                    <PrivateRoute exact path="/clientes/solicitudes" accessTo="admin" component={PreapprovalRequestRecords} />
                    {/* Administrativos: Tarjetas */}
                    <PrivateRoute exact path="/tarjetas" accessTo="admin" component={AdminCreditCards} />
                    <PrivateRoute exact path="/tarjetas/registrar" accessTo="admin" component={NewCreditCard} />
                    <PrivateRoute exact path="/tarjetas/actualizar/:id" accessTo="admin" component={UpdateCreditCard} />
                    <PrivateRoute exact path="/tarjetas/registradas" accessTo="admin" component={RegisteredCreditCards} />
                    {/* Administrativos: Promociones */}
                    <PrivateRoute exact path="/promociones" accessTo="admin" component={AdminPromotions} />
                    <PrivateRoute exact path="/promociones/registrar" accessTo="admin" component={NewPromotion} />
                    <PrivateRoute exact path="/promociones/actualizar/:id" accessTo="admin" component={UpdatePromotion} />
                    <PrivateRoute exact path="/promociones/registradas" accessTo="admin" component={RegisteredPromotions} />
                    {/* Administrativos: Seguros */}
                    <PrivateRoute exact path="/seguros" accessTo="admin" component={AdminInsurances} />
                    <PrivateRoute exact path="/seguros/registrar" accessTo="admin" component={NewInsurance} />
                    <PrivateRoute exact path="/seguros/actualizar/:id" accessTo="admin" component={UpdateInsurance} />
                    <PrivateRoute exact path="/seguros/registrados" accessTo="admin" component={RegisteredInsurances} />

                    <Route exact path="/error">
                        <ErrorHandler code=":(" message="No tienes los permisos para esta operación" />
                    </Route>
                    <Route path="*">
                        <ErrorHandler code={404} message="No encontrado" />
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    </React.StrictMode >,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
