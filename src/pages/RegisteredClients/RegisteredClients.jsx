import {
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    InlineNotification,

} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import ClientInfoTableSkeleton from "../../components/ClientInfoTableSkeleton";
import ClientInfoTable from "../../components/ClientInfoTable";

import { Helmet } from "react-helmet";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Auth";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredClients = () => {
    const [clients, setClients] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const { userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            }
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                const clients = formatClients(data);
                setClients(clients);
            }
            else {
                throw data.detail;
            }
        })
        .catch(error => {
            console.log(error);
            setNotificationInfo({
                kind: "error",
                title: String(error),
            });
            setShowNotification(true);
        });
    }, [])

    const formatClients = clients => {
        const formattedClients = clients.map(client => {
            const birthdatetime = new Date(client.birthdate).toLocaleString("en-US", { timeZone: "GMT" },);

            return {
                name: client.name,
                has_credit: client.has_credit ? "Yes" : "No",
                id: client.email,
                last_update: client.last_update,
                curp: client.curp,
                birthdate: birthdatetime.split(" ")[0],
                rfc: client.rfc,
                income: `$${client.income} DLLS`,
                address: client.address,
                neighborhood: client.neighborhood,
                city: client.city,
                state: client.state,
                active: client.active ? "Active" : "Inactive",
            }
        });

        console.log(formattedClients);

        return formattedClients;
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Our Clients</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles} fullWidth>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/clients">Clients</BreadcrumbItem>
                            <BreadcrumbItem href="/clients/registered" isCurrentPage>
                                Registered
                            </BreadcrumbItem>
                        </Breadcrumb><br /><br />
                        {showNotification ?
                            <InlineNotification
                                kind={notificationInfo.kind}
                                title={notificationInfo.title}
                                style={{ marginBottom: "2rem" }}
                            >
                            </InlineNotification>

                            :

                            <></>
                        }
                        <MainHeading>Our Clients</MainHeading>
                        {
                            userRole === "admin" ?

                                <ClientInfoTable clients={clients} />

                                :

                                <ClientInfoTableSkeleton />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredClients;