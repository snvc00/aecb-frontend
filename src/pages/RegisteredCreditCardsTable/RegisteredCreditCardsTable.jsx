import {
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    ComposedModal,
    ModalHeader,
    ModalBody,
    TextInput,
    ModalFooter,
    InlineNotification,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import CreditCardsInfoTableSkeleton from "../../components/CreditCardsInfoTableSkeleton";
import CreditCardsInfoTable from "../../components/CreditsCardsInfoTable";

import { Helmet } from "react-helmet";
import { useState, useRef } from "react";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredCreditCardsTable = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [cards, setCards] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const tokenRef = useRef();

    const handleModalSubmit = async () => {
        console.log("HANDLING")
        await fetch("http://localhost:5000/api/cards", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": tokenRef.current.value
            }
        })
            .then(body => body.json())
            .then(data => {
                if (data.hasOwnProperty("credit_cards")) {
                    console.log(data.credit_cards);
                    const cards = formatCards(data.credit_cards);
                    setCards(cards);
                    setIsAuthenticated(true);
                    sessionStorage.setItem("token", tokenRef.current.value);
                }
                else if (data.hasOwnProperty("error")) {
                    console.log(data.error);
                    setNotificationInfo({
                        kind: "error",
                        title: data.error.message,
                    });
                    setShowNotification(true);
                }
            })
            .catch(error => {
                console.log(error);
                setNotificationInfo({
                    kind: "error",
                    title: "Ha ocurrido un error",
                });
                setShowNotification(true);
            });

        setIsModalOpen(false);
    }

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
                image: card.image
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
                        <ComposedModal
                            open={isModalOpen}
                            onClose={() => {
                                setNotificationInfo({
                                    kind: "error",
                                    title: "Token no verificado",
                                });
                                setShowNotification(true);
                            }}
                        >
                            <ModalHeader
                                label="Identificación"
                                title="Ingresa tu Token de Administrador"
                            />
                            <ModalBody>
                                <p style={{ marginBottom: "1rem" }}>
                                    Recuerda el tratar con seguridad esta información, ya que es
                                    de uso exclusivo de personal administrativo.
                                </p>
                                <TextInput
                                    data-modal-primary-focus
                                    id="token"
                                    ref={tokenRef}
                                    labelText=""
                                    placeholder="Token de Administrador"
                                    style={{ marginBottom: "1rem" }}
                                    type="password"
                                />
                            </ModalBody>
                            <ModalFooter
                                primaryButtonText="Ingresar"
                                secondaryButtonText="Cancelar"
                                onRequestSubmit={() => { handleModalSubmit(); }}
                            />
                        </ComposedModal>
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
                        <MainHeading>Nuestras Tarjetas de Crédito</MainHeading>
                        {
                            isAuthenticated ?

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

export default RegisteredCreditCardsTable;