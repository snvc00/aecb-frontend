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
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth";
import { useEffect } from "react/cjs/react.development";

const gridStyles = {
    marginTop: "80px",
};

const PreapprovalRequestRecords = () => {
    const [preapprovalRequests, setPreapprovalRequests] = useState([]);
    const { userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/preapprovals/`, {
            method: "GET",
            headers: {
                "Token": sessionStorage.getItem("token")
            }
        })
            .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
            .then(({ data, responseOk }) => {
                if (responseOk) {
                    const preapprovals = formatPreapprovals(data);
                    setPreapprovalRequests(preapprovals);
                }
                else {
                    throw data.detail;
                }

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const formatPreapprovals = preapprovals => {
        const formattedPreapprovals = preapprovals.map(preapproval => ({
            id: preapproval.id,
            creation_timestamp: new Date(preapproval.creation_timestamp).toLocaleString("en-US", { timeZone: "GMT" }),
            approved: preapproval.approved ? "Yes" : "No",
            active: preapproval.active ? "Yes" : "No",
            credit_card_id: preapproval.credit_card.id,
            credit_card_name: preapproval.credit_card.name,
            credit_card_range: `$${preapproval.credit_card.min_credit} - $${preapproval.credit_card.max_credit}`,
            client_name: preapproval.client.name,
            client_email: preapproval.client.email,
            reviewed_by: preapproval.reviewed_by ? preapproval.reviewed_by.email : "",
        }));

        return formattedPreapprovals;
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Preapproval Requests</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Preapproval Requests</MainHeading>

                        {userRole === "admin" ? (
                            <PreapprovalRequestsTable preapprovals={preapprovalRequests} />
                        ) : (
                            <PreapprovalRequestsTableSkeleton />
                        )}
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default PreapprovalRequestRecords;
