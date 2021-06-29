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
            birthdate: `${birthdate[2]}-${birthdate[0]}-${birthdate[1]}`, // Send birthdate in YYYY-MM-DD format
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
                    labelText="First Name"
                    id="firstname"
                    size="lg"
                    maxLength={40}
                    invalidText="Campo Requerido"
                    ref={this.firstnameRef}
                    required
                />
                <TextInput
                    labelText="Last Name"
                    id="lastname"
                    size="lg"
                    maxLength={40}
                    ref={this.lastnameRef}
                    required
                />
                <TextInput
                    labelText="Email"
                    id="email"
                    type="email"
                    size="lg"
                    maxLength={60}
                    ref={this.emailRef}
                    required
                />
                <TextInput
                    labelText="CURP"
                    id="curp"
                    size="lg"
                    maxLength={18}
                    ref={this.curpRef}
                    invalid={!this.state.curpIsValid}
                    onChange={this.isCurpValid}
                    invalidText="CURP requires 18 characters"
                    required
                />
                <DatePicker 
                    datePickerType="single" 
                    maxDate={maxBirthdate}
                    minDate={minBirthdate}
                    dateFormat="m/d/Y"
                    locale="en"
                    ref={this.birthdateRef}
                >
                    <DatePickerInput
                        id="birthdate"
                        labelText="Birthdate"
                        placeholder="mm/dd/yyyy"
                        size="lg"
                        required 
                    />
                </DatePicker>
                <TextInput
                    labelText="RFC"
                    id="rfc"
                    size="lg"
                    maxLength={13}
                    ref={this.rfcRef}
                    invalid={!this.state.rfcIsValid}
                    onChange={this.isRfcValid}
                    invalidText="CURP requires between 12 and 13 characters"
                    required
                />
                <NumberInput
                    label="Monthly Income"
                    id="income"
                    size="lg"
                    placeholder="$"
                    ref={this.incomeRef}
                    step={1000}
                    invalidText="That values is not in the accepted range"
                    min={1000}
                    helperText="In US Dollar"
                    required
                />
                <Checkbox  
                    labelText="Has Credit Card"
                    id="has_credit" 
                    checked={this.state.hasCredit}
                    onChange={()=>{this.setState({hasCredit: !this.state.hasCredit})}}
                />
            </FormGroup>
        );
    }
}

export default ClientGeneralDataInput;