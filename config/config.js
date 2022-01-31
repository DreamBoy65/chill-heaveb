module.exports = {
    
    client: {
      presence: {
        activity: {
          name: "Build factories | By dream-prince",
          type: "WATCHING"
        }, 
      status: "dnd"
      },
      token: process.env.TOKEN
    },
    prefix: ".",
    support: "https://discord.gg/pwAXkpsCHf",
    invite: "https://dsc.gg/factory.gg",
    loadSlashsGlobal: true,
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
        debug: "937316311560753172",
        guildJoin: "937316217348304977",
        guildLeave: "937316265259839510",
        feedback: "937316380678688798",
        commands: "937316499360710656"
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
        uri: process.env.MONGO_URI,
        config: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4
        }
    },
}