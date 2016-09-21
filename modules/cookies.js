const Command = require('../command');

var cookies = new Map();

function cookieInit(user) {
    if(!cookies.has(user)) {
        cookies.set(user,0);
    }
}

function giveCookies(args,message) {
    var reply = "Cookie time!\n";
    var sender = message.author;
    message.mentions.users.forEach(function(user) {
        cookieInit(user);
        cookies.set(user,cookies.get(user)+1);
        reply += `${sender} has given a cookie to ${user}! ${user} now has ${cookies.get(user)} cookies.\n`;
    });
    
    return reply;
}

function checkCookies(args,message) {
    var user = message.author;
    cookieInit(user);
    return `${user} has ${cookies.get(user)} cookies!`
}

module.exports = {
    name: "Cookies",
    commands: [
        new Command.SayCommand(
            "givecookie",
            "Give cookies to people you mention!",
            giveCookies
        ),
        new Command.Command(
        	"checkcookie",
        	"Checks your cookies.",
        	checkCookies
        ),
    ]
}