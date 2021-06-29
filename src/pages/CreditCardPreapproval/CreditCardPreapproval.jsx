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
    const [buttonDescription, setButtonDescription] = useState("Getting info...");
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
                setButtonDescription("Info fetched");

                if (data.length === 0) {
                    setErrorMessage("No credit cards available for client tier.")
                }

                setTimeout(() => {
                    const stepsToMove = data.length === 0 ? 2 : 1;
                    setCreditCards(data);
                    setButtonIsLoading(false);
                    setButtonSuccess(false);
                    setButtonDescription("Creating preapproval request...");
                    setAriaLive("off");
                    setCurrentStep(currentStep + stepsToMove);
                }, 1000);

            })
            .catch(error => { 
                console.log(error);
                setErrorMessage(String(error)); 
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
                throw data.detail;
            }

            setButtonSuccess(true);
            setButtonDescription("Preapproval request created");
            setTimeout(() => {
                setButtonIsLoading(false);
                setButtonSuccess(false);
                setButtonDescription("Creating preapproval request...");
                setAriaLive("off");
                setCurrentStep(currentStep + 1);
            }, 1000);
        })
        .catch(error => { 
            setErrorMessage(String(error)); 
            setCurrentStep(2);
        });
    }

    const updateSelectedCard = ({ selectedItem }) => {
        setSelectedCreditCardId(selectedItem.id);
    }

    const steps = [
        (
            <>
                <h3>Credit Evaluation</h3><br />
                <p>If you continue you accept to use your economical behaviour data.</p><br /><br />

                <div style={{ display: "flex" }}>
                    <Button
                        kind="secondary"
                        disabled={buttonIsLoading || buttonSuccess}
                        onClick={() => { window.location.replace("/") }}
                    >
                        Cancel
                    </Button>
                    {buttonIsLoading || buttonSuccess ? (
                        <InlineLoading
                            style={{ marginLeft: '1rem' }}
                            description={buttonDescription}
                            status={buttonSuccess ? 'finished' : 'active'}
                            aria-live={ariaLive}
                        />
                    ) : (
                        <Button onClick={handleRequestPreapproval}>Request Preapproval</Button>
                    )}
                </div>
            </>
        ),
        (
            <>
                <h3>Select Credit Card</h3><br />
                <p>Pick one of the available credit cards.</p><br /><br />
                <ComboBox
                    id="cards"
                    items={creditCards || []}
                    itemToString={(card) => (card.name)}
                    onChange={updateSelectedCard}
                    placeholder="Search credit card"
                    titleText="Credit Cards"
                    helperText="Select a credit card."
                />

                <div style={{ display: "flex" }}>
                    <Button
                        kind="secondary"
                        disabled={buttonIsLoading || buttonSuccess}
                        onClick={() => { window.location.replace("/") }}
                    >
                        Cancel
                    </Button>
                    {buttonIsLoading || buttonSuccess ? (
                        <InlineLoading
                            style={{ marginLeft: '1rem' }}
                            description={buttonDescription}
                            status={buttonSuccess ? 'finished' : 'active'}
                            aria-live={ariaLive}
                        />
                    ) : (
                        <Button onClick={handleRequestCreditCard}>Request Credit Card</Button>
                    )}
                </div>
            </>
        ),
        (
            <>
                {
                    (creditCards === null || creditCards.length === 0 || errorMessage) ? (
                        <>
                            <h3>We are sorry, we can not offer you any credit card.</h3><br />
                            <p>{errorMessage}</p><br /><br />
                        </>
                    ) :
                        (
                            <>
                                <h3>Preapproval request created successfully</h3><br />
                                <p>Wait until approval to pick the credit card in your nearest National Bank. <Link href="/preapproval/history">Go to My Preapprovals</Link>.</p><br /><br />
                            </>
                        )
                }
                <Button
                    onClick={() => { window.location.replace("/") }}
                >
                    Home
                </Button>
            </>
        )
    ];

    return (
        <>
            <Helmet>
                <title>National Bank | Preapproval Request</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Preapproval Request</MainHeading>
                        <ProgressIndicator
                            currentIndex={currentStep + 1}
                            spaceEqually={true}
                        >
                            <ProgressStep
                                label="Authentication"
                            />
                            <ProgressStep
                                label="Credit Evaluation"
                                disabled={currentStep < 0}
                                onChange={() => { console.log(2) }}
                            />
                            <ProgressStep
                                label="Pick Credit Card"
                                invalid={creditCards === null && currentStep > 1}
                                disabled={currentStep < 1}
                            />
                            <ProgressStep
                                label="Finish"
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