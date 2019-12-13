import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from 'mdi-react/FilterListIcon';
import SortIcon from 'mdi-react/SortIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Form from './FormDevices';

class TableFilterButton extends React.Component {

  state = {
    anchorEl: null,
    modal: false,
    sortState: true,
  };

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  handleClick = (event, sort) => {
    if (sort) {
      this.setState({ sortState: true });
    } else {
      this.setState({ sortState: false });
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSort = property => (event) => {
    const { sortState } = this.state;
    const { onRequestSort, handleFilter } = this.props;
    if (sortState) {
      handleFilter(event, property);
      this.handleClose();
    } else {
      onRequestSort(event, property);
      this.handleClose();
    }
  };

  render() {
    const { anchorEl, modal, sortState } = this.state;
    const { handleAddEdit } = this.props;
    const option1 = sortState ? 'MAC' : 'type';
    const option2 = sortState ? 'WINDOWS_SERVER' : 'system_name';
    const option3 = sortState ? 'WINDOWS_WORKSTATION' : 'hdd_capacity';
    return (
      <div>
        {/* Filter */}
        <IconButton
          className="material-table__toolbar-button"
          aria-owns={anchorEl ? 'filter-menu' : null}
          aria-haspopup="true"
          onClick={(e) => {
            this.handleClick(e, false);
          }}
        >
          <FilterListIcon />
        </IconButton>
        {/* Sort */}
        <IconButton
          className="material-table__toolbar-button"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={(e) => {
            this.handleClick(e, true);
          }}
        >
          <SortIcon />
        </IconButton>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className="material-table__filter-menu"
        >
          {sortState ? <MenuItem onClick={this.handleSort('all')} className="material-table__filter-menu-item">All</MenuItem> : ''}
          <MenuItem onClick={this.handleSort(option1)} className="material-table__filter-menu-item">{option1}</MenuItem>
          <MenuItem onClick={this.handleSort(option2)} className="material-table__filter-menu-item">{option2}</MenuItem>
          <MenuItem onClick={this.handleSort(option3)} className="material-table__filter-menu-item">{option3}</MenuItem>
        </Menu>
        <IconButton
          className="material-table__toolbar-button"
          aria-haspopup="true"
          onClick={this.toggleModal}
        >
          <PlusIcon />
        </IconButton>
        <Modal isOpen={modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add Device</ModalHeader>
          <ModalBody>
            <Form
              edit={false}
              name="Add"
              handleAddEdit={handleAddEdit}
              toggleModal={this.toggleModal}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default TableFilterButton;
