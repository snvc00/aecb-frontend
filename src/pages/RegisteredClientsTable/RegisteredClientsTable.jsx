import {
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
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
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes">Clientes</BreadcrumbItem>
                            <BreadcrumbItem href="/clientes/registrados" isCurrentPage>
                                Registrados
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Nuestros Clientes</MainHeading>
                        <ClientInfoTableSkeleton />
                        <div>
                            <br />
                            <br />
                            <br />
                        </div>
                        <ClientInfoTable />
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredClientsTable;