/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	8:07 PM -- October 29th, 2019.
 *	Project: @command-socket/core
 */

export function generateID(length: number): string {
	
	let result: string = "";
	
	while (result.length < length) {
		
		let random: number = Math.floor(Math.random() * 62);
		
		if (random < 26) result += String.fromCharCode(random + 97);
		else if (random < 52) result += String.fromCharCode(random + 65 - 26);
		else result += (random - 52).toString();
		
	}
	
	return result;
	
}