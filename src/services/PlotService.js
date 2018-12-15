
import Events from '../events';

class PlotService {
  constructor() {
    Events.on('serialSessionStarted', this.handleSerialSessionStarted)
    Events.on('serialPlotMessageRecieved', this.handleSerialPlotMessageReceived)
    Events.on('serialStringMessageRecieved', this.handleSerialStringMessageRecieved);
  }

  handleSerialSessionStarted = () => {
    console.log("serial session started")
  }

  handleSerialPlotMessageReceived = (plot) => {
    console.log(plot)
  }

  handleSerialStringMessageRecieved = (message) => {
    console.log(message.line)
  }
}

export default PlotService;
