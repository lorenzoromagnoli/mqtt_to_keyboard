const { ipcRenderer } = require( 'electron' )

let mqttChannel;
let input;
let button;
let enablekeyboardCheck;

let receivedMsg = "";
let floatingLabels = [];

let myFont;

let canvas;

function preload() {
  myFont = loadFont( 'assets/RobotoMono-Bold.ttf' );
}

function setup() {
  canvas = createCanvas( 400, 300 );
  canvas.parent( 'canvasContainer' )
  noStroke()

  input = select( '#channel-id' );

  button = select( '#channel-subscribe' );
  button.mousePressed( connect );

  enablekeyboardCheck = select( '#enable-keyboard' );
  enablekeyboardCheck.changed( toggleKeyboard );

  setInterval( checkConnectionStatus, 5000 );

  fill( 255 );
  textAlign( CENTER );
}

function updateFloatingLabelsAray() {
  for ( let i = 0; i < floatingLabels.length; i++ ) {
    floatingLabels[ i ].update();
    if ( floatingLabels[ i ].size > 0 ) {
      floatingLabels[ i ].draw();
    } else {
      floatingLabels.splice( i, 1 );
    }
  }
}


function draw() {
  background( 0 );
  //text( receivedMsg, width / 2, height / 2 );
  updateFloatingLabelsAray();
}


function windowResized() {
  //  resizeCanvas( windowWidth, windowHeight )
}

function connect() {
  mqttChannel = input.value();
  console.log( "connecting to broker on channel: " + mqttChannel );
  ipcRenderer.sendSync( 'connect', mqttChannel )
}

function checkConnectionStatus() {
  console.log( "connected:" + ipcRenderer.sendSync( 'status' ) );
}

function toggleKeyboard() {
  if ( this.checked() ) {
    console.log( 'enabling keyboard' );
    ipcRenderer.send( 'keyboard', true )
  } else {
    console.log( 'disabling keyboard' );
    ipcRenderer.send( 'keyboard', false )
  }
}

ipcRenderer.on( 'asynchronous-reply', ( event, arg ) => {
  console.log( arg ) // prints "pong"
} )

ipcRenderer.on( 'status', ( event, message ) => {
  console.log( message ) // Prints 'whoooooooh!'
} )

ipcRenderer.on( 'received', ( event, message ) => {


  //receivedChar = String.fromCharCode( message[ 0 ] );
  receivedChar = message;


  console.log( receivedChar ) // Prints 'whoooooooh!'
  receivedMsg = receivedChar;
  let floatingLabel = new FloatingLabel( receivedMsg );
  floatingLabels.push( floatingLabel );
} )