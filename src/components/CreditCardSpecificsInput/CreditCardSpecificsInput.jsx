import {
    FormGroup,
    TextInput,
    ComboBox,
} from "carbon-components-react";

import {
    Component,
    createRef,
} from "react";

const creditCategories = [
    "Bronce",
    "Plata",
    "Oro",
    "Diamante"
];

class CreditCardGenericInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: creditCategories[0],
        }

        this.getCreditCardSpecifics = this.getCreditCardSpecifics.bind(this);

        this.imageRef = createRef();
    }

    getCreditCardSpecifics() {
        const tierTranslations = {
            Bronce: 1,
            Plata: 2,
            Oro: 3,
            Diamante: 4
        };

        return {
            tier: parseInt(tierTranslations[this.state.selectedCategory]),
            image: this.imageRef.current.value,
        }
    }

    render() {
        return (
            <FormGroup legendText={<h4>Datos Específicos</h4>}>
                <ComboBox
                    titleText="Categoría"
                    onChange={({ selectedItem }) => { this.setState({ selectedCategory: selectedItem }); }}
                    selectedItem={this.state.selectedCategory}
                    id="category"
                    size="lg"
                    items={creditCategories}
                    placeholder="Filtrar"
                />
                <TextInput
                    labelText="Enlace a Imagen"
                    id="image"
                    size="lg"
                    ref={this.imageRef}
                    maxLength={50}
                    required
                />
            </FormGroup>
        );
    }
}

export default CreditCardGenericInput;