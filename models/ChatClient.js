///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var ChatClient = (function () {
    function ChatClient(mongoose) {
        ChatClient.mongoose = mongoose;
        //var db = mongoose.connection;
        var messageSchema = mongoose.Schema({
            message: { type: String },
            userName: { type: String },
            date: { type: Date, default: Date.now }
        });
        var clientSchema = mongoose.Schema({
            _id: { type: Number },
            lastMessageDate: { type: Date },
            messages: [messageSchema]
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
    ChatClient.getInstance = function (mongoose) {
        var client = new ChatClient(mongoose);
        if (this.client == null) {
            this.client = this.mongoose.model('client', this.ChatClientSchema);
            var clientSingelton = new ChatClient.client({ _id: 1,
                lastMessageDate: Date(),
                messages: []
            });
            clientSingelton.save();
        }
        return ChatClient.client;
    };
    ChatClient.client = null;
    return ChatClient;
})();
exports.ChatClient = ChatClient;
