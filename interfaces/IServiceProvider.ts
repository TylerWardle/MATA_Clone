///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

export interface IServiceProvider
{
	create(req:any, res:any): Boolean;
	
	read(req:any, res:any): Boolean;
	
	update(req:any, res:any): Boolean;
	
	remove(req:any, res:any): Boolean;
}	
