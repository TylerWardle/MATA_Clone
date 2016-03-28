///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
var ChatClient = (function () {
    function ChatClient(mongoose) {
        this.mongoose = mongoose;
        var db = mongoose.connection;
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
        if (ChatClient.client == null) {
            ChatClient.client = mongoose.model('client', clientSchema);
            var clientSingelton = new ChatClient.client({ _id: 1,
                lastMessageDate: Date(),
                messages: []
            });
            clientSingelton.save();
        }
    }
    ChatClient.client = null;
    return ChatClient;
})();
exports.ChatClient = ChatClient;
