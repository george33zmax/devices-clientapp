import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import MatTableFilterButton from './TableFilterButton';
import Form from './FormDevices';

class TableToolbar extends React.Component {
  state = {
    modal: false,
  };

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  renderFilters = (numSelected) => {
    const {
      handleDeleteSelected, selectedData, handleAddEdit, handleFilter, onRequestSort,
    } = this.props;
    const { modal } = this.state;
    if (numSelected > 0) {
      if (numSelected === 1) {
        return (
          <div>
            <IconButton
              className="material-table__toolbar-button"
              aria-haspopup="true"
              onClick={() => {
                this.toggleModal();
              }}
            >
              <EditIcon />
              <div>
                <Modal isOpen={modal} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Edit Device</ModalHeader>
                  <ModalBody>
                    <Form
                      name="EDIT"
                      edit
                      handleAddEdit={handleAddEdit}
                      toggleModal={this.toggleModal}
                      selectedData={selectedData}
                    />
                  </ModalBody>
                </Modal>
              </div>
            </IconButton>
            <IconButton
              onClick={handleDeleteSelected}
              className="material-table__toolbar-button"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      }
      return (
        <IconButton
          onClick={handleDeleteSelected}
          className="material-table__toolbar-button"
        >
          <DeleteIcon />
        </IconButton>
      );
    }
    return (
      <MatTableFilterButton
        handleFilter={handleFilter}
        onRequestSort={onRequestSort}
        handleAddEdit={handleAddEdit}
      />
    );
  };

  render() {
    const { numSelected } = this.props;
    return (
      <div className="material-table__toolbar-wrap">
        <Toolbar className="material-table__toolbar">
          <div>
            {numSelected > 0 && (
              <h5 className="material-table__toolbar-selected">{numSelected} <span>selected</span></h5>
            )}
          </div>
          <div>
            {this.renderFilters(numSelected)}
          </div>
        </Toolbar>
      </div>
    );
  }
}

export default TableToolbar;
