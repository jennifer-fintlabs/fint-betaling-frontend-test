import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { updateRecipients, updateSearchPage } from '../../../../data/redux/actions/payment';
import Pagination from '../../../../common/pagination';
import EnhancedTableToolbar from './CustomToolbar';

const useStyles = makeStyles(() => ({
    table: {
        overflow: 'auto',
        minWidth: '100%',
        maxWidth: '100%',
    },
    tableCell: {
        overflow: 'auto',
        wordWrap: 'break-word',
    },
    tableCellName: {
        minWidth: '30%',
        maxWidth: '30%',
        overflow: 'auto',
        wordWrap: 'break-word',
    },
    tableCellEmail: {
        minWidth: '30%',
        maxWidth: '30%',
        overflow: 'auto',
        wordWrap: 'break-word',
    },
    tableCellNoPadding: {
        paddingTop: 0,
        paddingBottom: 0,
    },

}));

const IndividualTable = () => {
    const query = useSelector((state) => state.payment.form.searchValue);
    const suggestions = useSelector((state) => state.payment.form.filteredSuggestions);
    const recipients = useSelector((state) => state.payment.payment.recipients);
    const activePage = useSelector((state) => state.payment.form.page);
    const suggestionsLength = useSelector((state) => state.payment.form.suggestionLength);
    // const suggestionsLength = query.length === 0 ? 0 : suggestionLengthTemp;
    // suggestions = query.length === 0 ? [] : suggestions;
    const classes = useStyles();
    const dispatch = useDispatch();

    function handleIndividualCheck(event, email, cellPhoneNumber, addressLine, addressZip, addressPlace) {
        const newArray = { ...recipients };
        newArray[event.target.value] = {
            checked: event.target.checked,
            name: event.target.name,
            email,
            cellPhoneNumber,
            addressLine,
            addressZip,
            addressPlace,
        };
        dispatch(updateRecipients(newArray));
    }

    const handleChangePage = (event, newPage) => {
        dispatch(updateSearchPage(newPage));
    };

    return (
        <Box>
            <EnhancedTableToolbar />

            <Table className={classes.table} size="small">

                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCellName}>
                            Navn
                            {suggestionsLength}
                        </TableCell>
                        <TableCell align="center" className={classes.tableCell}>Velg</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        suggestions
                            .slice(activePage * 10, activePage * 10 + 10)
                            .map(
                                (suggestion) => {
                                    const recipient = suggestion.name;
                                    const matches = match(recipient, query);
                                    const parts = parse(recipient, matches);

                                    return (
                                        <TableRow hover key={suggestion.id}>
                                            <TableCell align="left" className={classes.tableCellName}>
                                                {parts.map((part) => (
                                                    <span
                                                        key={part.text}
                                                        style={{ fontWeight: part.highlight ? 500 : 400 }}
                                                    >
                                                        {part.text}
                                                    </span>
                                                ))}
                                            </TableCell>
                                            <TableCell align="center" className={classes.tableCell}>
                                                <Checkbox
                                                    checked={recipients[suggestion.id]
                                                        ? recipients[suggestion.id].checked
                                                        : false}
                                                    onChange={(event) => handleIndividualCheck(
                                                        event,
                                                        suggestion.email || '',
                                                        suggestion.mobile || '',
                                                        suggestion.postalAddress || '',
                                                        suggestion.postalCode || '',
                                                        suggestion.city || '',
                                                    )}
                                                    name={suggestion.name}
                                                    value={suggestion.id}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                },
                            )
                    }
                </TableBody>
            </Table>
            <Pagination
                activePage={activePage}
                suggestionsLength={suggestionsLength}
                handleChangePage={handleChangePage}
            />
        </Box>
    );
};

export default IndividualTable;
