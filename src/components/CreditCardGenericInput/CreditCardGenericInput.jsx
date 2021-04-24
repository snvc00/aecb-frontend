import {
    FormGroup,
    NumberInput,
    TextInput,
} from "carbon-components-react";

import {
    Component,
    createRef,
} from "react";

class CreditCardGenericInput extends Component {
    constructor(props) {
        super(props);

        this.getCreditCardGenerics = this.getCreditCardGenerics.bind(this);

        this.nameRef = createRef();
        this.minCreditRef = createRef();
        this.maxCreditRef = createRef();
        this.catRef = createRef();
        this.annualFeeRef = createRef();
    }

    getCreditCardGenerics() {
        return {
            name: this.nameRef.current.value,
            minCredit: this.minCreditRef.current.value,
            maxCredit: this.maxCreditRef.current.value,
            cat: this.catRef.current.value,
            annualFeed: this.annualFeeRef.current.value,
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
                    maxLength={50}
                    required
                />
                <NumberInput
                    label="Crédito Mínimo"
                    id="minCredit"
                    ref={this.minCreditRef}
                    size="lg"
                    min={1}
                    value={5000}
                    step={50}
                    invalidText="Ingrese un crédito mínimo mayor a 0"
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
                <NumberInput
                    label="Crédito Máximo"
                    id="maxCredit"
                    ref={this.maxCreditRef}
                    size="lg"
                    min={1}
                    value={10000}
                    step={50}
                    invalidText="Ingrese un crédito máximo mayor a 0"
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
                <NumberInput
                    label="Costo Anual Total (CAT)"
                    id="cat"
                    ref={this.catRef}
                    size="lg"
                    min={1}
                    max={100}
                    step={0.5}
                    value={20}
                    invalidText="Ingrese un CAT promedio entre 1% y 100%"
                    helperText="% en Promedio"
                    required
                />
                <NumberInput
                    label="Costo de Anualidad"
                    id="annualFee"
                    ref={this.annualFeeRef}
                    size="lg"
                    min={100}
                    step={100}
                    value={800}
                    invalidText="Ingrese un costo de anualidad mayor a 100"
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
            </FormGroup>
        );
    }
}

export default CreditCardGenericInput;