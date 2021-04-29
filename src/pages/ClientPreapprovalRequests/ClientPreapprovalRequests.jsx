import {
    Grid,
    Row,
    Column,
    Form,
    TextInput,
    Button,
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Select,
    SelectItem,
    ToastNotification,
    Link,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import PreapprovalRequestsTable from "../../components/PreapprovalRequestsTable";
import PreapprovalRequestsTableSkeleton from "../../components/PreapprovalRequestsTableSkeleton";
import { Component, createRef } from "react";

import { Helmet } from "react-helmet";

const gridStyles = {
    marginTop: "80px",
}

class ClientPreapprovalRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curpIsValid: true,
            requests: undefined,
            isAuthenticated: undefined,
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
                    <title>Banco Nacional | Mis Solicitudes</title>
                </Helmet>
                <Header />
                <Grid style={gridStyles}>
                    <Row>
                        <Column>
                            <ComposedModal 
                                open 
                                onClose={() => {
                                    this.setState({ isAuthenticated: false });
                                }}
                            >
                                <ModalHeader label="Identificación" title="Ingresa tus credenciales" />
                                <ModalBody>
                                    <p style={{ marginBottom: '1rem' }}>
                                        Tu CURP y contraseña hace posible el poder verficar que solo tu puedes
                                        ver tu historial de solicitudes.
                                    </p>
                                    <TextInput
                                        data-modal-primary-focus
                                        id="curp"
                                        placeholder="CURP"
                                        ref={this.curpRef}
                                        style={{ marginBottom: '1rem' }}
                                    />
                                    <TextInput
                                        data-modal-primary-focus
                                        id="password"
                                        placeholder="Contraseña"
                                        ref={this.passwordRef}
                                        style={{ marginBottom: '1rem' }}
                                        type="password"
                                    />
                                </ModalBody>
                                <ModalFooter primaryButtonText="Ingresar" secondaryButtonText="Cancelar" />
                            </ComposedModal>
                            <MainHeading>Mis Solicitudes</MainHeading>
                            {this.state.isAuthenticated === false ? (
                                <Row>
                                    <Column sm={2} md={{ span: 4, offset: 6 }}>
                                        <ToastNotification
                                            title="Error de Autenticación"
                                            subtitle="Credenciales no válidas"
                                            onCloseButtonClick={() => {
                                                setTimeout(() => {
                                                    window.location.reload();
                                                }, 1000);
                                            }}
                                            style={{ marginBottom: "2rem" }}
                                            caption={
                                                <Link onClick={() => { window.location.reload(); }}>
                                                    Intentar de nuevo
                                                </Link>
                                            }
                                        >
                                        </ToastNotification>
                                    </Column>
                                </Row>
                            ) : (
                                <></>
                            )}
                            {
                                (this.state.requests !== undefined) ?

                                    <PreapprovalRequestsTable />

                                    :

                                    <PreapprovalRequestsTableSkeleton />
                            }
                        </Column>
                    </Row>
                </Grid>
            </>
        );
    }
}

export default ClientPreapprovalRequests;