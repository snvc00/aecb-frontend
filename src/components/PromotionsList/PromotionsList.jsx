import {
    StructuredListWrapper,
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListCell,
} from "carbon-components-react";

const PromotionsList = props => {
    return (
        <StructuredListWrapper>
            <StructuredListHead>
                <StructuredListRow head>
                    <StructuredListCell head>Name</StructuredListCell>
                    <StructuredListCell head>Description</StructuredListCell>
                    <StructuredListCell head>Valid Until</StructuredListCell>
                </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
                {
                    props.promotions.map(promotion => (
                        <StructuredListRow key={promotion.id}>
                            <StructuredListCell>
                                {promotion.name}
                            </StructuredListCell>
                            <StructuredListCell>
                                {promotion.description}
                            </StructuredListCell>
                            <StructuredListCell>
                                {promotion.valid_until}
                            </StructuredListCell>
                        </StructuredListRow>
                    ))
                }
            </StructuredListBody>
        </StructuredListWrapper>
    );
}

export default PromotionsList;