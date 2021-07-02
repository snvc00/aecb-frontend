import {
    Grid,
    Row,
    Column,
    InlineNotification,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import PreapprovalRequestsClientTable from "../../components/PreapprovalRequestsClientTable";
import PreapprovalRequestsTableSkeleton from "../../components/PreapprovalRequestsTableSkeleton";
import { useContext, useEffect, useRef, useState } from "react";

import { Helmet } from "react-helmet";
import { AuthContext } from "../../Auth";

const gridStyles = {
    marginTop: "80px",
}

const ClientPreapprovalRequests = () => {
    const [preapprovals, setPreapprovals] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationInfo, setNotificationInfo] = useState();

    const { currentUser, userRole } = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/clients/${currentUser.email}/preapproval_requests/`, {
            method: "GET",
            headers: {
                "Token": sessionStorage.getItem("token")
            }
        })
            .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
            .then(({ data, responseOk }) => {
                if (responseOk) {
                    const preapprovals = formatPreapprovals(data);
                    setPreapprovals(preapprovals);
                }
                else {
                    throw data.detail;
                }
            })
            .catch(error => {
                console.log(error);
                setNotificationInfo({
                    kind: "error",
                    title: String(error),
                });
                setShowNotification(true);
            });
    }, []);

    const formatPreapprovals = (preapprovals) => {
        const formattedPreapprovals = preapprovals.map(preapproval => {
            return {
                id: Number(preapproval.id).toString(),
                approved: preapproval.approved ? "Yes" : "No",
                active : preapproval.active ? "Yes" : "No",
                creation_timestamp: preapproval.creation_timestamp,
                last_update: preapproval.last_update,
                credit_card_name: preapproval.credit_card.name,
                credit_card_max_credit: `$${preapproval.credit_card.max_credit} DLLS`,
                reviewed_by: preapproval.reviewed_by ? preapproval.reviewed_by : "",
                credit_card_image: process.env.REACT_APP_BACKEND_API + preapproval.credit_card.image,
            }
        });

        return formattedPreapprovals;
    }

    return (
        <>
            <Helmet>
                <title>National Bank | My Preapprovals</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        {showNotification ?
                            <InlineNotification
                                kind={notificationInfo.kind || "error"}
                                title={notificationInfo.title || ""}
                                style={{ marginBottom: "2rem" }}
                            >
                            </InlineNotification>

                            :

                            <></>
                        }
                        <MainHeading>My Preapprovals</MainHeading>
                        {
                            userRole === "client" ?

                                <PreapprovalRequestsClientTable preapprovals={preapprovals} clientName={currentUser.displayName} />

                                :

                                <PreapprovalRequestsTableSkeleton />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );

}

export default ClientPreapprovalRequests;