import {
    Grid,
    Row,
    Column,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import ClientInfoTableSkeleton from "../../components/ClientInfoTableSkeleton";
import ClientInfoTable from "../../components/ClientInfoTable";

import { Helmet } from "react-helmet";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredClientsTable = () => {
    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuestros Clientes</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Nuestros Clientes</MainHeading>
                        <ClientInfoTableSkeleton />
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        <ClientInfoTable />
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredClientsTable;