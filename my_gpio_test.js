var gpio = require("gpio");

var intervalId;
var gpioPin7;

gpioPin7 = gpio.export(4, {
    ready: function () {
        intervalTimer = setInterval(function () {
            gpioPin7.set(1);
            setTimeout(function () { gpioPin7.reset(); }, 500);
        }, 1000);
    }
});

setTimeout(function () {
    clearInterval(intervalTimer);          // stops the voltage cycling
  
    gpioPin7.removeAllListeners('change');   // unbinds change event
    gpioPin7.reset();
    gpioPin7.unexport();
    gpioPin7.reset();
    gpioPin7.set(0, function () {
        console.log(gpioPin7.value);
        gpioPin7.unexport(function () {
            // unexport takes a callback which gets fired as soon as unexporting is done
            process.exit(); // exits your node program
        });
    });
}, 10000)