import {
    FormGroup,
    TextInput,
    TextArea,
    DatePicker,
    DatePickerInput,
} from "carbon-components-react";

import {
    createRef,
    Component
} from "react";


class PromotionInput extends Component {
    constructor(props) {
        super(props);

        this.getPromotion = this.getPromotion.bind(this);

        this.nameRef = createRef();
        this.descriptionRef = createRef();
        this.validUntilRef = createRef();
    }

    getPromotion() {
        const date = this.validUntilRef.current.inputField.value.split("/");
        return {
            name: this.nameRef.current.value,
            description: this.descriptionRef.current.value,
            valid_until: `${date[2]}-${date[1]}-${date[0]}`, // Send date in YYYY-MM-DD format,
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
                    defaultValue={this.props.promotion ? this.props.promotion.name : ""}
                    maxLength={50}
                    required
                />
                <TextArea
                    labelText="Descripción"
                    id="description"
                    ref={this.descriptionRef}
                    maxLength={300}
                    defaultValue={this.props.promotion ? this.props.promotion.description : ""}
                    required
                />
                <DatePicker
                    datePickerType="single"
                    minDate="today"
                    dateFormat="d/m/Y"
                    locale="es"
                    ref={this.validUntilRef}
                    value={this.props.promotion ? this.props.promotion.valid_until : "today"}
                >
                    <DatePickerInput
                        id="valid_until"
                        labelText="Válido hasta"
                        placeholder="dd/mm/yyyy"
                        size="lg"
                        required
                    />
                </DatePicker>
            </FormGroup>
        );
    }
}

export default PromotionInput;