"use strict";

var os = require('os'); // Get system information


var getSystemInfo = function getSystemInfo() {
  var systemInfo = {
    platform: os.platform(),
    // Operating system platform
    release: os.release(),
    // OS version
    totalMemory: "".concat((os.totalmem() / Math.pow(1024, 3)).toFixed(2), " GB"),
    // Total memory
    freeMemory: "".concat((os.freemem() / Math.pow(1024, 3)).toFixed(2), " GB"),
    // Free memory
    cpuModel: os.cpus()[0].model,
    // CPU model
    cpuCores: os.cpus().length,
    // Number of CPU cores
    architecture: os.arch(),
    // System architecture (x64, arm, etc.)
    uptime: "".concat((os.uptime() / 3600).toFixed(2), " hours"),
    // System uptime in hours
    hostname: os.hostname(),
    // Hostname of the system
    homeDir: os.homedir() // Home directory

  };
  return systemInfo;
}; // Display the system information as a string


var displaySystemInfo = function displaySystemInfo() {
  var info = getSystemInfo();
  var output = 'System Information:\n';
  output += '====================\n';
  output += "Platform       : ".concat(info.platform, "\n");
  output += "Release        : ".concat(info.release, "\n");
  output += "Total Memory   : ".concat(info.totalMemory, "\n");
  output += "Free Memory    : ".concat(info.freeMemory, "\n");
  output += "CPU Model      : ".concat(info.cpuModel, "\n");
  output += "CPU Cores      : ".concat(info.cpuCores, "\n");
  output += "Architecture   : ".concat(info.architecture, "\n");
  output += "Uptime         : ".concat(info.uptime, "\n");
  output += "Hostname       : ".concat(info.hostname, "\n");
  output += "Home Directory : ".concat(info.homeDir, "\n");
  return output; // Return the formatted string
};

module.exports = {
  getSystemInfo: getSystemInfo,
  displaySystemInfo: displaySystemInfo
}; // Example usage:

/* const systemInfoMessage = displaySystemInfo();
console.log(systemInfoMessage); // Log the returned string
 */