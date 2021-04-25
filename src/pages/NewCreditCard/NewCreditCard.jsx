import {
    Form,
    Grid,
    Row,
    Column,
    TextInput,
    Button,
    Breadcrumb,
    BreadcrumbItem,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import CreditCardGenericInput from "../../components/CreditCardGenericInput";
import CreditCardSpecificsInput from "../../components/CreditCardSpecificsInput";

import { Helmet } from "react-helmet";
import { createRef } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const getCreditCardData = (generics, specifics) => {
    const creditCardGenerics = generics.current.getCreditCardGenerics();
    const creditCardSpecifics = specifics.current.getCreditCardSpecifics();

    if (creditCardGenerics && creditCardSpecifics) {
        return { ...creditCardGenerics, ...creditCardSpecifics };
    } 
}

const NewCreditCard = () => { 
    const creditCardGenericsRef = createRef();
    const creditCardSpecificsRef = createRef();

    const handleOnSubmit = () => {
        const creditCard = getCreditCardData(creditCardGenericsRef, creditCardSpecificsRef);

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
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/tarjetas">Tarjetas</BreadcrumbItem>
                            <BreadcrumbItem href="/tartjetas/registrar" isCurrentPage>
                                Registrar
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Nueva Tarjeta de Crédito</MainHeading>
                        <Form onSubmit={handleOnSubmit}>
                            <CreditCardGenericInput ref={creditCardGenericsRef} />
                            <CreditCardSpecificsInput ref={creditCardSpecificsRef} />
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                            />
                            <Button onClick={handleOnSubmit} >
                                Añadir
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewCreditCard;