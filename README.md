# mqtt to keyboard

A simple program to control the keyboard remotely via MQTT.
developed for the ML@school workshop.

***
## Usage

1) Launch the program
2) Fill in the text field the "channel" you want to connect to (e.g. "/1234")
3) check the example p5.js code [here](https://editor.p5js.org/10r3n20/sketches/SyoYaCrjQ) to understand how to connect to mqtt and send messages
4) [Wanna see the messages being transmitted? ](https://shiftr.io/lorenzo/ml-school)

## Setup electron app for development

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

From your command line:

```bash
# Clone this repository
git clone https://github.com/garciadelcastillo/electron-p5js-quick-start
# Go into the repository
cd electron-p5js-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

## Package

### macOS

Build you app as an `.app` (and installable `.dmg`) for macOS.

For now, you need to comment the line of `electron-reload` in `main.js` for the packaged app to run.

```
npm run dist
```

### Windows & Linux

TODO

### TODO
- [ ] Define specific messages to activate special keys
- [ ] Beautify

### thanks to
garciadelcastillo for the awesome [p5.js electron boilerplate ](https://github.com/garciadelcastillo/electron-p5js-quick-start)
