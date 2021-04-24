import {
    Grid,
    Row,
    Column,
    Form,
    TextInput,
    Button,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import { Component, createRef } from "react";

import { Helmet } from "react-helmet";

const gridStyles = {
    marginTop: "80px",
    maxWidth: "50rem",
}

class CreditCardPreapproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curpIsValid: true,
        }

        this.isCurpValid = this.isCurpValid.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

        this.curpRef = createRef();
        this.passwordRef = createRef();
    }

    handleOnSubmit() {
        console.log(this.curpRef.current.value, this.passwordRef.current.value);
    }

    isCurpValid() {
        var curpHasRequiredLength = false;

        if (typeof (this.curpRef.current.value) === "string") {
            curpHasRequiredLength = this.curpRef.current.value.length === 18;
        }

        this.setState({
            curpIsValid: curpHasRequiredLength,
        });
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Banco Nacional | Solicitud de Preaprobación</title>
                </Helmet>
                <Header />
                <Grid style={gridStyles}>
                    <Row>
                        <Column>
                            <MainHeading>Solicitud de Preaprobación</MainHeading>
                            <Form onSubmit={this.handleOnSubmit}>
                                <TextInput
                                    labelText="Clave Única de Registro de Población (CURP)"
                                    id="curp"
                                    size="lg"
                                    maxLength={18}
                                    ref={this.curpRef}
                                    invalid={!this.state.curpIsValid}
                                    onChange={this.isCurpValid}
                                    invalidText="Ingrese los 18 cáracteres de la CURP"
                                    ref={this.curpRef}
                                    required
                                />
                                <TextInput
                                    id="password"
                                    labelText="Contraseña"
                                    size="lg"
                                    type="password"
                                    ref={this.passwordRef}
                                    required
                                />
                                <Button onClick={this.handleOnSubmit} >
                                    Solicitar
                                </Button>
                            </Form>
                        </Column>
                    </Row>
                </Grid>
            </>
        );
    }
}

export default CreditCardPreapproval;