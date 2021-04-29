import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./pages/Welcome";
import NewClient from "./pages/NewClient";
import UpdateClientAddress from "./pages/UpdateClientAddress";
import RegisteredClientsTable from "./pages/RegisteredClientsTable";
import NewCreditCard from "./pages/NewCreditCard";
import UpdateCreditCard from "./pages/UpdateCreditCard";
import RegisteredCreditCardsTable from "./pages/RegisteredCreditCardsTable";
import CreditCardPreapproval from "./pages/CreditCardPreapproval";
import PreapprovalRequestRecords from "./pages/PreapprovalRequestRecords";
import AdminClients from "./pages/AdminClients";
import AdminCreditCards from "./pages/AdminCreditCards";
import Benefits from "./pages/Benefits";
import ErrorHandler from "./pages/ErrorHandler/ErrorHandler";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import "carbon-components/scss/globals/scss/styles.scss";
import ClientPreapprovalRequests from "./pages/ClientPreapprovalRequests";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Welcome />
                </Route>
                {/* Clientes */}
                <Route exact path="/preaprobacion">
                    <CreditCardPreapproval />
                </Route>
                <Route exact path="/preaprobacion/historial">
                    <ClientPreapprovalRequests />
                </Route>
                <Route exact path="/preaprobacion/historial/:clientId">
                    <PreapprovalRequestRecords />
                </Route>
                {/* Administrativos: Clientes */}
                <Route exact path="/clientes">
                    <AdminClients />
                </Route>
                <Route exact path="/clientes/registrar">
                    <NewClient />
                </Route>
                <Route exact path="/clientes/actualizar">
                    <UpdateClientAddress />
                </Route>
                <Route exact path="/clientes/registrados">
                    <RegisteredClientsTable />
                </Route>
                {/* Administrativos: Tarjetas */}
                <Route exact path="/tarjetas">
                    <AdminCreditCards />
                </Route>
                <Route exact path="/tarjetas/registrar">
                    <NewCreditCard />
                </Route>
                <Route exact path="/tarjetas/actualizar">
                    <UpdateCreditCard />
                </Route>
                <Route exact path="/tarjetas/registradas">
                    <RegisteredCreditCardsTable />
                </Route>
                {/* Administrativos: Reportes */}
                <Route exact path="/reportes">
                    <PreapprovalRequestRecords />
                </Route>
                <Route exact path="/beneficios">
                    <Benefits />
                </Route>
                <Route path="*">
                    <ErrorHandler code={404} message="No encontrado" />
                </Route>
            </Switch>
        </Router>
  </React.StrictMode >,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
