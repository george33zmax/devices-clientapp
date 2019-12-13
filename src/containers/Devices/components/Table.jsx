import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import TableHead from './TableHead';
import TableToolbar from './TableToolbar';

function getSorting(order, orderBy) {
  const capacity = orderBy === 'hdd_capacity';
  if (order === 'desc') {
    return (a, b) => {
      a = capacity ? Number(a[orderBy]) : a[orderBy];
      b = capacity ? Number(b[orderBy]) : b[orderBy];
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    };
  }
  return (a, b) => {
    a = capacity ? Number(a[orderBy]) : a[orderBy];
    b = capacity ? Number(b[orderBy]) : b[orderBy];
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  };
}

export default class TableDevices extends PureComponent {
  state = {
    order: 'desc',
    orderBy: 'type',
    selected: new Map([]),
    data: [],
    page: 0,
    rowsPerPage: 5,
    selectedData: {},
  };

  async componentDidMount() {
    this.loadRestData();
  }

  loadRestData = async (returnData = false) => {
    const resData = (await axios.get('http://localhost:3000/devices')).data;
    if (!returnData) {
      this.setState({ data: resData });
    } else {
      return resData;
    }
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === 'desc') { order = 'asc'; }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      const { data } = this.state;
      const newSelected = new Map();
      data.map(n => newSelected.set(n.id, true));
      this.setState({ selected: newSelected });
      return;
    }
    this.setState({ selected: new Map([]) });
  };

  handleClick = (event, ele) => {
    const { selected, data } = this.state;
    const newSelected = new Map(selected);
    const value = newSelected.get(ele.id);
    let isActive = true;
    if (value) {
      isActive = false;
    }
    newSelected.set(ele.id, isActive);
    const numSelected = [...newSelected].filter(el => el[1]).length;
    let selectedData = null;
    if (numSelected === 1) {
      const getSelectedId = (valueMap, key) => {
        if (valueMap) {
          data.forEach((eleData) => {
            if (eleData.id === key) {
              selectedData = eleData;
            }
          });
        }
      };
      newSelected.forEach(getSelectedId);
      this.setState({ selectedData });
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteSelected = () => {
    const { selected } = this.state;
    const deleteElements = async (value, key) => {
      await axios.delete(`http://localhost:3000/devices/${key}`);
      this.loadRestData();
    };
    selected.forEach(deleteElements);
  };

  handleAddEdit = async (data, edit) => {
    if (edit) {
      await axios.put(`http://localhost:3000/devices/${data.id}`, {
        system_name: data.name,
        type: data.type,
        hdd_capacity: data.capacity,
      });
      this.loadRestData();
    } else {
      await axios.post('http://localhost:3000/devices', {
        system_name: data.name,
        type: data.type,
        hdd_capacity: data.capacity,
      });
      this.loadRestData();
    }
  };

  handleFilter = async (event, property) => {
    if (property === 'all') {
      this.loadRestData();
    } else {
      const serverData = await this.loadRestData(true);
      const newData = [];
      serverData.forEach((ele) => {
        if (ele.type === property) {
          newData.push(ele);
        }
      });
      this.setState({ data: newData });
      console.log('property', property);
    }
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return !!selected.get(id);
  };

  render() {
    const {
      data, order, orderBy, selected, rowsPerPage, page, selectedData,
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Manage Devices</h5>
            </div>
            <div className="table__icons">
              <TableToolbar
                numSelected={[...selected].filter(el => el[1]).length}
                selectedData={selectedData}
                handleDeleteSelected={this.handleDeleteSelected}
                onRequestSort={this.handleRequestSort}
                handleFilter={this.handleFilter}
                handleAddEdit={this.handleAddEdit}
              />
            </div>
            <div className="material-table__wrap">
              <Table className="material-table">
                <TableHead
                  numSelected={[...selected].filter(el => el[1]).length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                    .map((d) => {
                      const isSelected = this.isSelected(d.id);
                      return (
                        <TableRow
                          className="material-table__row"
                          role="checkbox"
                          onClick={event => this.handleClick(event, d)}
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={d.id}
                          selected={isSelected}
                        >
                          <TableCell className="material-table__cell" padding="checkbox">
                            <Checkbox checked={isSelected} className="material-table__checkbox" />
                          </TableCell>
                          <TableCell
                            className="material-table__cell material-table__cell-right"
                          >{d.type}
                          </TableCell>
                          <TableCell
                            className="material-table__cell material-table__cell-right"
                          >{d.system_name}
                          </TableCell>
                          <TableCell
                            className="material-table__cell material-table__cell-right"
                          >{d.hdd_capacity}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              className="material-table__pagination"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              dir="ltr"
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
