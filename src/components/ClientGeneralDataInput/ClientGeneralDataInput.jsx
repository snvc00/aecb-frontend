import {
    FormGroup,
    TextInput,
    DatePicker,
    DatePickerInput,
    NumberInput,
    Checkbox,
} from "carbon-components-react";

import {
    Component,
    createRef,
} from "react";

class ClientGeneralDataInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curpIsValid: true,
            rfcIsValid: true,
            hasCredit: false,
        }

        this.isCurpValid = this.isCurpValid.bind(this);
        this.isRfcValid = this.isRfcValid.bind(this);
        this.getGeneralData = this.getGeneralData.bind(this);

        this.firstnameRef = createRef();
        this.lastnameRef = createRef();
        this.emailRef = createRef();
        this.curpRef = createRef();
        this.birthdateRef = createRef();
        this.rfcRef = createRef();
        this.incomeRef = createRef();
    }

    getBirthdateBounds() {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        const maxBirthdate = today.toLocaleDateString("es");

        today.setFullYear(today.getFullYear() - 100);
        const minBirthdate = today.toLocaleDateString("es");

        return { minBirthdate: minBirthdate, maxBirthdate: maxBirthdate };
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

    isRfcValid() {
        var rfcHasRequiredLength = false;

        if (typeof (this.rfcRef.current.value) === "string") {
            rfcHasRequiredLength = this.rfcRef.current.value.length >= 12;
        }

        this.setState({
            rfcIsValid: rfcHasRequiredLength,
        });
    }

    getGeneralData() {
        const birthdate = this.birthdateRef.current.inputField.value.split("/");
        
        return {
            name: this.firstnameRef.current.value + " " + this.lastnameRef.current.value,
            email: this.emailRef.current.value,
            curp: this.curpRef.current.value,
            birthdate: `${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`, // Send birthdate in YYYY-MM-DD format
            rfc: this.rfcRef.current.value,
            income: parseInt(this.incomeRef.current.value),
            has_credit: this.state.hasCredit,
        }
    }

    render() {
        const { minBirthdate, maxBirthdate } = this.getBirthdateBounds();
        
        return (
            <FormGroup legendText={<h4>Datos Generales</h4>}>
                <TextInput
                    labelText="Nombres"
                    id="firstname"
                    size="lg"
                    maxLength={40}
                    invalidText="Campo Requerido"
                    ref={this.firstnameRef}
                    required
                />
                <TextInput
                    labelText="Apellidos"
                    id="lastname"
                    size="lg"
                    maxLength={40}
                    ref={this.lastnameRef}
                    required
                />
                <TextInput
                    labelText="Correo Electrónico"
                    id="email"
                    type="email"
                    size="lg"
                    maxLength={60}
                    ref={this.emailRef}
                    required
                />
                <TextInput
                    labelText="Clave Única de Registro de Población (CURP)"
                    id="curp"
                    size="lg"
                    maxLength={18}
                    ref={this.curpRef}
                    invalid={!this.state.curpIsValid}
                    onChange={this.isCurpValid}
                    invalidText="Ingrese los 18 cáracteres de la CURP"
                    required
                />
                <DatePicker 
                    datePickerType="single" 
                    maxDate={maxBirthdate}
                    minDate={minBirthdate}
                    dateFormat="d/m/Y"
                    locale="es"
                    ref={this.birthdateRef}
                >
                    <DatePickerInput
                        id="birthdate"
                        labelText="Fecha de Nacimiento"
                        placeholder="dd/mm/yyyy"
                        size="lg"
                        required 
                    />
                </DatePicker>
                <TextInput
                    labelText="Registro Federal de Contribuyentes (RFC)"
                    id="rfc"
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
                    id="income"
                    size="lg"
                    placeholder="$"
                    ref={this.incomeRef}
                    step={1000}
                    invalidText="Ingrese un valor númerico mayor a 0"
                    min={1000}
                    helperText="Expresado en Pesos Mexicanos (MXN)"
                    required
                />
                <Checkbox  
                    labelText="Tiene tarjeta de crédito"
                    id="has_credit" 
                    checked={this.state.hasCredit}
                    onChange={()=>{this.setState({hasCredit: !this.state.hasCredit})}}
                />
            </FormGroup>
        );
    }
}

export default ClientGeneralDataInput;