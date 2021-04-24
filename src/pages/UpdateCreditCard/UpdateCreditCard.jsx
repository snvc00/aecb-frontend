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
import CreditCardSpecificsInput from "../../components/CreditCardSpecificsInput";

import { Helmet } from "react-helmet";
import { useRef } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateCreditCard = () => { 
    const creditCardSpecificsRef = useRef();

    const handleOnSubmit = () => {
        const creditCardSpecifics = creditCardSpecificsRef.current.getCreditCardSpecifics();

        console.log(creditCardSpecifics);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Actualizar Tarjeta de Crédito</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Actualizar Tarjeta de Crédito</MainHeading>
                        <Form onSubmit={handleOnSubmit}>
                            <CreditCardSpecificsInput ref={creditCardSpecificsRef} />
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                            />
                            <Button onClick={handleOnSubmit} >
                                Actualizar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default UpdateCreditCard;