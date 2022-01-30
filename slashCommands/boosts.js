const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
  name: "boosts",
  description: "Boost your work!",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  run: async(client, interaction) => {
    try {
      let data = await client.findUser(interaction.user.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      
      if(data.multiplier.time) return interaction.error("You already have a working boost!")
      
      let btn1 = new MessageButton()
      .setLabel("1")
      .setCustomId("1")
      .setStyle("DANGER")
      
      let btn2 = new MessageButton()
      .setLabel("2")
      .setCustomId("2")
      .setStyle("DANGER")
      
      let btn3 = new MessageButton()
      .setLabel("️️3")
      .setCustomId("3")
      .setStyle("DANGER")
      
      let row = new MessageActionRow()
      .addComponents(btn1, btn2, btn3)
      
      let embed = new MessageEmbed()
      .setTitle("Boosts Shop!")
      .setDescription(`${Object.keys(client.config.boosts).map(c => {
        return `• ${c} => ${client.config.boosts[c].multi}x\n${client.emoji.arrow} ${formatNumber(client.config.boosts[c].cost)}\n\n`
      }).join("")}`)
      .setFooter({ text: `©${new Date().getFullYear()} - ${client.user.username}` })
      .setColor("RANDOM")
      
      let filter = i => i.user.id === interaction.user.id
      
      interaction.followUp({embeds: [embed],  components: [row]}).then(async i => {
        await i.awaitMessageComponent({filter, componentType: "BUTTON",  max: 1, time: 30000}).then(async c => {
          let item = client.config.boosts[parseInt(c.customId)]
          
          if(item.cost > data.cash) return c.reply("You dont have enough cash!")
          
          data.multiplier.time = item.multi
          data.multiplier.moves = 20
          
          await data.save()
          
          c.reply("You Bought boost!")
        }).catch(() => null)
      })
      
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
function formatNumber(number, minimumFractionDigits = 0) {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2
  });
}