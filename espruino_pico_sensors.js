// connect LCD to right bottom side
// connect accelerometer sensor to GND:- x:A2, y:A3, z:A4 VCC:+ (bottom right 1 to 3)
// connect distanct sensor to VCC:+, trig:A8, Echo:B7, GND:- (left bottom 1, left bottom 2)
// connect iR sensor to GND:-, Out:A1, VCC:+ 
// connect 3.3v (left top 2) to + , GND (left top 1) to -
// other 

A5.write(0); // GND
A7.write(1); // VCC
A6.write(1); // Turn on the backlight

var g;

var foo;

var sensor;


function onInit() {
  foo = require("ADXL335").connect(A2,A3,A4);
  
  
  sensor = require("HC-SR04").connect(B5,B4,function(dist) {
    console.log(dist+" cm away");
    var d= foo.readG();
    var e=analogRead(A1);
    var f=analogRead(A0);
    console.log("x " + d[0] + " y " + d[1] + " z " + d[2]);
    console.log("ir: " + e);
    B3.write(e>0.5||f<0.5);
    //g.clear();
    //g.drawString(dist+" cm away",0,0);

    //g.drawString("x " + d[0],0,10);
    //g.drawString(" y " + d[1],0,20);
    //g.drawString(" z " + d[2],0,30);
    
    //g.drawString("ir:" + e, 0, 40);
    // send the graphics to the display
    //g.flip();
  });
  
  // Setup SPI
  var spi = new SPI();
  spi.setup({ sck:B1, mosi:B10 });
  // Initialise the LCD
  g = require("PCD8544").connect(spi,B13,B14,B15, function() {
    initialised = true;
    g.clear();
    g.drawString("Hello World!",0,0);
    // send the graphics to the display
    g.flip();
  });
  
  setInterval(function() {
    sensor.trigger(); // send pulse
  }, 500);
}

onInit();