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
import PromotionsInfoTableSkeleton from "../../components/PromotionsInfoTableSkeleton";
import PromotionsInfoTable from "../../components/PromotionsInfoTable";

import { Helmet } from "react-helmet";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Auth";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredPromotions = () => {
    const [promotions, setPromotions] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const { userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/promotions/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": sessionStorage.getItem("token")
            }
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                const promotions = formatPromotions(data);
                setPromotions(promotions);
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

    const formatPromotions = promotions => {
        const formattedPromotions = promotions.map(promotion => {
            const valid_until = new Date(promotion.valid_until).toLocaleString("en-US", { timeZone: "GMT" }, );

            return {
                id: Number(promotion.id).toString(),
                name: promotion.name,
                description: promotion.description,
                valid_until: valid_until.split(" ")[0],
                last_update: promotion.last_update,
            }
        });

        return formattedPromotions;
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Our Promotions</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/promotions">Promotions</BreadcrumbItem>
                            <BreadcrumbItem href="/promotions/registered" isCurrentPage>
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
                        <MainHeading>Our Promotions</MainHeading>
                        {
                            userRole === "admin" ?

                                <PromotionsInfoTable promotions={promotions} />

                                :

                                <PromotionsInfoTableSkeleton />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredPromotions;