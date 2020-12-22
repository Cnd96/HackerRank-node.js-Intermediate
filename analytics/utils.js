const moment = require('moment');

const subtractSecondsFromCurrentTime = (seconds) => {
    return moment().subtract(seconds, "seconds").toDate();
}

module.exports = {
    subtractSecondsFromCurrentTime
}
