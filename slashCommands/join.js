const Schema = require("../models/UserProfile")

module.exports = {
  name: "join",
  description: "Join a factory by code.",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  options: [
    {
      "String": {
        name: "ID",
        description: "ID of the factory.",
        required: true
      }
    }
  ],
  run: async(client, interaction) => {
    try {
      let id = interaction.options.getString("id")
      id = parseInt(id)
      
      let data = await client.findUser(interaction.user.id)
      
      if(!data) return interaction.error("Create an account by typing - /start")
      
      let Data = await Schema.findOne({id: id})
      
      if(!Data) return interaction.error("Not a valid ID")
      
      if(data.factory?.owner || data.id === id) return interaction.error("You are already in a factory. /leave to leave.")
      
      if(Data.factory?.workers?.length >= Data.limit) return interaction.error("That factory has reached its limit!")
      
      await client.users.fetch(Data.factory?.owner)
      
      data.id = id
      data.factory.owner = Data.factory?.owner
      
      await data.save()
      
      let d2 = await Schema.findOne({_id: Data.factory?.owner})
      
      d2.factory.workers?.push(interaction.user.id)
      await d2.save()
      
      interaction.success(`${client.users.cache.get(d2._id).tag} hired you as a worker!`)
      
      } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
}