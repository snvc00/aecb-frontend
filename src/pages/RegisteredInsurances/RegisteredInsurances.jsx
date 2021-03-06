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
import InsurancesInfoTable from "../../components/InsurancesInfoTable";
import InsurancesInfoTableSkeleton from "../../components/InsurancesInfoTableSkeleton";


import { Helmet } from "react-helmet";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Auth";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredInsurances = () => {
    const [insurances, setInsurances] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const { userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/insurances/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            }
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                console.log("WAS SUCCESS")
                const insurances = formatInsurances(data);
                setInsurances(insurances);
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
    }, []);

    const formatInsurances = insurances => {
        const formattedInsurances = insurances.map(insurance => {

            return {
                id: Number(insurance.id).toString(),
                name: insurance.name,
                description: insurance.description,
                max_protection: `$${insurance.max_protection} DLLS`,
                last_update: insurance.last_update,
            }
        });

        return formattedInsurances;
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Our Insurances</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/insurances">Insurances</BreadcrumbItem>
                            <BreadcrumbItem href="/insurances/registered" isCurrentPage>
                                Registered
                            </BreadcrumbItem>
                        </Breadcrumb><br /><br />
                        {showNotification ?
                            <InlineNotification
                                kind={notificationInfo.kind || "error"}
                                title={notificationInfo.title || ""}
                                style={{ marginBottom: "2rem" }}
                            >
                            </InlineNotification>

                            :

                            <></>
                        }
                        <MainHeading>Our Insurances</MainHeading>
                        {
                            userRole === "admin" ?

                                <InsurancesInfoTable insurances={insurances} />

                                :

                                <InsurancesInfoTableSkeleton />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredInsurances;