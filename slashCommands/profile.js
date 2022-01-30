const Schema = require("../models/UserProfile")

module.exports = {
  name: "profile",
  description: "Check profile .",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  options: [
    {
      "User": {
        name: "user",
        description: "User to check profile.",
        required: false
      }
    }
  ],
  run: async(client, interaction) => {
    try {
      let user = interaction.options.getUser("user")
      
      if(!user) {
        user = interaction.user
      }
      let data = await client.findUser(user.id)
      
      if(!data) return interaction.error("Create an account by typing - /start")
      
      let d2 = await Schema.findOne({id: data.id})
      
      if(data.id && d2) {
        await client.users.fetch(d2.factory.owner)
      }
      
      interaction.sendE(`> • ${data.bio} •\n\n• User:\n${client.emoji.arrow} ${user.tag}\n• Created:\n${client.emoji.arrow} <t:${Math.floor(data.created / 1000)}:F> • (<t:${Math.floor(data.created / 1000)}:R>)\n• Cash:\n${client.emoji.arrow} ${formatNumber(data.cash)}${data.multiplier.time ? `\n• Boost\n${client.emoji.arrow} ${data.multiplier.time}x • (${data.multiplier.used}/${data.multiplier.moves})` : ""}${d2.factory?.owner ? `\n\n> • Factory •\n• Name:\n${client.emoji.arrow} ${d2.factory.name}\n• Owner:\n${client.emoji.arrow} ${client.users.cache.get(d2.factory?.owner)?.tag}\n• Workers:\n${client.emoji.arrow} ${d2.factory?.workers?.length}/${d2.factory?.limit}\n• Level:\n${client.emoji.arrow} ${d2.factory?.level}\n• ID:\n${client.emoji.arrow} ${d2.id}` : "\n\n> Type /join {id} to join factory."}`, {
        thumbnail: user.displayAvatarURL({ dynamic: true })
      })
      
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e.stack).bgRed)
    }
  }
}

function formatNumber(number, minimumFractionDigits = 0) {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2
  });
}