// Modules to control application life and create native browser window
const { app, BrowserWindow } = require( 'electron' )

// Live reload module which watches `public` folder
// const _ = require('electron-reload')(__dirname + '/public')

const path = require( 'path' )
const url = require( 'url' )

const { ipcMain } = require( 'electron' )

var mqtt = require( 'mqtt' )
var robot = require( "robotjs" );


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected
let mainWindow

let keyboardEnabled = false;
let connected = false;

// A function to create the browser window when the app is ready
function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow( {
    width: 500,
    height: 500,
    // center: true,
    // frame: false,
    // resizable: false,
    // alwaysOnTop: true,
    useContentSize: true // when false, width/height will set the size of the whole app, including frames. If true, innerWindow will be set instead, resulting in a bigger app window
  } )

  // Load the index.html of the app
  mainWindow.loadURL( url.format( {
    pathname: path.join( __dirname, 'public', 'index.html' ),
    protocol: 'file:',
    slashes: true
  } ) )

  // Open the DevTools on start
  //mainWindow.webContents.openDevTools( "undock" )

  // Emitted when the window is closed
  mainWindow.on( 'closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element
    mainWindow = null
  } )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( 'ready', createWindow )

// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
} )

app.on( 'activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if ( mainWindow === null ) {
    createWindow()
  }
} )

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on( 'keyboard', ( event, arg ) => {
  console.log( arg ) // prints "ping"
  if ( arg ) {
    keyboardEnabled = true;
  } else {
    keyboardEnabled = false;
  }
  console.log( "keyboardEnabled:" + keyboardEnabled );
} )


ipcMain.on( 'connect', ( event, arg ) => {
  event.returnValue = arg;
  client.subscribe( arg );
  console.log( "subscribed to channel:" + arg ) // prints "ping"
} )

ipcMain.on( 'status', ( event, arg ) => {
  console.log( arg ) // prints "ping"
  event.returnValue = connected;
} )


var client = mqtt.connect( 'mqtt://mlSchool:380eda76b9b1d2df@broker.shiftr.io', {
  password: "380eda76b9b1d2df"
} )

client.on( 'connect', function() {
  console.log( 'client has connected!' );
  connected = true;
  //client.subscribe('/example');
  // client.unsubscribe('/example');
  // setInterval( function() {
  //   client.publish( '/hello', 'world' );
  // }, 1000 );
} );

client.on( 'disconnect', function() {
  connected = false;
} );

client.on( 'message', function( topic, message ) {
  console.log( 'new message:', topic, message.toString() );
  mainWindow.webContents.send( 'received', message );


  if ( keyboardEnabled ) {
    //up key
    if ( message == 'UP' || message == 'up' ) {
      robot.keyTap( "up" );
    } else if ( message == 'UP_DOWN' ) {
      robot.keyToggle( 'up', 'down' );
    } else if ( message == 'UP_UP' ) {
      robot.keyToggle( 'up', 'up' );
    }
    //down key
    if ( message == 'DOWN' || message == 'down' ) {
      robot.keyTap( "down" );
    } else if ( message == 'DOWN_DOWN' ) {
      robot.keyToggle( 'down', 'down' );
    } else if ( message == 'DOWN_UP' ) {
      robot.keyToggle( 'down', 'up' );
    }

    //left key
    if ( message == 'LEFT' || message == 'left' ) {
      robot.keyTap( "left" );
    } else if ( message == 'LEFT_DOWN' ) {
      robot.keyToggle( 'left', 'down' );
    } else if ( message == 'LEFT_UP' ) {
      robot.keyToggle( 'left', 'up' );
    }

    //left key
    if ( message == 'RIGHT' || message == 'right' ) {
      robot.keyTap( "right" );
    } else if ( message == 'RIGHT_DOWN' ) {
      robot.keyToggle( 'right', 'down' );
    } else if ( message == 'RIGHT_UP' ) {
      robot.keyToggle( 'right', 'up' );
    }

    //enter key
    if ( message == 'ENTER' || message == 'enter' ) {
      robot.keyTap( "enter" );
    } else if ( message == 'ENTER_DOWN' ) {
      robot.keyToggle( 'enter', 'down' );
    } else if ( message == 'ENTER_UP' ) {
      robot.keyToggle( 'enter', 'up' );
    }

    //space key
    if ( message == 'SPACE' || message == 'space' ) {
      robot.keyTap( "space" );
    } else if ( message == 'SPACE_DOWN' ) {
      robot.keyToggle( 'space', 'down' );
    } else if ( message == 'SPACE_UP' ) {
      robot.keyToggle( 'space', 'up' );
    }


    //  altri tasti
    else if ( message == 'A_DOWN' ) {
      robot.keyToggle( 'a', 'down' );
    } else if ( message == 'A_UP' ) {
      robot.keyToggle( 'a', 'up' );
    } else if ( message == 'D_UP' ) {
      robot.keyToggle( 'd', 'up' );
    } else if ( message == 'D_DOWN' ) {
      robot.keyToggle( 'd', 'down' );
    } else if ( message == 'SPACE_DOWN' ) {
      robot.keyToggle( 'space', 'down' );
    } else if ( message == 'SPACE_UP' ) {
      robot.keyToggle( 'space', 'up' );
    } else {
      robot.typeString( message.toString() );
    }
  }

} );