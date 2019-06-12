client = new Paho.MQTT.Client("broker.shiftr.io", Number(443), "controlpanel");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var receivedMessage="";

function setup() {
  createCanvas(400, 400);

  client.connect({
    onSuccess: onConnect,
    userName: "mlSchool",
    password: "380eda76b9b1d2df",
    useSSL: true,
  });

	textAlign(CENTER);
}

function draw() {
  background(220);
	text(receivedMessage, width/2,height/2);
}


function keyPressed(){
	sendMessage("/1234","a");
}

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("connected to mosquitto");
  client.subscribe("/1234");
  
  setInterval(sendRandomMsg,1000);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log(message.destinationName + " -> " + message.payloadString);
  receivedMessage = message.payloadString;

	setTimeout(function(){
		receivedMessage="";
	},500);
}

function sendMessage(topic, message) {
  message = new Paho.MQTT.Message(message);
  message.destinationName = topic;
  client.send(message);
}

function sendRandomMsg(){
  let c = String.fromCharCode(random(33, 127));
  sendMessage("/keyboard", c);
  console.log(c);
}
