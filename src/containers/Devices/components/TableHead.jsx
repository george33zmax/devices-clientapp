import React, { PureComponent } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const rows = [
  {
    id: 'type', disablePadding: false, label: 'Type',
  },
  {
    id: 'system_name', disablePadding: false, label: 'System Name',
  },
  {
    id: 'hdd_capacity', disablePadding: false, label: 'HDD Capacity',
  },
];

class TableHeadDevices extends PureComponent {

  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick, order, orderBy, numSelected, rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              className={`material-table__checkbox ${numSelected === rowCount && 'material-table__checkbox--checked'}`}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => (
            <TableCell
              className="material-table__cell material-table__cell--sort material-table__cell-right"
              key={row.id}
              align="left"
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={this.createSortHandler(row.id)}
                className="material-table__sort-label"
                dir="ltr"
              >
                {row.label}
              </TableSortLabel>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeadDevices;
