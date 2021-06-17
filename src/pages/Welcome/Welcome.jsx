import Header from "../../components/Header";
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
import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { AuthContext } from "../../Auth";
import { useContext, useEffect, useState } from "react";
import "./Welcome.css";
import { useHistory } from "react-router-dom";

const Welcome = () => {
    const { currentUser, errorMessage } = useContext(AuthContext);
    const [showNotification, setShowNotification] = useState(true);
    let history = useHistory();

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Bienvenido</title>
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
                                            Reintentar
                                        </NotificationActionButton>
                                    }
                                />

                                :

                                <></>
                        }
                        <MainHeading>Bienvenido <span style={{textTransform: "capitalize"}}>{currentUser ? currentUser.displayName.toLowerCase() : "a Banco Nacional"}</span></MainHeading>
                        <SkeletonPlaceholder style={{ width: "100%", height: 400 }} />
                    </Column>
                </Row>
            </Grid>
            <Grid className="spaced">
                <Row>
                    <Column>
                        <h4><strong>Servicios a Clientes</strong></h4><br />
                        <p className="spaced">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Link href="/preaprobacion" renderIcon={Purchase24} size="lg">
                            Solicitar Tarjeta
                        </Link>
                    </Column>
                    <Column>
                        <h4><strong>Servicios a Administradores</strong></h4><br />
                        <p className="spaced">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Link href="/clientes" renderIcon={Group24} size="lg">
                            Gestionar Clientes
                        </Link>
                    </Column>
                    <Column>
                        <h4><strong>Promociones en Tarjetas de Crédito</strong></h4><br />
                        <p className="spaced">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <Link href="/promociones-tarjetas" renderIcon={Badge24} size="lg">
                            Ver Promociones
                        </Link>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default Welcome;