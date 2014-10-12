usb-webmail-notifier
====================

Node.js Controller for the USB "Webmail Notifier" that can light up with 7 different colours.

![Blue](http://i.imgur.com/8nd4FTJ.jpg)
[Gallery of colours](http://imgur.com/a/R3Mf3);

# Cycle the colours:

    var notifier = require('usb-webmail-notifier');
    notifier.cycle();

# Set a color:

    notifier.color('GREEN');

# Play a sequence:

	// sequence, delay, loop, startIndex
    notifier.play(['RED','OFF','GREEN','OFF'],100,true,1);

# Flash:

	// colour, delay, times
    notifier.flash('RED',1000,20);

 # Switch off:

 	notifier.off();
 	// or
 	notifier.color('OFF');

![White](http://i.imgur.com/wpGRa5N.jpg)
![Purple](http://i.imgur.com/9hwoH71.jpg)
![Green](http://i.imgur.com/3a4GNc5.jpg)
![Blue](http://i.imgur.com/8nd4FTJ.jpg)
![Cyan](http://i.imgur.com/73mgWsY.jpg)
![Yellow](http://i.imgur.com/vAvt0rq.jpg)
![Red](http://i.imgur.com/2uILdvc.jpg)