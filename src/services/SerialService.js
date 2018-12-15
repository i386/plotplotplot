
import Events from '../events'

const Readline = require('@serialport/parser-readline')
const parser = new Readline();

function extractKey(line) {
  // Serial.println("\031Temp\03122.00");
  let chars = []
  for (var i = 1; i < line.length; i++) {
    if (line.charCodeAt(i) !== 25) {
      chars.push(line.charAt(i))
    } else {
      break;
    }
  }
  return chars.join('')
}

function extractValue(line) {
  let chars = []
  var foundSeparators = 0
  for (var i = 0; i < line.length; i++) {
    if (line.charCodeAt(i) == 10) {
      break;
    }
    if (line.charCodeAt(i) == 25) {
      foundSeparators++
      continue;
    }
    if (foundSeparators >= 2) {
      chars.push(line.charAt(i))
    }
  }
  return chars.join('')
}

class SerialService {

  constructor() {
    this._port = null;
    Events.on('serialPortSelected', this.handleSerialPortSelected);
  }

  handleSerialPortSelected = serialPort => {
    let path = serialPort.comName;
    this._port = new window.serialport(path, { baudRate: 9600 });
    // Notify the rest of an app that a serial session as started
    Events.emit('serialSessionStarted');
    // Start parsing data
    this._port.pipe(parser)
    parser.on('data', line => {
      let timestamp = new Date().getTime();
      if (line.charCodeAt(0) == 25) {
        let event = {
          key: extractKey(line),
          value: extractValue(line),
          timestamp: timestamp
        }
        Events.emit("serialPlotMessageRecieved", event)
      } else {
        Events.emit("serialStringMessageRecieved", {line: line, timestamp: timestamp})
      }
    })
  }
}

export default SerialService;
