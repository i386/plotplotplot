import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const serialPort = require('serialport');
// import serialPort from 'serialport'
const SerialPort = serialPort.SerialPort;

class SerialPortSelector extends Component {

  listSerialDevices() {
    var allPorts = null;
    serialPort.list(function (err, ports) {
      allPorts = ports;
    });
    return allPorts;
  }

  componentDidMount() {
    const ports = this.listSerialDevices();
    const state = {
      "ports": ports,
      "currentPort": ""
    }
    this.setState(state)
  }

  serialPortChanged() {
    console.log("TODO: update serial port")
  }

  render() {

    const menuItems = [];
    menuItems.push((
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
    ))
    for (const port in this.state.ports) {
      menuItems.push((
        <MenuItem value={port.pnpId}>{port.comName}</MenuItem>
      ))
    }

    return (
      <Select value="" onChange={this.serialPortChanged}>
        {menuItems}
      </Select>
    )
  }
}

export default SerialPortSelector;
