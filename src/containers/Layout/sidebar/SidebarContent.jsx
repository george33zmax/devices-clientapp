import React, { Component } from 'react';
import SidebarLink from './SidebarLink';

class SidebarContent extends Component {

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Devices" icon="cart" route="/" onClick={this.hideSidebar} />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
