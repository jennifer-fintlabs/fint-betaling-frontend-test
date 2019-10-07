import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import PaymentIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Chip from '@material-ui/core/Chip';
import {Box, makeStyles, Typography} from "@material-ui/core";
import {updateRecipients, updateStep} from "../../../../data/redux/actions/payment";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
    },
    chipBox: {
        flexDirection: "row",
        alignContent: "center",
    },
    chip: {
        flexDirection: "row",
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
}));

const RecipientList = () => {
    const classes = useStyles();
    const recipientList = useSelector(state => state.payment.payment.recipients);
    const dispatch = useDispatch();

    function countRecipients(recipientList) {
        let count = 0;
        const keys = Object.keys(recipientList);
        keys.map(key => {
            if (recipientList[key].checked)
                count++;
        })
        return count;
    };

    function handleDelete(key, label) {

        if (countRecipients(recipientList) < 2) {
            dispatch(updateStep(0));
        }
        const newArray = {...recipientList};
        newArray[key] = {"checked": false, "name": label};
        dispatch(updateRecipients(newArray))
    }

    const recipientHeaderText = countRecipients(recipientList) > 0 ?
        <Typography variant="h6">Mine mottakere:</Typography> : "";
    const recipientCountText = countRecipients(recipientList) > 0 ?
        <Typography variant="h7">Antall: {countRecipients(recipientList)}</Typography> : "";

    let recipientListKeys = Object.keys(recipientList);
    if (recipientList && Object.keys(recipientList).length > 0) {
        return (
            <div className={classes.root}>
                {recipientHeaderText}
                <Box className={classes.chipBox}>
                    {
                        recipientListKeys.map(key => {
                                if (recipientList[key].checked) {
                                    return (
                                        <Chip
                                            size="small"
                                            key={key}
                                            value={key}
                                            onDelete={() => handleDelete(key, recipientList[key].name)}
                                            icon={PaymentIcon}
                                            label={recipientList[key].name}
                                            className={classes.chip}
                                        >
                                        </Chip>
                                    )
                                }
                            }
                        )
                    }
                </Box>
                    {recipientCountText}
            </div>
        );
    } else {
        return <div/>
    }
};

export default RecipientList;