///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>

export class ChatClient{   
    private static client: any = null;  
    private static mongoose: any;
    private static ChatClientSchema: any;

    constructor(mongoose: any){
        ChatClient.mongoose = mongoose;
        //var db = mongoose.connection;
        
        var messageSchema = mongoose.Schema({
            message         : { type : String },
            userName        : { type : String },
            date            : { type : Date, default: Date.now }
            });
        
        var clientSchema = mongoose.Schema({
            _id             : {type : Number},
            lastMessageDate : {type : Date},
            messages        : [messageSchema]
            });
        
        ChatClient.ChatClientSchema = clientSchema; 
//        if (ChatClient.client == null){
//            ChatClient.client = mongoose.model('client', clientSchema);
//            
//            var clientSingelton = new ChatClient.client({   _id: 1,
//                                                            lastMessageDate: Date(),
//                                                            messages: []
//                                                        });
//            clientSingelton.save();
//        }
        
    }
    
    //Get instance of chat client if it exists otherwise create and return a new one.
    public static getInstance(mongoose: any):ChatClient{
        var client = new ChatClient(mongoose);
        if (this.client == null){
            this.client = this.mongoose.model('client', this.ChatClientSchema);
            var clientSingelton = new ChatClient.client({   _id: 1,
                                                            lastMessageDate: Date(),
                                                            messages: []
                                                        });
            clientSingelton.save();
        }
        return ChatClient.client    
    }
            
}