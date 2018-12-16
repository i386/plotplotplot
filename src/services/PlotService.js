
import Events from '../events';

class Plot {
  constructor(name) {
    this.name = name
    this.points = []
    this.sum = 0
    this.avg = NaN
    this.min = NaN
    this.max = NaN
  }

  addPoint(point) {
    this.points.push(point)
    let values = this.points.map((p) => p.value)
    this.sum = this.sum + point.value
    this.avg = (this.sum / values.length).toFixed(2)
    if (!this.min || point.value < this.min) {
      this.min = point.value
    }
    if (!this.max || point.value > this.max) {
      this.max = point.value
    }
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
    // Create if does not exist
    if (!plots[plotPoint.key]) {
      plots[plotPoint.key] = new Plot(plotPoint.key)
    }
    let currentPlot = plots[plotPoint.key]
    currentPlot.addPoint(plotPoint)
    // Let subscribers know we've updated state
    Events.emit('plotsUpdated', Object.values(plots))
  }

  handleSerialStringMessageRecieved = (message) => {
    console.log(message.line)
  }
}

export default PlotService;
