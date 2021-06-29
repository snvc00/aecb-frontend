import {
    DataTable,
    TableContainer,
    TableToolbar,
    TableBatchActions,
    TableBatchAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableHead,
    TableRow,
    TableExpandHeader,
    TableHeader,
    Table,
    TableBody,
    TableCell,
    TableSelectRow,
    Pagination,
} from "carbon-components-react";

import {
    UserCertification32 as UserCertification,
} from "@carbon/icons-react";

import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

const headers = [
    {
        key: "id",
        header: "ID",
    },
    {
        key: "name",
        header: "Name",
    },
    {
        key: "description",
        header: "Description",
    },
    {
        key: "valid_until",
        header: "Valid Until",
    },
    {
        key: "last_update",
        header: "Última Actualización",
    },
];

var translationKeys = {
    'carbon.table.batch.cancel': 'Cancel',
    'carbon.table.batch.items.selected': 'promotions selected',
    'carbon.table.batch.item.selected': 'promotion selected'
};

const PromotionsInfoTable = (props) => {
    const [itemBegin, setItemBegin] = useState(0);
    const [itemEnd, setItemEnd] = useState(10);
    let history = useHistory();

    const handleBatchActionClickUpdatePromotion = (selectedRows) => {
        const id = selectedRows[0].cells[0].value;

        const location = {
            pathname: `/promotions/update/${id}`,
            state: {
                promotion: {
                    name: selectedRows[0].cells[1].value,
                    description: selectedRows[0].cells[2].value,
                    valid_until: selectedRows[0].cells[3].value
                }
            }
        }

        history.push(location);
    }

    const customTranslationForTableBatchActions = (id, state) => {
        if (id === 'carbon.table.batch.cancel') {
            return translationKeys[id];
        }
        return `${state.totalSelected} ${translationKeys[id]}`;
    }

    const handlePageChange = pagination => {
        setItemBegin(pagination.pageSize * (pagination.page - 1));
        setItemEnd(pagination.page * pagination.pageSize);
    }

    return (
        <DataTable
            isSortable
            rows={props.promotions.slice(itemBegin, itemEnd)}
            headers={headers}
            {...props}
            render={({
                rows,
                headers,
                getHeaderProps,
                getSelectionProps,
                getToolbarProps,
                getBatchActionProps,
                getRowProps,
                onInputChange,
                selectedRows,
                getTableProps,
                getTableContainerProps,
            }) => (
                <>
                    <TableContainer
                        title="Registered Promotions"
                        description="Selelect a promotions to see the options."
                        {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()} translateWithId={customTranslationForTableBatchActions}>
                                <TableBatchAction
                                    renderIcon={UserCertification}
                                    iconDescription="Update Promotion"
                                    onClick={() => { handleBatchActionClickUpdatePromotion(selectedRows) }}>
                                    Update Promotion
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} placeholder="Search promotion" />
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    <TableExpandHeader />
                                    {headers.map((header, i) => (
                                        <TableHeader key={i} {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Fragment key={row.id}>
                                        <TableRow {...getRowProps({ row })}>
                                            <TableSelectRow {...getSelectionProps({ row })} />
                                            {row.cells.map((cell) => (
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                            ))}
                                        </TableRow>
                                    </Fragment>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination
                            backwardText="Backward"
                            forwardText="Forward"
                            itemsPerPageText="Promotions per page:"
                            page={1}
                            pageNumberText="Page"
                            pageSize={10}
                            pageSizes={[
                                10,
                                25,
                                50,
                            ]}
                            onChange={handlePageChange}
                            totalItems={props.promotions.length}
                        />
                    </TableContainer>
                    <br /><br /><br />
                </>
            )}
        />
    );

}

export default PromotionsInfoTable;