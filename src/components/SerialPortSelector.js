import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Events from '../events';

const styles = {
  width: {
    width: "300px"
  }
};

class SerialPortSelector extends Component {

  listSerialDevices() {
    return new Promise((resolve, reject) => {
      window.serialport.list(function (err, ports) {
        if (err) {
          reject(err);
        } else {
          resolve(ports);
        }
      });
    });
  }

  componentDidMount() {
    let that = this;
    this.listSerialDevices().then((ports) => {
      const state = {
        "ports": ports,
        "currentPort": ""
      }
      that.setState(state)
    }).catch((error) => {
      alert("Could not list serial ports " + error);
    })
  }

  handleChange = event => {
    this.setState({ currentPort: event.target.value });
    let serial_port = this.state.ports[event.target.value];
    if (serial_port) {
      Events.emit('serialPortSelected', serial_port)
    }
  };

  render() {
    const { classes } = this.props;
    if (!this.state || !this.state.ports) {
      return null;
    }

    const menuItems = [];
    menuItems.push((
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
    ))

    for (const portId in Object.keys(this.state.ports)) {
      let port = this.state.ports[portId];
      let comName = port.comName;
      let manufacturer = port.manufacturer ? port.manufacturer : "Unknown";
      menuItems.push((
        <MenuItem key={portId} value={portId}>
          <ListItemText
              primary={comName}
              secondary={manufacturer}
            />
        </MenuItem>
      ))
    }

    return (
      <Select
        value={this.state.currentPort}
        onChange={this.handleChange}
        inputProps={{
          name: 'serialPort',
          id: 'serial-port-select'
        }}
        className={classes.width}
        >
        {menuItems}
      </Select>
    )
  }
}

export default withStyles(styles)(SerialPortSelector);
