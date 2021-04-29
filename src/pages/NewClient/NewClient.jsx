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
import ClientGeneralDataInput from "../../components/ClientGeneralDataInput";
import ClientAddressInput from "../../components/ClientAddressInput";

import { Helmet } from "react-helmet";
import { useRef } from "react";

import "./NewClient.css";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const getClientData = (generalData, address) => {
    const clientGeneralData = generalData.current.getGeneralData();
    const clientAddress = address.current.getAddress();

    if (clientGeneralData && clientAddress) {
        return { ...clientGeneralData, ...clientAddress };
    } 
}

const NewClient = () => { 
    const generalDataRef = useRef();
    const addressRef = useRef();

    const submitClientRegister = () => {
        const clientData = getClientData(generalDataRef, addressRef);

        // Enviar datos a la API
        console.log(clientData);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuevo Cliente</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes">Clientes</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes/registro" isCurrentPage>
                                Registrar
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Nuevo Cliente</MainHeading>
                        <Form onSubmit={submitClientRegister}>
                            <ClientGeneralDataInput ref={generalDataRef} />
                            <ClientAddressInput ref={addressRef} />
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                            />
                            <Button onClick={submitClientRegister} >
                                Registrar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewClient;