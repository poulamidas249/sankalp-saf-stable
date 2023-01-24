
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = (theme) => ({
    contain: {
        paddingLeft: "2rem",
        paddingRight: "2rem"
    },
    mainGrid: {
        backgroundColor: "#EAEAEA",
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap"
    },
    font: {
        fontWeight: 500,
        // padding: '0.5rem 0.5rem 0.5rem 0rem',
        textAlign: "initial"
    },
    fontPadding: {
        // padding: '0.5rem 0.5rem 0.5rem 0rem',
        textAlign: "initial",
        overflow: "auto"
    },
    grid: {
        paddingBottom: "1rem",
        paddingTop: "1rem",
        paddingRight: "1.5rem"
    },
    borders: {
        border: "2px solid #707070",
        display: "flex",
        width: "1.6rem",
        backgroundColor: "grey"
    },
    table: {
        minWidth: 650
    }
});

const things = [
    {
        material: "11231",
        type: "ROh",
        UOM: "IND"
    },
    {
        material: "65445",
        type: "VERp",
        UOM: "IND"
    },
    {
        material: "34123",
        type: "Test",
        UOM: "IND"
    }
];

const index = () => {
    return (
        <div>
            <React.Fragment>
                <Grid container justify="center" >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}

                    ></Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        style={{ paddingLeft: "0" }}
                    >
                        <Typography variant="h6" >
                            Batch Details
                        </Typography>
                        <span ></span>
                    </Grid>

                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Material Number</TableCell>
                                <TableCell>Material Desc</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Enter Batch Number</TableCell>
                                <TableCell>Enter Quantity</TableCell>
                                {/* <TableCell>Actions</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {things.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell>{row.material}</TableCell>
                                    <TableCell>{row.type}</TableCell>

                                    <TableCell>{row.UOM}</TableCell>

                                    <TableCell>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Batch Number"
                                            size="small"
                                        />

                                        <TableCell>
                                            <div style={{ paddingBottom: "0.5rem" }}>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="File Type Batch"
                                                    style={{ right: "0.875rem" }}
                                                    size="small"
                                                // error={!this.state.customRowDescription[index]}
                                                />
                                            </div>

                                            {/* {this.state.customRow.map((newRow, index) => (  
                              
                              <div style={{ paddingBottom: "0.5rem" }}>
                              <TextField
                                variant="outlined"
                                placeholder="File Type Batch"
                                style={{ right: "0.875rem" }}
                                size="small"
                                // error={!this.state.customRowDescription[index]}
                              />
                            </div>                            
                            
                          ))} */}
                                        </TableCell>

                                    </TableCell>

                                    <TableCell>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Consumed Quantity"
                                            size="small"
                                        />

                                        <Tooltip title="Add Batch" placement="right-start">

                                        </Tooltip>

                                        <TableCell>
                                            <div style={{ paddingBottom: "0.5rem" }}>
                                                <TextField
                                                    variant="outlined"
                                                    placeholder="File Type Consumed"
                                                    style={{ right: "0.875rem" }}
                                                    size="small"
                                                // error={!this.state.customRowDescription[index]}
                                                />
                                            </div>
                                            {/* {this.state.customRow.map((newRow, index) => (
                            <div style={{ paddingBottom: "0.5rem" }}>
                              <TextField
                                variant="outlined"
                                placeholder="File Type Consumed"
                                style={{ right: "0.875rem" }}
                                size="small"
                                // error={!this.state.customRowDescription[index]}
                              />
                            </div>
                          ))} */}
                                        </TableCell>

                                    </TableCell>

                                    {/* <TableCell>
                      <Fab
                        size='small'
                        color='secondary'
                        aria-label='Upload File'
                        onClick={this.addCustomFile}
                      >
                        <AddIcon />
                      </Fab>
                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

                <Grid
                    container
                    style={{
                        paddingLeft: "2rem",
                        paddingTop: "2rem",
                        paddingBottom: "2rem"
                    }}
                >
                    <Grid item xs={12} sm={12} md={12}>
                        <button>Save Changes</button>
                    </Grid>
                </Grid>
            </React.Fragment>
        </div>
    )
}
export default withStyles(useStyles)(index)

