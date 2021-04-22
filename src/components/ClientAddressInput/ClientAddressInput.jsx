import {
    FormGroup,
    TextInput,
    ComboBox,
} from "carbon-components-react";

import {
    Component,
    createRef,
} from "react";

import { states } from "../../assets/json/mexico.json";

class ClientAddressInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedState: "",
        }

        this.getAddress = this.getAddress.bind(this);

        this.addressRef = createRef();
        this.neighborhoodRef = createRef();
        this.cityRef = createRef();
    }

    getAddress() {
        return {
            address: this.addressRef.current.value,
            neighborhood: this.neighborhoodRef.current.value,
            state: this.state.selectedState,
            city: this.cityRef.current.value,
        }
    }

    render() {
        return (
            <FormGroup legendText={<h4>Dirección</h4>}>
                <TextInput
                    labelText="Calle y Número"
                    id="address"
                    size="lg"
                    ref={this.addressRef}
                    maxLength={50}
                    required
                />
                <TextInput
                    labelText="Colonia"
                    id="neighborhood"
                    size="lg"
                    ref={this.neighborhoodRef}
                    maxLength={30}
                    required
                />
                <ComboBox
                    titleText="Estado"
                    ref={this.stateRef}
                    onChange={({ selectedItem })=>{ this.setState({ selectedState: selectedItem }); }}
                    selectedItem={this.state.selectedState}
                    id="state"
                    size="lg"
                    items={states}
                    itemToString={(state) => state}
                    placeholder="Filtrar"
                />
                <TextInput
                    labelText="Ciudad"
                    id="city"
                    size="lg"
                    ref={this.cityRef}
                    maxLength={20}
                />
            </FormGroup>
        );
    }
}

export default ClientAddressInput;