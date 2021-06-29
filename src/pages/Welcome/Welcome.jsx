import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import {
    Grid,
    Row,
    Column,
    SkeletonPlaceholder,
    Link,
    InlineNotification,
    NotificationActionButton,
} from "carbon-components-react";
import {
    Purchase24,
    Group24,
    Badge24,
} from "@carbon/icons-react";
import "./Welcome.css";
import { Helmet } from 'react-helmet'
import { AuthContext } from "../../Auth";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const Welcome = () => {
    const { currentUser, errorMessage } = useContext(AuthContext);
    const [showNotification, setShowNotification] = useState(true);
    let history = useHistory();

    return (
        <>
            <Helmet>
                <title>National Bank | Welcome</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        {
                            (errorMessage && showNotification) ?
                                <InlineNotification
                                    kind="error"
                                    title={errorMessage}
                                    onCloseButtonClick={() => { setShowNotification(false); }}
                                    actions={
                                        <NotificationActionButton
                                            onClick={() => { history.push("/login") }}
                                        >
                                            Retry
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <MainHeading>Welcome <span style={{textTransform: "capitalize"}}>{currentUser ? currentUser.displayName.toLowerCase() : "to National Bank"}</span></MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                    </Column>
                </Row>
            </Grid>
            <Grid className="spaced">
                <Row>
                    <Column>
                        <h4><strong>Services for Clients</strong></h4><br />
                        <p className="spaced">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Link href="/preapproval" renderIcon={Purchase24} size="lg">
                            Preapproval Request
                        </Link>
                    </Column>
                    <Column>
                        <h4><strong>Services for Admins</strong></h4><br />
                        <p className="spaced">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Link href="/clients" renderIcon={Group24} size="lg">
                            Manage Clients
                        </Link>
                    </Column>
                    <Column>
                        <h4><strong>Credit Card Promotions</strong></h4><br />
                        <p className="spaced">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Link href="/card-promotions" renderIcon={Badge24} size="lg">
                            About Promotions
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default Welcome;