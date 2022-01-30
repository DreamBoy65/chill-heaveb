module.exports = {
    
    client: {
      presence: {
        activity: {
          name: "Build factories | By dream-prince",
          type: "WATCHING"
        }, 
      status: "dnd"
      },
      token: "OTM3MjM2NjMzODIzMTA1MDI0.YfYzog.zthX0f8UJkWYMda5nOa_pQWAkRU"
    },
    prefix: ".",
    support: "https://discord.gg/pwAXkpsCHf",
    invite: "https://dsc.gg/factory.gg",
    loadSlashsGlobal: false,
    slashCommandsDirs: [
      {
        Folder: "",
        CmdName: "",
        CmdDescription: ""
      }
    ],
    SlashCommands: true,
    antiCrash: true,
    timezone: "Asia/Calcutta",
    
    channels: {
        debug: "924076193253326869",
        guildJoin: "924076079839346709",
        guildLeave: "924076132846948412",
        feedback: "924076275893674025",
        commands: "924076446689939556"
    },
    
    costs: {
      factory: 1000000
    },
    boosts: {
      1: {
        multi: 2,
        cost: 10000
      },
      2: {
        multi: 5,
        cost: 100000
      },
      3: {
        multi: 10,
        cost: 1000000
      },
    },
    
    owners: [ "813299347819069520" ],

    database: {
        enable: true,
        uri: "mongodb+srv://f:f@cluster0.9pwp1.mongodb.net/factory?retryWrites=true&w=majority",
        config: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4
        }
    },
}