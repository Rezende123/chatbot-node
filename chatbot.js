var restify = require('restify');
var builder = require('botbuilder');
var conversation = require('./conversation-tree');

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector();

server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector, function (session) {
    const response = conversation(session.message.text);

    response.forEach(res => {
        session.send(res);
    });
});