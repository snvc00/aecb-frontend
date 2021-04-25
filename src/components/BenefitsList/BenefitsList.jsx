import {
    StructuredListWrapper,
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListCell,
} from "carbon-components-react";

const BenefitsList = props => {
    return (
        <StructuredListWrapper>
            <StructuredListHead>
                <StructuredListRow head>
                    <StructuredListCell head>Descripción</StructuredListCell>
                    <StructuredListCell head>Vigencia</StructuredListCell>
                </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
                {
                    props.benefits.map(benefit => (
                        <StructuredListRow>
                            <StructuredListCell>
                                {benefit.description}
                            </StructuredListCell>
                            <StructuredListCell>
                                {benefit.validUntil}
                            </StructuredListCell>
                        </StructuredListRow>
                    ))
                }
            </StructuredListBody>
        </StructuredListWrapper>
    );
}

export default BenefitsList;