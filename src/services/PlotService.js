
import Events from '../events';

class Plot {
  constructor(name) {
    this.name = name
    this.points = []
  }
}

var plots = {};


class PlotService {
  constructor() {
    Events.on('serialSessionStarted', this.handleSerialSessionStarted)
    Events.on('serialPlotMessageRecieved', this.handleSerialPlotMessageReceived)
    Events.on('serialStringMessageRecieved', this.handleSerialStringMessageRecieved);
  }

  handleSerialSessionStarted = () => {
    plots = {};
  }

  handleSerialPlotMessageReceived = (plotPoint) => {
    console.log(plotPoint)
    // Create if does not exist
    if (!plots[plotPoint.key]) {
      plots[plotPoint.key] = new Plot(plotPoint.key)
    }
    let currentPlot = plots[plotPoint.key]
    currentPlot.points.push(plotPoint)
    // Let subscribers know we've updated state
    Events.emit('plotsUpdated', plots)
  }

  handleSerialStringMessageRecieved = (message) => {
    console.log(message.line)
  }
}

export default PlotService;
