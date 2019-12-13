import React, { PureComponent } from 'react';
import {
  Label,
} from 'reactstrap';

class ModalDeviceForm extends PureComponent {
  state = {
    capacity: 0,
    name: '',
    type: '',
  };

  render() {
    const {
      selectedData, toggleModal, handleAddEdit, edit,
    } = this.props;
    const { capacity, type, name } = this.state;
    const systemName = selectedData && selectedData.system_name ? selectedData.system_name : '';
    const hddCapacity = selectedData && selectedData.hdd_capacity ? selectedData.hdd_capacity : '';
    return (
      <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const id = selectedData && selectedData.id ? selectedData.id : '';
              const editedDevice = {
                name, capacity, type, id,
              };
              handleAddEdit(editedDevice, edit);
              toggleModal();
            }}
            className="project__form"
          >
            <div className="project__form--col project__text">
              <Label htmlFor="name" className="project__form--label">System Name</Label>
              {/* eslint-disable-next-line max-len */}
              <input
                type="text"
                className="project__form--elements"
                id="name"
                placeholder={systemName}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                required
              />
            </div>
            <div className="project__form--col project__select">
              <Label htmlFor="FormControlSelect" className="project__form--label">Type</Label>
              <select
                className="project__form--elements"
                id="FormControlSelect"
                onChange={(e) => {
                  this.setState({ type: e.target.value });
                }}
                required="required"
              >
                <option value="">Choose</option>
                <option value="MAC">Mac</option>
                <option value="WINDOWS_SERVER">Windows Server</option>
                <option value="WINDOWS_WORKSTATION">Windows Workstation</option>
              </select>
            </div>

            <div className="project__form--col project__text">
              <Label htmlFor="capacity" className="project__form--label">HDD Capacity</Label>
              <input
                onChange={(e) => {
                  this.setState({ capacity: e.target.value });
                }}
                type="number"
                className="project__form--elements"
                id="capacity"
                placeholder={hddCapacity}
                required
              />
            </div>

            <div id="project__form--submit">
              <button
                type="submit"
                className="project__btn project__btn--main"
              >Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ModalDeviceForm;
