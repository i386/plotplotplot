import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import SerialPortSelector from './components/SerialPortSelector'

const styles = {};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            PlotPlotPlot
          </Typography>
          <SerialPortSelector/>
        </Toolbar>
      </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(App);
