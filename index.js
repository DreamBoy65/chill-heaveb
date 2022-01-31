const Bot = require("./struct/client");

const client = new Bot();

const options = {
  bypass: true,
  log: true,
  paths: []
};

client.loadCommands({ 
  parent: 'commands', 
  ...options 
});

client.loadEvents({ 
  parent: 'events', 
  ...options,
  dirs: ["client", "guild"]
});

if(client.config.SlashCommands) {
  client.loadSlash()
}

client.database?.init()

require("./website")

if(client.config.antiCrash) {
  client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
  ], { ignore: false });
}

client.login(client.config.client.token)