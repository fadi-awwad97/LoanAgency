import React, { Component } from 'react';
import { askForPermissioToReceiveNotifications } from './pushnotification';
class App extends Component {
  render() {

    return (
      <div className="App">
       
        <button onClick={askForPermissioToReceiveNotifications} >
          Click here to receive notifications
       </button>

      </div>
    );
  }
}
export default App;