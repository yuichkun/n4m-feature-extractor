import io from "socket.io-client";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './i18n';

// Initialize Socket.io.
// This is connecting to the main process of Electron and then to Max but alternatively you could choose
// to use some other ways of commmunication.
const socket = io("http://localhost:3000").connect();


socket.on("connect", () => {
	console.log("Connected to Max 8");
});

ReactDOM.render(<App socket={socket}/>, document.getElementById('main'));
