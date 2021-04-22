import {
    FormGroup,
    TextInput,
    DatePicker,
    DatePickerInput,
    NumberInput,
} from "carbon-components-react";

import {
    Component,
    createRef,
} from "react";

//TODO: Remove not required state variables and use ref values instead.

class ClientGeneralDataInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curpIsValid: true,
            rfcIsValid: true,
            firstname: "",
            lastname: "",
            curp: "",
            birthdate: "",
            rfc: "",
            income: "",
        }

        this.isCurpValid = this.isCurpValid.bind(this);
        this.isRfcValid = this.isRfcValid.bind(this);
        this.getGeneralData = this.getGeneralData.bind(this);

        this.firstnameRef = createRef();
        this.lastnameRef = createRef();
        this.curpRef = createRef();
        this.birthdateRef = createRef();
        this.rfcRef = createRef();
        this.incomeRef = createRef();
    }

    getMaxBirthdate() {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);

        return today.toLocaleDateString();
    }

    isCurpValid() {
        var curpHasRequiredLength = false;

        if (typeof (this.curpRef.current.value) === "string") {
            curpHasRequiredLength = this.curpRef.current.value.length === 18;
        }

        this.setState({
           curpIsValid: curpHasRequiredLength, 
           curp: this.curpRef.current.value,
        });
    }

    isRfcValid() {
        var rfcHasRequiredLength = false;

        if (typeof (this.rfcRef.current.value) === "string") {
            rfcHasRequiredLength = this.rfcRef.current.value.length >= 12;
        }
        if (this.birthdateRef) {
            console.log(this.birthdateRef.current.inputField.value);
        }

        this.setState({
            rfcIsValid: rfcHasRequiredLength,
            rfc: this.rfcRef.current.value,
        });
    }

    getGeneralData() {
        return {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            curp: this.state.curp,
            birthdate: this.birthdateRef.current.inputField.value,
            rfc: this.state.rfc,
            income: this.state.income,
        }
    }

    render() {
        const maxBirthDate = this.getMaxBirthdate();
        
        return (
            <FormGroup>
                <h4>Datos Generales</h4>
                <TextInput
                    labelText="Nombres"
                    size="lg"
                    maxLength={40}
                    invalidText="Campo Requerido"
                    ref={this.firstnameRef}
                    onChange={()=>{ this.setState({ firstname: this.firstnameRef.current.value }); }}
                    required
                />
                <TextInput
                    labelText="Apellidos"
                    size="lg"
                    maxLength={40}
                    ref={this.lastnameRef}
                    onChange={()=>{ this.setState({ lastname: this.lastnameRef.current.value }); }}
                    required
                />
                <TextInput
                    labelText="Clave Única de Registro de Población (CURP)"
                    size="lg"
                    maxLength={18}
                    ref={this.curpRef}
                    invalid={!this.state.curpIsValid}
                    onChange={this.isCurpValid}
                    invalidText="Ingrese los 18 cáracteres de la CURP"
                    ref={this.curpRef}
                    required
                />
                <DatePicker 
                    datePickerType="single" 
                    maxDate={maxBirthDate} 
                    dateFormat="d/m/Y" 
                    ref={this.birthdateRef}
                >
                    <DatePickerInput
                        id="birthdate"
                        labelText="Fecha de Nacimiento"
                        size="lg"
                        required 
                    />
                </DatePicker>
                <TextInput
                    labelText="Registro Federal de Contribuyentes (RFC)"
                    size="lg"
                    maxLength={13}
                    ref={this.rfcRef}
                    invalid={!this.state.rfcIsValid}
                    onChange={this.isRfcValid}
                    invalidText="Ingrese entre 12 y 13 cáracteres del RFC"
                    required
                />
                <NumberInput
                    label="Ingresos Mensuales Promedio"
                    size="lg"
                    placeholder="$"
                    ref={this.incomeRef}
                    onChange={()=>{ this.setState({ income: this.incomeRef.current.value }); }}
                    step={1000}
                    invalidText="Ingrese un valor númerico mayor a 0"
                    min={1000}
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
            </FormGroup>
        );
    }
}

export default ClientGeneralDataInput;