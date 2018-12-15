import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import SerialPortSelector from './components/SerialPortSelector'
import Events from './events'
import SerialService from './services/SerialService'
import PlotService from './services/PlotService'

const serialService = new SerialService();
const plotService = new PlotService();

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

class App extends Component {

  componentDidMount() {
    let that = this;
    Events.on('plotsUpdated', (plots) => {
      console.log(plots)
      that.setState({plots: plots})
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
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
