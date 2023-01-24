import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import './index.css'
import MenuItem from '@material-ui/core/MenuItem';
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020,
        "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1) !important",
            padding: "0px"
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },

});


class UpdateConsumptionInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customRow: []
        };
    }


    render() {

        const { classes } = this.props;
        return (
            <div>
                <Grid container justify="center">


                    <Paper style={{ maxWidth: '100%', overflowX: 'scroll' }}>
                        <Grid item xs={12} sm={12} md={12} style={{ paddingLeft: "0" }}>
                            <Table aria-label="simple table" className={classes.table}>
                                <TableHead style={{ backgroundColor: '#474386d6' }}>
                                    <TableRow>
                                        <TableCell>Portion Location/Description/Unit C1a</TableCell>
                                        <TableCell>It is already acceseed in the manner as is being mentioned here C1aa</TableCell>
                                        <TableCell>Base unit Area Value(Rs.) C1b</TableCell>
                                        <TableCell>Covered Space(Sq. Ft.) C1c</TableCell>
                                        <TableCell>Age M factor C1d</TableCell>
                                        <TableCell>Sturcture M Factor C1e</TableCell>
                                        <TableCell>Usage M Factor C1f</TableCell>
                                        <TableCell>Location M Factor C1g</TableCell>
                                        <TableCell>Occupancy M Factor C1h</TableCell>
                                        <TableCell>Annual Value(Rs.) C1i</TableCell>
                                        <TableCell>Aquiring Rent,if any,including Maintenance/Service Charges(Rs.) C1j</TableCell>

                                        {/* <TableCell>Actions</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>

                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                placeholder="Consumed Quantity"
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell>

                                            <TextField
                                                id="select-currency-native"
                                                select
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={() => { alert('hi') }}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                placeholder="Consumed Quantity"
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                placeholder="Consumed Quantity"
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                id="select-currency-native"
                                                select
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={() => { alert('hi') }}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                id="select-currency-native"
                                                select
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={() => { alert('hi') }}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                id="select-currency-native"
                                                select
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={() => { alert('hi') }}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                id="select-currency-native"
                                                select
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={() => { alert('hi') }}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                id="select-currency-native"
                                                select
                                                className={classes.textField}
                                                value={this.state.currency}
                                                onChange={() => { alert('hi') }}
                                                SelectProps={{
                                                    native: true,
                                                    MenuProps: {
                                                        className: classes.menu,
                                                    },
                                                }}
                                                margin="normal"
                                            >
                                                {currencies.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                placeholder="Consumed Quantity"
                                                size="small"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                placeholder="Consumed Quantity"
                                                size="small"
                                            />
                                        </TableCell>

                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Grid>
                    </Paper>

                </Grid>


            </div>
        );
    }
}

export default withStyles(styles)(UpdateConsumptionInfo);

