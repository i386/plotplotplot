import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Plot extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">{this.props.plot.name}</Typography>
        </CardContent>
      </Card>
    )
  }
}

class Plots extends React.Component {
  render() {
    let charts = []
    for (var i = 0; i < this.props.plots.length; i++) {
      charts.push((
        <Grid key={i} item>
          <Plot plot={this.props.plots[i]}/>
        </Grid>
      ))
    }
    return (
      <Grid container spacing={8}>
      {charts}
      </Grid>
    )
  }
}

export default Plots;
