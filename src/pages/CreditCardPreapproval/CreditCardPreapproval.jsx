import {
    Grid,
    Row,
    Column,
    Link,
    Button,
    ProgressIndicator,
    ProgressStep,
    ComboBox,
    InlineLoading,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import { useContext, useState } from "react";

import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth";

const gridStyles = {
    marginTop: "80px",
    maxWidth: "50rem",
}


const CreditCardPreapproval = () => {
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [buttonSuccess, setButtonSuccess] = useState(false);
    const [buttonDescription, setButtonDescription] = useState("Obteniendo información...");
    const [ariaLive, setAriaLive] = useState("off");

    const [currentStep, setCurrentStep] = useState(0);
    const [creditCards, setCreditCards] = useState(null);
    const [selectedCreditCardId, setSelectedCreditCardId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const handleRequestPreapproval = () => {
        setButtonIsLoading(true);
        setAriaLive("assertive");

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/${currentUser.email}/available_credit_cards/`, {
            method: "GET",
            headers: {
                "Token": sessionStorage.getItem("token")
            },
        })
            .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
            .then(({ data, responseOk }) => {
                if (!responseOk) {
                    throw data.detail;
                }

                setButtonSuccess(true);
                setButtonDescription("Información obtenida");

                if (data.length === 0) {
                    setErrorMessage("No credit cards available for client tier.")
                }

                setTimeout(() => {
                    const stepsToMove = data.length === 0 ? 2 : 1;
                    setCreditCards(data);
                    setButtonIsLoading(false);
                    setButtonSuccess(false);
                    setButtonDescription("Creando solicitud...");
                    setAriaLive("off");
                    setCurrentStep(currentStep + stepsToMove);
                }, 1000);

            })
            .catch(error => { 
                console.log(error);
                setErrorMessage(error); 
                setCurrentStep(2);
            });
    }

    const handleRequestCreditCard = () => {
        setButtonIsLoading(true);
        setAriaLive("assertive");

        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/${currentUser.email}/request_credit_card/?credit_card=${selectedCreditCardId}`, {
            method: "GET",
            headers: {
                "Token": sessionStorage.getItem("token")
            },
        })
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (!responseOk) {
                console.log("Stpper: ", data)
                throw data.detail;
            }

            setButtonSuccess(true);
            setButtonDescription("Solicitud creada");
            setTimeout(() => {
                setButtonIsLoading(false);
                setButtonSuccess(false);
                setButtonDescription("Creando solicitud...");
                setAriaLive("off");
                setCurrentStep(currentStep + 1);
            }, 1000);
        })
        .catch(error => { 
            setErrorMessage(error); 
            setCurrentStep(2);
        });
    }

    const updateSelectedCard = ({ selectedItem }) => {
        console.log("I selected: ", selectedItem.id);
        setSelectedCreditCardId(selectedItem.id);
    }

    const steps = [
        (
            <>
                <h3>Evaluación de Crédito</h3><br />
                <p>Para continuar, debes aceptar el proceso de solicitud que implica analizar tu comportamiento económico.</p><br /><br />

                <div style={{ display: 'flex' }}>
                    <Button
                        kind="secondary"
                        disabled={buttonIsLoading || buttonSuccess}
                        onClick={() => { window.location.replace("/") }}
                    >
                        Cancelar
                    </Button>
                    {buttonIsLoading || buttonSuccess ? (
                        <InlineLoading
                            style={{ marginLeft: '1rem' }}
                            description={buttonDescription}
                            status={buttonSuccess ? 'finished' : 'active'}
                            aria-live={ariaLive}
                        />
                    ) : (
                        <Button onClick={handleRequestPreapproval}>Solicitar Preaprovación</Button>
                    )}
                </div>
            </>
        ),
        (
            <>
                <h3>Selección de Tarjeta de Crédito</h3><br />
                <p>Puedes elegir cualquiera de las tarjetas mostradas.</p><br /><br />
                <ComboBox
                    id="cards"
                    items={creditCards || []}
                    itemToString={(card) => (card.name)}
                    onChange={updateSelectedCard}
                    placeholder="Buscar tarjeta"
                    titleText="Tarjetas de Crédito"
                    helperText="Selecciona una tarjeta de crédito."
                />

                <div style={{ display: 'flex' }}>
                    <Button
                        kind="secondary"
                        disabled={buttonIsLoading || buttonSuccess}
                        onClick={() => { window.location.replace("/") }}
                    >
                        Cancelar
                    </Button>
                    {buttonIsLoading || buttonSuccess ? (
                        <InlineLoading
                            style={{ marginLeft: '1rem' }}
                            description={buttonDescription}
                            status={buttonSuccess ? 'finished' : 'active'}
                            aria-live={ariaLive}
                        />
                    ) : (
                        <Button onClick={handleRequestCreditCard}>Solicitar Tarjeta de Crédito</Button>
                    )}
                </div>
            </>
        ),
        (
            <>
                {
                    (creditCards === null || creditCards.length === 0 || errorMessage) ? (
                        <>
                            <h3>Lo sentimos, no podemos preaprobarte una tarjeta de crédito</h3><br />
                            <p>{errorMessage}</p><br /><br />
                        </>
                    ) :
                        (
                            <>
                                <h3>Solicitud creada exitosamente</h3><br />
                                <p>Espera a su aprobación para pasar a tu banco por la tarjeta. <Link href="/preaprobacion/historial">Ver mis solicitudes</Link>.</p><br /><br />
                            </>
                        )
                }
                <Button
                    onClick={() => { window.location.replace("/") }}
                >
                    Terminar
                </Button>
            </>
        )
    ];

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Solicitud de Preaprobación</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Solicitud de Preaprobación</MainHeading>
                        <ProgressIndicator
                            currentIndex={currentStep + 1}
                            spaceEqually={true}
                        >
                            <ProgressStep
                                label="Autenticación"
                            />
                            <ProgressStep
                                label="Evaluación de crédito"
                                disabled={currentStep < 0}
                                onChange={() => { console.log(2) }}
                            />
                            <ProgressStep
                                label="Selección de tarjeta"
                                invalid={creditCards === null && currentStep > 1}
                                disabled={currentStep < 1}
                            />
                            <ProgressStep
                                label="Proceso completado"
                                disabled={currentStep < 2}
                            />
                        </ProgressIndicator>
                        <br /><br /><br />
                        {
                            steps[currentStep]
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default CreditCardPreapproval;