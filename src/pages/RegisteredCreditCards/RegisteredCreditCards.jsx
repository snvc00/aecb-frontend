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

    const { userRole } = useContext(AuthContext);

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
                title: String(error),
            });
            setShowNotification(true);
        });
    }, []);

    const formatCards = cards => {
        const tiers = [ "None", "Bronze", "Silver", "Gold", "Diamond"];
        const formattedCards = cards.map(card => {

            return {
                id: Number(card.id).toString(),
                name: card.name,
                min_credit: `$${card.min_credit} DLLS`,
                max_credit: `$${card.max_credit} DLLS`,
                cat: `${card.cat}%`,
                annual_fee: `$${card.annual_fee} DLLS`,
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
                <title>National Bank | Our Credit Cards</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem href="/cards">Credit Cards</BreadcrumbItem>
                            <BreadcrumbItem href="/cards/registered" isCurrentPage>
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
                        <MainHeading>Our Credit Cards</MainHeading>
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