const Command = require('../command');
const Bot = require('../bot');
const fs = require('fs');
const winston = require('winston')

const commands = [];
const activeLogs = [];

function formatFilename(filename) {
  return 'logs/' + filename + (filename.endsWith('.html') ? '' : '.html');
}

class Log {
  constructor(channel, filename) {
    this.channel = channel;
    this.startTime = new Date()
    this.filename = formatFilename(filename);
    this.groupOwner = null;
    this.inList = false;
    this.personString = null;
    this.users = new Map();
    this.knownUsers = 0;
    this.logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({
          filename: this.filename,
          json: false,
          timestamp: false,
          showLevel: false
        })
      ]
    });

    this.log = (message) => {
      if (message.channel === this.channel) {
        this.logMessage(message);
      }
    }

    Bot.bot.on('message', this.log);
  }

  beginList() {
    this.logger.log('info','<ul class="chat">')
    this.inList = true;
  }

  endList() {
    this.inList = false;
    this.logger.log('info','</ul>')
  }

  beginGroup(message) {
    if (!this.users.has(message.author)) {
      this.knownUsers += 1;
      this.users.set(message.author,`person${this.knownUsers}`);
    }
    this.groupOwner = message.author;
    this.personString = this.users.get(message.author);
    this.logger.log('info',`  <li class=${this.personString}>`);
  }

  endGroup() {
    this.groupOwner = null;
    this.personString = null;
    this.logger.log('info',"  </li>")
  }

  logQuote(message) {
    if (this.groupOwner) {
      this.endGroup();
      this.endList();
    }
    this.logger.log('info',`\n<blockquote>${message.content.slice(2)}</blockquote>\n`);
  }

  logMessage(message) {
    if (message.content.startsWith(">")) {
      this.logQuote(message);
    } else if (message.content.startsWith("#") || message.content.startsWith("!") || message.author.username === "radchdome-diceroller") {
      null;
    } else {
      if (message.author !== this.groupOwner) {
        if (this.inList) {
          this.endGroup();
        } else {
          this.beginList();
        }
        this.beginGroup(message);
        this.logger.log('info',`    <p><strong class="name">${message.author.username}:</strong> ${message.content}</p>`)
      } else {
        this.logger.log('info',`    <p>${message.content}</p>`)
      }
    }
  }

  shutdown() {
    if (this.groupOwner) {
      this.endGroup();
      this.endList();
    }
    Bot.bot.removeListener('message',this.log);
    this.logger.close();
  }

  info() {
    return `${this.channel.name} is being logged in ${this.filename}`;
  }
}

commands.push(
  new Command.Command(
    "beginlog",
    "Begin logging messages in the same channel as the command.",
    (filename, message) => {
      const log = new Log(message.channel, filename);
      activeLogs.push(log);
      return `logging beginning in file ${log.filename}`
    }
  )
);

commands.push(
  new Command.Command(
    "endlog",
    "End logging in all files (no argument) or to a given file.",
    (filename,message) => {
      if (filename) {
        filename = formatFilename(filename);
        let exists = false;
        let index = activeLogs.length - 1;
        while (index >= 0) {
          let log = activeLogs[index];
          if (log.filename == filename) {
            log.shutdown();
            exists = true;
            activeLogs.splice(index, 1);
          }
          index -= 1;
        }
        if (exists) {
          return `stopped logging in file ${filename}`
        } else {
          return `could not find file ${filename}`
        }
      }
      else {
        activeLogs.forEach((log) => {
          log.shutdown();
        });
        activeLogs.length = 0;
        return "Closed all logs."
      }
    }
  )
);

commands.push(
  new Command.Command(
    "listlogs",
    "List currently active logs.",
    () => {
      if (activeLogs.length) {
        let answer = "";
        activeLogs.forEach((log) => {
          answer += log.info() + "\n";
        })
        return answer;
      } else {
        return "no currently active logs!"
      }
    }
  )
);

module.exports = {
  name: "Logger",
  commands: commands
};