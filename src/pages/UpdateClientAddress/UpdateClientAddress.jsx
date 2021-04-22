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
import ClientAddressInput from "../../components/ClientAddressInput";

import { Helmet } from "react-helmet";
import { useRef } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const UpdateClientAddress = () => { 
    const addressRef = useRef();

    const submitClientAddress = () => {
        const clientAddress = addressRef.current.getAddress();

        console.log(clientAddress);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Actualizar Domicilio</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Actualizar Domicilio</MainHeading>
                        <Form onSubmit={submitClientAddress}>
                            <ClientAddressInput ref={addressRef} />
                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                            />
                            <Button onClick={submitClientAddress} >
                                Actualizar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default UpdateClientAddress;