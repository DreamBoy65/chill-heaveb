const Schema = require("../models/UserProfile")

module.exports = {
  name: "leave",
  description: "Leave your factory.",
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
      
      if(!data) return interaction.error("Create an account by typing - /start")
      
      let id = data.factory?.owner
      
      let Data = await Schema.findOne({_id: id})
      
      if(!Data) return interaction.error("You are not in the factory!")
      
      if(Data.factory?.owner === interaction.user.id) return interaction.error("You can't leave your factory!")
      
      await client.users.fetch(Data._id)
      
      data.id = null
      data.factory.owner = null
      
      await data.save()
      
      Data.factory.workers = Data.factory.workers.filter(c => c !== interaction.user.id)
      
      await Data.save()
      
      interaction.success(`You left ${client.users.cache.get(Data._id).tag}'s factory!`)
      
      } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
