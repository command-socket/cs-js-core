/*
 *	Created by Trevor Sears <trevorsears.main@gmail.com>.
 *	5:19 PM -- November 25th, 2019.
 *	Project: CommandSocket - Core
 */

type Person = {
	name: string,
	age: number,
	address: string
};

interface CollectionOfPeople {
	
	[name: string]: Person;
	
}

const BaseCollectionOfPeople: CollectionOfPeople = {
	
	steve: {
		
		name: "steve",
		age: 27,
		address: "101 Fake Address Ave."
		
	}
	
};

class MyGenericClass<
	T1 extends CollectionOfPeople = any,
	T2 extends CollectionOfPeople & typeof BaseCollectionOfPeople = T1 & typeof BaseCollectionOfPeople> {
	
	public getPerson<P extends keyof T2 = keyof T2>(person: P): Person {
		
		return undefined as unknown as Person;
		
	}
	
}

let obj: MyGenericClass = new MyGenericClass();

obj.getPerson("alice"); // No error here...