import Header from "../../components/Header";
import {
    Grid,
    Row,
    Column,
    StructuredListSkeleton,
    ComboBox,   
} from "carbon-components-react";
import PromotionsList from "../../components/PromotionsList";

import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { useState } from "react";
import { useEffect } from "react";

const Promotions = () => {
    const [cards, setCards] = useState();
    const [cardPromotions, setCardPromotions] = useState();
    const [selectedCard, setSelectedCard] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/api/cards/`)
        .then(async (response) => ({ data: await response.json(), responseOk: response.ok }))
        .then(({ data, responseOk }) => {
            if (responseOk) {
                setCards(data);
                let cardPromotionsTemp = {};

                data.forEach(card => {
                    cardPromotionsTemp[card.name] = card.promotions;
                });

                setCardPromotions(cardPromotionsTemp);
                setSelectedCard(cardPromotionsTemp[Object.keys(cardPromotionsTemp)[0]]);
            }
        })
        .catch(error => console.log(error));
    }, []);

    const updateSelectedCard = ({ selectedItem }) => {
        setSelectedCard(cardPromotions[selectedItem.name]);
    }

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Promociones</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <MainHeading>Promociones</MainHeading>
                        <ComboBox
                            id="cards"
                            items={cards}
                            itemToString={(card) => (card.name)}
                            onChange={updateSelectedCard}
                            placeholder="Buscar tarjeta"
                            titleText="Tarjetas de Crédito"
                            helperText="Selecciona una tarjeta para mostrar sus promociones."
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {
                            selectedCard ?

                                <PromotionsList promotions={selectedCard} />

                                :

                                <StructuredListSkeleton rowCount={5} />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default Promotions;