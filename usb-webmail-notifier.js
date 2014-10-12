// Node.js USB "Webmail Notifier" based on a gist by mauricesvay //gist.github.com/mauricesvay/3920415

var HID = require('node-hid');
var vendor = 4756;
var product = 4896;
var hid = new HID.HID(vendor, product);

var Notifier = function (hid) {

    this.hid = hid;
    this.colors = ['OFF', 'GREEN', 'RED', 'BLUE', 'CYAN', 'YELLOW', 'PURPLE', 'WHITE'];

};

Notifier.prototype.write = function (arBytes) {

    this.hid.write(arBytes);

};

Notifier.prototype.color = function (value) {

    var color;

    if (typeof value == 'number') {
        color = value;
    }

    if (typeof value == 'string') {
        color = this.colors.indexOf(value);
    }

    this.write([ color, 0, 0, 0, 0, 255, 0, 0 ]);

    return this;
};

Notifier.prototype.off = function () {

    this.color(Notifier.OFF);
    return this;

};

Notifier.prototype.play = function (seq, delay, loop, i) {

    var self = this;
    var color;

    if (typeof loop === 'undefined') {
        loop = false;
    }

    if (typeof i === 'undefined') {
        i = 0;
    }

    color = seq[i];

    if (i < seq.length) {
        this.color(color);
        i++;
    } else {
        if (loop) {
            i = 0;
        } else {
            return;
        }
    }

    setTimeout(function () {
        self.play(seq, delay, loop, i);
    }, delay);
};

Notifier.prototype.flash = function (col, speed, times) {

    if (typeof col === 'undefined') {
        col = 'RED';
    }

    if (typeof times === 'undefined') {
        times = 50;
    }

    if (typeof speed === 'undefined') {
        speed = 10;
    }

    var seq = [];

    for (var i = 0; i < times; i++) {
        seq.push(col);
        seq.push('OFF');
    }

    this.play(seq, speed);
}

Notifier.prototype.cycle = function (cycle) {

    var show = ['OFF', 'GREEN', 'RED', 'BLUE', 'CYAN', 'YELLOW', 'PURPLE', 'WHITE', 'OFF'];
    this.play(show, 1500);

}

// create instance of notifier with correct hid
var notifier = new Notifier(hid);

// set the USB to 'OFF' when program ends
process.on('SIGINT', function () {
    notifier.color('OFF');
    process.exit();
});

// make notifier avilable
module.exports = notifier;