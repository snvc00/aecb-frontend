import Header from "../../components/Header";
import {
    Grid,
    Row,
    Column,
    StructuredListSkeleton,
} from "carbon-components-react";
import BenefitsList from "../../components/BenefitsList";

import { Helmet } from 'react-helmet'
import MainHeading from "../../components/MainHeading";
import { useState } from "react";

const Benefits = () => {
    const [ benefits, setBenefits ] = useState();

    setTimeout(()=>{
        setBenefits([{
            id: "0",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.",
            validUntil: "04/02/2022",
        },
        {
            id: "1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.",
            validUntil: "04/02/2021",
        },
        {
            id: "2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.",
            validUntil: "04/02/2023",
        }]);
    }, 2000);

    return (
        <>
            <Helmet>
                <title>Banco Nacional | Beneficios</title>
            </Helmet>
            <Header />
            <Grid className="spaced top">
                <Row>
                    <Column>
                        <MainHeading>Beneficios</MainHeading>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        {
                            benefits !== undefined ?

                                <BenefitsList benefits={benefits} />

                                :

                                <StructuredListSkeleton rowCount={5} />
                        }
                    </Column>
                </Row>
            </Grid>
        </>
    );
}

export default Benefits;