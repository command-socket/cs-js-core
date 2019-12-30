/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	1:15 PM -- October 22nd, 2019.
 *	Project: @command-socket/core
 */

import {
	ObjectTypeDefinition,
	Type,
	SpecialType,
	StandardType,
	EnumType,
	OrType,
	ObjectType
} from "typit";

/**
 * A typit {@link ObjectTypeDefinition} for checking the structure of incoming {@link CommandSocketMessage}s.
 *
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export class MessageDefinition implements ObjectTypeDefinition {
	
	public constructor(parametersType: Type = SpecialType.ANY, returnType: Type = SpecialType.ANY) {
		
		this.parameters = parametersType;
		this.return = returnType;
		
	}
	
	public readonly command: Type = StandardType.STRING;
	
	public readonly meta: ObjectTypeDefinition = {
		
		correspondenceID: StandardType.STRING,
		
		didError: StandardType.BOOLEAN,
		
		mode: new EnumType(["request", "response"]),
		
		request: CommandSocketIdentityDefinition,
		
		response: new OrType(SpecialType.NULL, new ObjectType(CommandSocketIdentityDefinition)),
		
		timeline: {
			
			requestSent: StandardType.NUMBER,
			
			requestReceived: new OrType(SpecialType.NULL, StandardType.NUMBER),
			
			responseSent: new OrType(SpecialType.NULL, StandardType.NUMBER),
			
			responseReceived: new OrType(SpecialType.NULL, StandardType.NUMBER)
			
		}
		
	};
	
	public readonly parameters: Type;
	
	public readonly return: Type;
	
	[property: string]: Type | ObjectTypeDefinition;
	
}

export const CommandSocketIdentityDefinition: ObjectTypeDefinition = {
	
	id: StandardType.STRING,
	
	ip: StandardType.STRING
	
};