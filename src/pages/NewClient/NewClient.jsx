import {
    FormGroup,
    Form,
    Grid,
    Row,
    Column,
    TextInput,
    DatePickerInput,
    DatePicker,
    NumberInput,
    Button,
    ComboBox,
} from "carbon-components-react";

import Header from "../../components/Header";
import MainHeading from "../../components/MainHeading";
import ClientGeneralDataInput from "../../components/ClientGeneralDataInput";

import { Helmet } from "react-helmet";
import { useRef, useState } from "react";

import "./NewClient.css";

import { states } from "../../assets/json/mexico.json";

const NewClient = () => {
    const generalRef = useRef();

    if (generalRef.current !== undefined) {
        console.log(generalRef.current);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Nuevo Cliente</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <MainHeading>Nuevo Cliente</MainHeading>
                        <Form>
                            <ClientGeneralDataInput ref={generalRef} />
                            
                            <h4>Dirección</h4>
                            <FormGroup>
                                <TextInput
                                    id="street"
                                    labelText="Calle y Número"
                                    size="lg"
                                    maxLength={80}
                                    required
                                />
                                <ComboBox
                                    onChange={() => { }}
                                    id="state"
                                    items={states}
                                    itemToString={(state) => (state)}
                                    placeholder="Filtrar"
                                    titleText="Estado"
                                />
                                <TextInput
                                    id="state"
                                    labelText="Ciudad" 
                                    size="lg" />
                            </FormGroup>

                            <TextInput
                                id="token"
                                labelText="Token de Administrador"
                                size="lg"
                                type="password"
                                onClick={()=>{console.log(generalRef.current.getGeneralData())}}
                            />
                            <Button type="submit" >
                                Registrar
                            </Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default NewClient;