

export const getAccessToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
}

export const timeStamp = (date) => {
    date = new Date(date);
    var currentOffset = date.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30
    var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var dateIST = ISTTime.toDateString();
    var timeStamp = dateIST + " " + (hoursIST + 1) + ':' + minutesIST;
    return timeStamp;
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body };
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id };
        } else {
            return { query: body };
        }
    }
    return {};
}