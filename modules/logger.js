const Command = require('../command');
const Bot = require('../bot');
const fs = require('fs');
const winston = require('winston')

const commands = [];
const activeLogs = [];

function formatFilename(filename) {
  return 'logs/' + filename + (filename.endsWith('.md') ? '' : '.md');
}

class Log {
  constructor(channel, filename) {
    this.channel = channel;
    this.startTime = new Date()
    this.filename = formatFilename(filename);
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
        if (message.content.startsWith(">")) {
          this.logger.log('info',`\n${message.content}\n`);
        } else {
          this.logger.log('info',`- ${message.author.username}: ${message.content}`)
        }
      }
    }

    Bot.bot.on('message', this.log);
  }

  shutdown() {
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
    "End logging to a given file.",
    (filename,message) => {
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