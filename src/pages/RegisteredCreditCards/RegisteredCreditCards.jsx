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
import CreditCardsInfoTableSkeleton from "../../components/CreditCardsInfoTableSkeleton";
import CreditCardsInfoTable from "../../components/CreditCardsInfoTable";

import { Helmet } from "react-helmet";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Auth";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredCreditCards = () => {
    const [cards, setCards] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const { currentUser, userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/cards/`, {
            method: "GET",
            headers: {
                "Token": sessionStorage.getItem("token")
            }
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                const cards = formatCards(data);
                setCards(cards);
            }
            else {
                throw data.detail;
            }
        })
        .catch(error => {
            console.log(error);
            setNotificationInfo({
                kind: "error",
                title: error,
            });
            setShowNotification(true);
        });
    }, []);

    const formatCards = cards => {
        const tiers = [ "None", "Bronce", "Plata", "Oro", "Diamante"];
        const formattedCards = cards.map(card => {

            return {
                id: Number(card.id).toString(),
                name: card.name,
                min_credit: `$${card.min_credit} MXN`,
                max_credit: `$${card.max_credit} MXN`,
                cat: `${card.cat}%`,
                annual_fee: `$${card.annual_fee} MXN`,
                tier: tiers[card.tier],
                image: card.image,
                last_update: card.last_update
            }
        });

        return formattedCards;
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuestras Tarjetas de Crédito</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/tarjetas">Tarjetas</BreadcrumbItem>
                            <BreadcrumbItem href="/tarjetas/registradas" isCurrentPage>
                                Registradas
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
                        <MainHeading>Nuestras Tarjetas de Crédito</MainHeading>
                        {
                            userRole === "admin" ?

                                <CreditCardsInfoTable cards={cards} />

                                :

                                <CreditCardsInfoTableSkeleton />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredCreditCards;