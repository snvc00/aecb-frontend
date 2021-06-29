import Header from "../../components/Header";
import {
    Grid,
    Row,
    Column,
} from "carbon-components-react";
import { Helmet } from 'react-helmet'

const statusCodeStyles = {
    fontSize: "10rem",
    fontWeight: "bold",
}

const ErrorHandler = props => (
    <>
        <Helmet>
            <title>National Bank | We are sorry</title>
        </Helmet>
        <Header />
        <Grid condensed className="spaced top">
            <Row>
                <Column>
                </Column>
                <Column>
                    <h1 style={statusCodeStyles}>{props.code}</h1>
                    <h2>Woops...</h2><br/><br/>
                    <h4>{props.message}</h4>
                </Column>
                <Column>
                </Column>
            </Row>
        </Grid>
    </>
);

export default ErrorHandler;