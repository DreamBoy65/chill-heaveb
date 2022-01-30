const Pages = require("../util/pages")
const _ = require("lodash")
const Schema = require("../models/UserProfile")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "workers",
  description: "Get a list of all workers!",
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
      
      let des;
      if(!data.id) return interaction.error("You are not in a factory!")
      
      let d2 = await Schema.findOne({_id: data.factory.owner})
      
      if(d2?.factory.workers.length < 1) return interaction.error("No workers in this factory!")
      
      d2.factory.workers.forEach(async c => await client.users.fetch(c))
      
      des = _.chunk(d2?.factory.workers.map(c => {
        return `• ${client.emoji.worker}\n${client.emoji.arrow} ${client.users.cache.get(c)?.tag}`
      }), 10)
      
      
      des.forEach(d => {
        pages.add(new MessageEmbed()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(`• ${d2.factory.workers.length}/${d2.factory.limit} •\n${d.join("\n\n")}`)
        .setColor("RANDOM")
        .setFooter({ text: `\©${new Date().getFullYear()} ${client.user.username}` })
        .setTimestamp()
        .addField(`> • List •`, `${client.emoji.worker}`.repeat(d.length))
        )
      })
    
    let msg = await interaction.followUp({embeds: [pages.firstPage]})
    
    await client.col.pagesCollector(msg, interaction.user, 30000, pages)
    
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e.stack).bgRed)
    }
  }
} 
