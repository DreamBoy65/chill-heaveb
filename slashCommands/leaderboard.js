const Schema = require("../models/UserProfile")
const { Collection } = require("discord.js")

module.exports = {
  name: "leaderboard",
  description: "Leaderboard of cash and factory!",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  options: [
    {
      "StringChoices": { 
        name: "choice", 
        description: "Choice .", 
        required: true, 
        choices: [["Cash", "cash"], ["Factory", "factory"]] 
      }
    },
  ],
  run: async(client, interaction) => {
    try {
      let data = await client.findUser(interaction.user.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      
      let datas = await Schema.find({})
      
      await datas.forEach(async c => {
        await client.users.fetch(c._id)
      })
      
      delay(5000)
      
      let type = interaction.options.getString("choice")
      let collection = new Collection()
      
      if(type === "cash") {
        
        datas.map(c => {
        collection.set(c._id, {
          user: client.users.cache.get(c._id)?.tag,
          cash: c.cash
        })
      })
      
      let Data = collection.sort((a, b) => b.cash - a.cash).first(10)
      
      interaction.sendE(`${Data.map((m, i) => `**${i+1}• ${m.user}\n${client.emoji.arrow} ${formatNumber(m.cash)}**`).slice(0, 3).join("\n")}\n\n${Data.map((m, i) => `${i+1}• ${m.user}\n${client.emoji.arrow} ${formatNumber(m.cash)}`).slice(3).join("\n")}`)
      } else if(type === "factory") {
        
        datas.filter(c => c.factory.owner).map(c => {
        collection.set(c._id, {
          user: `${c.factory.name} | ${c.id}`,
          cash: c.factory.level,
          members: `${c.factory.workers.length}/${c.factory.limit}`
        })
      })
      
      let Data = collection.sort((a, b) => b.cash - a.cash).first(10)
      
      interaction.sendE(`${Data.map((m, i) => `**${i+1}• ${m.user}\n${client.emoji.arrow} ${formatNumber(m.cash)} (${m.members})**`).slice(0, 3).join("\n")}\n\n${Data.map((m, i) => `${i+1}• ${m.user}\n${client.emoji.arrow} ${formatNumber(m.cash)} (${m.members})`).slice(3).join("\n")}`)
      }
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatNumber(number, minimumFractionDigits = 0) {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2
  });
}