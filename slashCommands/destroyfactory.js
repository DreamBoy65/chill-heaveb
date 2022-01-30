let Schema = require("../models/UserProfile")
module.exports = {
  name: "destroyfactory",
  description: "Destroy your own factory.",
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
      
      if(!data.id || !data.factory?.owner) return interaction.error("You don't have any factory!")
      
      data.id = null
      data.factory.owner = null
      data.factory.workers.forEach(async c => {
        let d3 = await Schema.findOne({_id: c})
        d3.id = null
        d3.factory.owner = null
        await d3.save()
      })
      data.factory.workers = []
      await data.save()
      
      interaction.success("Your factory destroyed!")
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
