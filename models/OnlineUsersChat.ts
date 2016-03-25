///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>


export class OnlineUsersChat 
{
	private _messages: Thing[];
	private _onlineUsers: Thing[];
	private _newMessagesFlag: Boolean;

    constructor() {}

    getUsername(): string {}

	getListOfOnlineUsers():array {}
	
	getListOfChatMessage():array {}
	
	addUserToOnlineList() {}
	
	removeUserFromOnlineList() {}
}

class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }
}