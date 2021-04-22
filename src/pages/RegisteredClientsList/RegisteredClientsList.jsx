import {
    Grid,
    Row,
    Column,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";

import { Helmet } from "react-helmet";
import { useRef } from "react";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const RegisteredClientsList = () => { 
    return (
        <>
            <Helmet>
                <title>Banco Nacional | Lista de Clientes</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Lista de Clientes</MainHeading>
                        
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredClientsList;