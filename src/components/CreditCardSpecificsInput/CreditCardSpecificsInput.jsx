import {
    FormGroup,
    ComboBox,
    FileUploader,
    MultiSelect,
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

class CreditCardSpecificsInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: creditCategories[0],
            promotions: null,
            insurances: null,
            image: null,
            selectedPromotions: [],
            selectedInsurances: []
        }

        this.getCreditCardSpecifics = this.getCreditCardSpecifics.bind(this);
        this.updateSelectedPromotions = this.updateSelectedPromotions.bind(this);
        this.updateSelectedInsurances = this.updateSelectedInsurances.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    componentDidMount() {
        Promise.all([
            fetch(`${process.env.REACT_APP_BACKEND_API}/api/promotions/`).then(res => res.json()),
            fetch(`${process.env.REACT_APP_BACKEND_API}/api/insurances/`).then(res => res.json())
        ])
        .then(([promotions, insurances]) => {
            this.setState({
                promotions: promotions,
                insurances: insurances
            });
        })
        .catch(error => console.log(error));
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
            image: this.state.image,
            promotions: this.state.selectedPromotions,
            insurances: this.state.selectedInsurances
        }
    }

    updateSelectedPromotions({ selectedItems }) {
        console.log(selectedItems);
        this.setState({ selectedPromotions: selectedItems });
    }

    updateSelectedInsurances({ selectedItems }) {
        console.log(selectedItems);
        this.setState({ selectedInsurances: selectedItems });
    }

    updateImage({ target }) {
        this.setState({ image: target.files[0] });
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
                <FileUploader
                    id="image"
                    accept={[
                        '.jpg',
                        '.png'
                    ]}
                    buttonKind="secondary"
                    buttonLabel="Cargar imagen"
                    filenameStatus="edit"
                    iconDescription="Remover"
                    labelDescription="Solo archivos .jpg o .png"
                    labelTitle="Imagen de la Tarjeta"
                    onChange={this.updateImage}
                />
                <MultiSelect
                    id="promotions"
                    items={this.state.promotions || []}
                    itemToString={(promotion) => (promotion.name)}
                    titleText="Promociones"
                    label="Selecciona las promociones que apliquen"
                    onChange={this.updateSelectedPromotions}
                />
                <MultiSelect
                    id="insurances"
                    items={this.state.insurances || []}
                    itemToString={(insurance) => (insurance.name)}
                    titleText="Seguros"
                    label="Selecciona los seguros que apliquen"
                    onChange={this.updateSelectedInsurances}
                />
            </FormGroup>
        );
    }
}

export default CreditCardSpecificsInput;