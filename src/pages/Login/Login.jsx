import firebase from "firebase/app";
import app from "../../firebase";

import {
    Grid,
    Row,
    Column,
    Button,
} from "carbon-components-react";
import { LogoGoogle32 as Google } from "@carbon/icons-react"
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";

const gridStyles = {
    maxWidth: "50rem",
    marginTop: "80px"
}

const Login = () => {
    const handleLogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        app.auth().signInWithPopup(provider).then(result => {
            result.user.getIdToken(false).then(idToken => {
                sessionStorage.setItem("token", idToken);
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error);
            });

        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Iniciar Sesión</title>
            </Helmet>
            <Header />
            <Grid style={gridStyles}>
                <Row>
                    <Column>
                        <MainHeading>Iniciar Sesión</MainHeading>
                        <Button
                            renderIcon={Google}
                            iconDescription="Iniciar sesión con Google"
                            onClick={handleLogin}
                        >
                            Iniciar sesión con Google
                        </Button>
                    </Column>
                </Row>
            </Grid>
        </>
    );
};

export default Login;