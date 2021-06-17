import {
    FormGroup,
    TextInput,
    ComboBox,
} from "carbon-components-react";

import {
    Component,
    createRef,
} from "react";

import { states } from "../../assets/json/Mexico.json";

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
            city: this.cityRef.current.value,
            state: this.state.selectedState,
        }
    }

    componentDidMount() {
        this.setState({ selectedState: this.props.client ? this.props.client.state : "" });
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
                    defaultValue={this.props.client ? this.props.client.address : ""}
                    required
                />
                <TextInput
                    labelText="Colonia"
                    id="neighborhood"
                    size="lg"
                    ref={this.neighborhoodRef}
                    maxLength={30}
                    defaultValue={this.props.client ? this.props.client.neighborhood : ""}
                    required
                />
                <TextInput
                    labelText="Ciudad"
                    id="city"
                    size="lg"
                    ref={this.cityRef}
                    maxLength={20}
                    defaultValue={this.props.client ? this.props.client.city : ""}
                    required
                />
                <ComboBox
                    titleText="Estado"
                    ref={this.stateRef}
                    onChange={({ selectedItem })=>{ this.setState({ selectedState: selectedItem }); }}
                    selectedItem={this.props.client ? this.props.client.state : ""}
                    id="state"
                    size="lg"
                    items={states}
                    itemToString={(state) => state}
                    placeholder="Filtrar"
                    required
                />
            </FormGroup>
        );
    }
}

export default ClientAddressInput;