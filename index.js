
// This file is the entrypoint for the Max patch.
// When this file is executed via `node.script start` in the Max patch,
// this program will launch an Electron app as a child process, and connect to it via socket.io.


const MaxAPI   = require("max-api");
const io       = require("socket.io")();
const electron = require("electron");
const proc     = require("child_process");
const child    = proc.spawn(electron, ["./electron"]);


io.on("connection", (socket) => {
	MaxAPI.addHandler('Japanese', () => {
		socket.send('ja');
	});
	MaxAPI.addHandler('English', () => {
		socket.send('en');
	});

	console.log("Socket is connected with Electron App");

	socket.on("dispatch", ({ data }) => {
		console.log("dispatch: ", data);
		MaxAPI.outlet(data);
	});

});

io.listen(3000);

// This will ensure that when this parent process is killed in maxpat (either by `node.script stop` or Max is shutdown for some reason),
// it will terminate the child process, the Electron app.
process.on("exit", () => {
	child.kill();
});
