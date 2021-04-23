import {
    Form,
    Grid,
    Row,
    Column,
    TextInput,
    Button,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import CreditCardInput from "../../components/CreditCardInput";

import { Helmet } from "react-helmet";
import { createRef } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const NewCreditCard = () => { 
    const creditCardRef = createRef();

    const handleOnSubmit = () => {
        const creditCard = creditCardRef.current.getCreditCard();

        console.log(creditCard);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nueva Tarjeta de Crédito</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Nueva Tarjeta de Crédito</MainHeading>
                        <Form onSubmit={handleOnSubmit}>
                            <CreditCardInput ref={creditCardRef} />
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                            />
                            <Button onClick={handleOnSubmit} >
                                Guardar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewCreditCard;