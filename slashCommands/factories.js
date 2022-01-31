const Pages = require("../util/pages")
const _ = require("lodash")
const Schema = require("../models/UserProfile")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "factories",
  description: "Get a list of all factories!",
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
      
      const pages = new Pages()
      
      let d2 = await Schema.find()
      d2 = d2.filter(c => c.id && c.owner.id === c._id)
      
      let des = _.chunk(d2.map(c => {
        return `• Name:\n${client.emoji.arrow} ${c.factory.name}\n• ID:\n${client.emoji.arrow} ${c.id}\n• Workers:\n${client.emoji.arrow} ${c.factory.workers.length}/${c.factory.limit}`
      }), 5)
      
      
      
      des.forEach(d => pages.add(new MessageEmbed()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    .setDescription(d.join("\n\n"))
    .setColor("RANDOM")
       .setFooter({ text: `\©${new Date().getFullYear()} ${client.user.username}` })
    .setTimestamp()))
    
    let msg = await interaction.followUp({embeds: [pages.firstPage]})
    
    await client.col.pagesCollector(msg, interaction.user, 30000, pages)
    
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e.stack).bgRed)
    }
  }
} 
