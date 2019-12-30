/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	11:08 PM -- October 29th, 2019.
 *	Project: @command-socket/core
 */

// import readline from "readline";
// import { CommandSocketServer } from "../../socket/command-socket-server";
// import { CommandSocket } from "../../socket/command-socket";
//
// const main: () => Promise<void> = async (): Promise<void> => {
//
// 	let wsServer: CommandSocketServer = new CommandSocketServer(3201);
//
// 	wsServer.getEvents().CONNECTION_OPENED.subscribe(async (connection: CommandSocket) => {
//
// 		console.log("New connection acquired.");
//
// 		connection.getEvents().MESSAGE.subscribe((data: any): void => console.log("\n" + data));
//
// 		let myVal: boolean = connection.invoke(
// 			"clear", {
// 				paramC: ["hello there", "what"],
// 				paramD: true
// 			});
//
// 		myVal;
//
// 		while (true) {
//
// 			let input: string = await prompt("> ");
//
// 			if (input !== "exit") connection.send(input);
// 			else break;
//
// 		}
//
// 		wsServer.close();
//
// 	});
//
// };
//
// main();
//
// const prompt: (inquiry: string) => Promise<string> = async (inquiry: string): Promise<string> => {
//
// 	return new Promise<string>((resolve: (response: string) => any): void => {
//
// 		readline.createInterface(process.stdin, process.stdout).question(inquiry, (answer: string): void => resolve(answer));
//
// 	});
//
// };