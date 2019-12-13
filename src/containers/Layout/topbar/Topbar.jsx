import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import TopbarSidebarButton from './TopbarSidebarButton';

class Topbar extends PureComponent {

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link className="topbar__logo" to="/" />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
