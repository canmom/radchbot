# radchbot
A simple Discord chat bot for the Radchdome community.
## Instalation and use
1. First, install the dependencies with `npm install`
2. Create a [discord app](https://discordapp.com/developers/applications/me) and add a bot user. Add the token to token.js where it says `YOUR TOKEN HERE`
3. Run `node core.js` to start the bot
4. Open `https://discordapp.com/oauth2/authorize?client_id=YOURCLIENTIDHERE&scope=bot&permissions=0` in your browser (where YOURCLINETID is substituded with your apps client id) and add your bot to any servers you have control over
5. Give your bot a nickname with !nickname (assuming you've not removed that command)
