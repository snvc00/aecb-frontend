import {
    Grid,
    Row,
    Column,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import PreapprovalRequestsTableSkeleton from "../../components/PreapprovalRequestsTableSkeleton";
import PreapprovalRequestsTable from "../../components/PreapprovalRequestsTable";

import { Helmet } from "react-helmet";

const gridStyles = {
    marginTop: "80px",
}

const PreapprovalRequestRecords = () => {
    return (
        <>
            <Helmet>
                <title>Banco Nacional | Solicitudes de Preaprobación</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Solicitudes de Preaprobación</MainHeading>
                        <PreapprovalRequestsTableSkeleton />
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        <PreapprovalRequestsTable />
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default PreapprovalRequestRecords;