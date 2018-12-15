
// in preload scripts, we have access to node.js and electron APIs
// the remote web app will not have access, so this is safe

const serialport = require('serialport');

init();

function init() {
  window.serialport = serialport;
}
