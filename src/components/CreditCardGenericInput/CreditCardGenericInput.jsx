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
            min_credit: parseInt(this.minCreditRef.current.value),
            max_credit: parseInt(this.maxCreditRef.current.value),
            cat: parseInt(this.catRef.current.value),
            annual_fee: parseInt(this.annualFeeRef.current.value),
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
                    defaultValue={this.props.creditCard ? this.props.creditCard.name : ""}
                    required
                />
                <NumberInput
                    label="Crédito Mínimo"
                    id="minCredit"
                    ref={this.minCreditRef}
                    size="lg"
                    step={50}
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    value={this.props.creditCard ? this.props.creditCard.min_credit : 5000}
                    required
                />
                <NumberInput
                    label="Crédito Máximo"
                    id="maxCredit"
                    ref={this.maxCreditRef}
                    value={this.props.creditCard ? this.props.creditCard.max_credit : 10000}
                    size="lg"
                    step={50}
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
                <NumberInput
                    label="Costo Anual Total (CAT)"
                    id="cat"
                    ref={this.catRef}
                    size="lg"
                    value={this.props.creditCard ? this.props.creditCard.cat : 20}
                    max={100}
                    step={0.5}
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
                    onChange={()=>{console.log(this.props.creditCard)}}
                    value={this.props.creditCard ? this.props.creditCard.annual_fee : 800}
                    invalidText="Ingrese un costo de anualidad mayor a 100"
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
            </FormGroup>
        );
    }
}

export default CreditCardGenericInput;