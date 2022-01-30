let Schema = require("../models/UserProfile")
module.exports = {
  name: "buildfactory",
  description: "Build your own factory.",
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
        name: "name",
        description: "Name of the factory!",
        required: true
      }
    }
  ],
  run: async(client, interaction) => {
    try {
      let name = interaction.options.getString("name")
      
      let data = await client.findUser(interaction.user.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      
      if(data.id || data.factory?.owner) return interaction.error("You already have a working factory.")
      
      if(data.cash < client.config.costs.factory) return interaction.error("You dont have enough cash.\nCash needed " + `${formatNumber(client.config.costs.factory)}`)
      
      data.id = interaction.user.id
      data.cash = data.cash - client.config.costs.factory
      data.factory.owner = interaction.user.id
      data.factory.name = name
      
      await data.save()
      
      interaction.success("Your factory is ready!")
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
