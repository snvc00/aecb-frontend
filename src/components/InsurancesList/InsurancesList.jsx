import {
    StructuredListWrapper,
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListCell,
} from "carbon-components-react";

const InsurancesList = props => {
    return (
        <StructuredListWrapper>
            <StructuredListHead>
                <StructuredListRow head>
                    <StructuredListCell head>Name</StructuredListCell>
                    <StructuredListCell head>Description</StructuredListCell>
                    <StructuredListCell head>Max Protection</StructuredListCell>
                </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
                {
                    props.insurances.map(insurance => (
                        <StructuredListRow key={insurance.id}>
                            <StructuredListCell>
                                {insurance.name}
                            </StructuredListCell>
                            <StructuredListCell>
                                {insurance.description}
                            </StructuredListCell>
                            <StructuredListCell>
                                ${insurance.max_protection} DLLS
                            </StructuredListCell>
                        </StructuredListRow>
                    ))
                }
            </StructuredListBody>
        </StructuredListWrapper>
    );
}

export default InsurancesList;