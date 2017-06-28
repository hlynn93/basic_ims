import React, { Component } from 'react';

class SettingsPage extends Component {
  render() {
    return (
      <div>
        Settings Page
        <p>{process.resourcesPath}</p>
      </div>
    );
  }
}

SettingsPage.propTypes = {

};

export default SettingsPage;
