import {
    FormGroup,
    TextInput,
    TextArea,
    NumberInput,
} from "carbon-components-react";

import {
    createRef,
    Component,
} from "react";


class InsuranceInput extends Component {
    constructor(props) {
        super(props);

        this.getInsurance = this.getInsurance.bind(this);

        this.nameRef = createRef();
        this.descriptionRef = createRef();
        this.maxProtectionRef = createRef();
    }

    getInsurance() {
        return {
            name: this.nameRef.current.value,
            description: this.descriptionRef.current.value,
            max_protection: this.maxProtectionRef.current.value,
        }
    }

    render() {
        return (
            <FormGroup legendText={<h4>Datos Generales</h4>}>
                <TextInput
                    labelText="Nombre"
                    id="name"
                    size="lg"
                    ref={this.nameRef}
                    defaultValue={this.props.insurance ? this.props.insurance.name : ""}
                    maxLength={50}
                    required
                />
                <TextArea
                    labelText="Descripción"
                    id="description"
                    ref={this.descriptionRef}
                    defaultValue={this.props.insurance ? this.props.insurance.description : ""}
                    maxLength={300}
                    required
                />
                <NumberInput
                    label="Protección Máxima"
                    id="max_protection"
                    ref={this.maxProtectionRef}
                    size="lg"
                    value={this.props.insurance ? this.props.insurance.max_protection : 10000}
                    step={1000}
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
            </FormGroup>
        );
    }
}

export default InsuranceInput;