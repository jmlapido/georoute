const Process = require('./process');

class Tracert extends Process {
    constructor() {
        super('tracert', ['-d']);
    }

    parseDestination(data) {
        const regex = /^Tracing\sroute\sto\s([a-zA-Z0-9:.]+)\s(?:\[([a-zA-Z0-9:.]+)\])?/;
        const parsedData = new RegExp(regex, '').exec(data);

        let result = null;
        if (parsedData !== null) {
            if (parsedData[2] !== undefined) {
                result = parsedData[2];
            }
            else {
                result = parsedData[1];
            }
        }

        return result;
    }

    parseHop(hopData) {
        const regex = /^\s*(\d*)\s*(\d+\sms|\*)\s*(?:\d+\sms|\*)\s*(?:\d+\sms|\*)\s*([a-zA-Z0-9:.\s]+)/;
        const parsedData = new RegExp(regex, '').exec(hopData);

        let result = null;
        if (parsedData !== null) {
            result = {
                hop: parseInt(parsedData[1], 10),
                rtt1: parsedData[2],
                ip: parsedData[3].trim()
            };
        }

        return result;
    }
}

module.exports = Tracert;