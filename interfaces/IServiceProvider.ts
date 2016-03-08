///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

export interface IServiceProvider
{
	create(db:any, req:any, res:any): Boolean;
	
	read(db:any, req:any, res:any): Boolean;
	
	update(db:any, req:any, res:any): Boolean;
	
	remove(db:any, req:any, res:any): Boolean;
}	
