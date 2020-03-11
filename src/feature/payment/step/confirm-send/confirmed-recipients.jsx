import React from 'react';
import {
    Box, makeStyles, Table, Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme) => ({
    tableWrapper: {
        maxHeight: 200,
        overflow: 'auto',
    },
    table: {
        overflow: 'auto',
    },
    recipientHeader: {
        textAlign: 'left',
        color: theme.palette.secondary.main,
    },
}));

const ConfirmedRecipients = () => {
    const classes = useStyles();
    const recipients = useSelector((state) => state.payment.payment.recipients);

    return (
        <Box p={2} width="inherit">
            <Typography variant="h6" className={classes.recipientHeader}>
                Mottakere
            </Typography>
            <div className={classes.tableWrapper}>
                <Table className={classes.table} stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Navn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(recipients)
                                .filter((key) => recipients[key].checked)
                                .map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>{recipients[key].name}</TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </div>
        </Box>
    );
};

export default ConfirmedRecipients;
