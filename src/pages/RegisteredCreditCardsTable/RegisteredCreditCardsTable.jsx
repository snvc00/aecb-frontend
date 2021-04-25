import {
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import CreditCardsInfoTableSkeleton from "../../components/CreditCardsInfoTableSkeleton";
import CreditCardsInfoTable from "../../components/CreditsCardsInfoTable";

import { Helmet } from "react-helmet";

const gridStyles = {
    marginTop: "80px",
}

const RegisteredCreditCardsTable = () => {
    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuestras Tarjetas de Crédito</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <Breadcrumb>
                            <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
                            <BreadcrumbItem href="/tarjetas">Tarjetas</BreadcrumbItem>
                            <BreadcrumbItem href="/tartjetas/registradas" isCurrentPage>
                                Registradas
                            </BreadcrumbItem>
                        </Breadcrumb><br/><br/>
                        <MainHeading>Nuestras Tarjetas de Crédito</MainHeading>
                        <CreditCardsInfoTableSkeleton />
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        <CreditCardsInfoTable />
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default RegisteredCreditCardsTable;