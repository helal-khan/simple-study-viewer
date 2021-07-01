const app = {
    version: 1.0,
    apiBaseUrl: "http://localhost:8080/api/v1",
    date: function (xdate) {
        var d = xdate ? new Date(xdate) : new Date();
        var date = d.toLocaleDateString();
        var time = d.toLocaleTimeString();
        var dayDiff = +((new Date() - d) / (24 * 60 * 60 * 1000)).toFixed(2);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        date = date.replace(/(\d+)\D(\d+)\D(\d+)/g, '$3-$1-$2');
        time = time.replace(/(.*)\D\d+/, '$1');
        var version = ('0' + day).slice(-2) + ('0' + month).slice(-2) + year;
        var lastDay = new Date(year, month + 1, 0).getDate();
        var firstDate = "01/" + (month + 1) + "/" + year, lastDate = lastDay + "/" + (month + 1) + "/" + year;

        return {
            year: year,
            month: month + 1,
            day: day,
            date: date,
            version: version,
            time: time,
            datetime: date + '  ' + time,
            dayDiff: dayDiff,
            lastDay: lastDay,
            firstDate: firstDate,
            lastDate: lastDate,
            fullDate: new Date(d)
        }
    },
    reverseArr: function (input) {
        let ret = [];
        for(var i = input.length-1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    }
}
export default app;