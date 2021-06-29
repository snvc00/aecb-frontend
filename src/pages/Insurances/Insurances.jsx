import Header from "../../components/Header";
import {
    Grid,
    Row,
    Column,
    StructuredListSkeleton,
    ComboBox,   
} from "carbon-components-react";
import InsurancesList from "../../components/InsurancesList";

import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { useState, useEffect } from "react";

const Insurances = () => {
    const [cards, setCards] = useState();
    const [cardInsurances, setCardInsurances] = useState();
    const [selectedCard, setSelectedCard] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/cards/`)
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setCards(data);
                let cardInsurancesTemp = {};

                data.forEach(card => {
                    cardInsurancesTemp[card.name] = card.insurances;
                });

                setCardInsurances(cardInsurancesTemp);
                setSelectedCard(cardInsurancesTemp[Object.keys(cardInsurancesTemp)[0]]);
            }
        })
        .catch(error => console.log(error));
    }, []);

    const updateSelectedCard = ({ selectedItem }) => {
        setSelectedCard(cardInsurances[selectedItem.name]);
    }

    return (
        <>
            <Helmet>
                <title>National Bank | Insurances</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <MainHeading>Insurances</MainHeading>
                        <ComboBox
                        id="cards"
                        items={cards}
                        itemToString={(card) => (card.name)}
                        onChange={updateSelectedCard}
                        placeholder="Search credit card"
                        titleText="Credit Cards"
                        helperText="Pick a credit card to see their insurances."
                    />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {
                            selectedCard ?

                                <InsurancesList insurances={selectedCard} />

                                :

                                <StructuredListSkeleton rowCount={5} />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default Insurances;