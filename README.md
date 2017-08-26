# radchbot
A bot for the Discord chat service, with a modular structure. The bot was first developed for a group of fans of Ann Leckie's *Imperial Radch* books, but it has since broadened.

## What is Discord?
[Discord](https://discordapp.com/) is a chat service similar to IRC or Slack, combined with a voice chat system. It's become increasingly popular for fandom and gaming.

## Features
Type !help to get a list of commands.

By module...

- utility: quit or change features on the bot
- dice: allows pseudorandom rolling of complex dice expressions
- songs: prints the lyrics to songs from the Imperial Radch books into chat
- meta: allows repetition and manipulation of commands, and adding simple text commands
- menus: allows other modules to generate menus of options for specific users
- cafe: a simple module to demonstrate the use of menus
- cookies: a toy module for giving other users cookies
- logger: allows messages in a channel to be logged as HTML for publication on another website.

## Instalation and use
1. First, install the dependencies with `npm install`
2. Create a [discord app](https://discordapp.com/developers/applications/me) and add a bot user. Add the token to token.js.sample where it says `YOUR TOKEN HERE`, and save as token.js
3. Run `node core.js` to start the bot
4. Open `https://discordapp.com/oauth2/authorize?client_id=YOURCLIENTIDHERE&scope=bot&permissions=0` in your browser (where YOURCLINETID is substituded with your apps client id) and add your bot to any servers you have control over
5. Give your bot a nickname with !nickname (assuming you've not removed that command)

## Modules used
The code largely uses [discord.js](https://discord.js.org/) to provide access to the API. The logging module additionally depends on [Winston](https://github.com/winstonjs/winston).

## Structure
Radchbot uses node.js module syntax to separate out functionality. The file `template.js` in the modules folder gives the basic structure of a module.

Modules should import `command.js` and return in `module.exports` a `name` (which will be logged in the console), `commands` with an array of `Command.Command` objects (or one of its subclasses).

## Todo
Implement linting.