import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

import get from "lodash/get";
import set from "lodash/set";
import { connect } from "react-redux";

let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'A1f', numeric: true, disablePadding: true, label: 'Base Unit Area Value (Rs.) A1f' },
  { id: 'A1ff', numeric: true, disablePadding: true, label: 'Is it already assessed A1ff' },
  { id: 'A1g', numeric: true, disablePadding: true, label: 'Vacant Land / Water Body Area for tax calculation A1g' },
  { id: 'A1h', numeric: true, disablePadding: true, label: 'Usage Multiplicative Factor A1h' },
  { id: 'A1i', numeric: true, disablePadding: true, label: 'Location Multiplicative Factor A1i' },
  { id: 'A1j', numeric: true, disablePadding: true, label: 'Occupancy Multiplicative Factor A1j' },
  { id: 'A1k', numeric: true, disablePadding: true, label: 'Annual Value(Rs.) A1k' },
];
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="none" align="center"
            style={{ color: "white", backgroundColor: "#474386e0", width: '10px', textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                align="center"
                style={{
                  color: "white", backgroundColor: "#474386e0", padding: '20px !important', textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px', fontStyle: 'italic'
                }}
                key={row.id}
                classes={classes}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.label}

              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, title, handleDelete } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : null
        }
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={handleDelete} />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {

    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paddingNone: {
    padding: "9px !important"
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'A1f',
    title: 'testTable',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
  };
  componentDidMount = () => {
    let tableData = []
    if (this.props.newLength !== this.state.data.length) {
      this.props.tableOneData.map((t, index) => {
        tableData[index] = { ...t, id: index + 1 }

      })
      this.setState({ data: tableData })
    }
  }
  componentDidUpdate = () => {
    let tableData = []
    if (this.props.tableData.length !== this.state.data.length) {
      this.props.tableData.map((t, index) => {
        tableData[index] = { ...t, id: index + 1 }

      })
      this.setState({ data: tableData })
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };
  handleDelete = () => {
    let newDataFilter = this.state.data

    if (this.state.selected.length > 0) {
      this.state.selected.map(s => {
        newDataFilter = newDataFilter.filter(t => t.id !== s)

      })
      this.setState({ selected: [] })
    }
    this.props.dispatch(prepareFinalObject("Saf[0].asseseDetail.formatDataOne", newDataFilter));
    this.props.dispatch(
      handleField(
        "apply",
        "components.div.children.formwizardThirdStep.children.safFormatATableOne.children.cardContent.children.FormatATableOne",
        "props.tableData",
        newDataFilter
      )
    )
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, title } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} handleDelete={this.handleDelete} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              classes={classes}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.length > 0 ? data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >

                      <TableCell padding="none" align="center"
                        style={{ width: '10px', textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }}>
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} component="th" scope="row" padding="none">
                        {n.A1f}
                      </TableCell>
                      <TableCell padding="none" align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} numeric>{n.A1ff}</TableCell>
                      <TableCell padding="none" align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} numeric>{n.A1g}</TableCell>
                      <TableCell padding="none" align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} numeric>{n.A1h}</TableCell>
                      <TableCell padding="none" align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} numeric>{n.A1i}</TableCell>
                      <TableCell padding="none" align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} numeric>{n.A1j}</TableCell>
                      <TableCell padding="none" align="center"
                        style={{ textAlign: "center", border: "1px solid rgba(224, 224, 224, 1)", fontSize: '11px' }} numeric>{n.A1k}</TableCell>
                    </TableRow>
                  );
                }) : <div style={{
                  textAlign: "center",
                  width: "226%",
                  fontSize: "15px",
                  fontWeight: "500",
                  padding: "10px"
                }}>No result to display</div>}

            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper >
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownprops) => {
  let tableOneData = get(
    state,
    "screenConfiguration.preparedFinalObject.Saf[0].asseseDetail.formatDataOne",
    []
  );
  let newLength = tableOneData.length
  return { tableOneData, newLength };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (path, value) =>
      dispatch(prepareFinalObject(path, value)),
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EnhancedTable));
