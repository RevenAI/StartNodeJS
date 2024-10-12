const os = require('os');

// Get system information
const getSystemInfo = () => {
    const systemInfo = {
        platform: os.platform(),           // Operating system platform
        release: os.release(),             // OS version
        totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,  // Total memory
        freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,    // Free memory
        cpuModel: os.cpus()[0].model,      // CPU model
        cpuCores: os.cpus().length,        // Number of CPU cores
        architecture: os.arch(),           // System architecture (x64, arm, etc.)
        uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,   // System uptime in hours
        hostname: os.hostname(),           // Hostname of the system
        homeDir: os.homedir(),             // Home directory
    };

    return systemInfo;
};

// Display the system information as a string
const displaySystemInfo = () => {
    const info = getSystemInfo();
    let output = 'System Information:\n';
    output += '====================\n';
    output += `Platform       : ${info.platform}\n`;
    output += `Release        : ${info.release}\n`;
    output += `Total Memory   : ${info.totalMemory}\n`;
    output += `Free Memory    : ${info.freeMemory}\n`;
    output += `CPU Model      : ${info.cpuModel}\n`;
    output += `CPU Cores      : ${info.cpuCores}\n`;
    output += `Architecture   : ${info.architecture}\n`;
    output += `Uptime         : ${info.uptime}\n`;
    output += `Hostname       : ${info.hostname}\n`;
    output += `Home Directory : ${info.homeDir}\n`;

    return output; // Return the formatted string
};

module.exports = {
    getSystemInfo,
    displaySystemInfo,
}

// Example usage:
/* const systemInfoMessage = displaySystemInfo();
console.log(systemInfoMessage); // Log the returned string
 */