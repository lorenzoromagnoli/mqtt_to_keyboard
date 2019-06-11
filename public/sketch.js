const { ipcRenderer } = require( 'electron' )


let mqttChannel;
let input;
let button;
let enablekeyboardCheck;

let receivedMsg = "";

function setup() {


  createCanvas( windowWidth, windowHeight )
  console.log( `${windowWidth}, ${windowHeight}` )
  noStroke()

  input = createInput();
  input.position( 20, 65 );

  button = createButton( 'submit' );
  button.position( 20, 90 );
  button.mousePressed( connect );

  enablekeyboardCheck = createCheckbox( 'enableKeyboard', false );
  enablekeyboardCheck.position( 20, 120 );

  enablekeyboardCheck.changed( toggleKeyboard );

  setInterval( checkConnectionStatus, 5000 );

  textSize( 32 );
  fill( 255 );

}

function draw() {
  background( 0 );
  text( receivedMsg, width / 2, height / 2 );
}


function windowResized() {
  resizeCanvas( windowWidth, windowHeight )
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
  receivedChar = String.fromCharCode( message[ 0 ] );
  console.log( receivedChar ) // Prints 'whoooooooh!'
  receivedMsg = receivedChar;
} )