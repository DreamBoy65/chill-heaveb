let Schema = require("../models/UserProfile")
module.exports = {
  name: "upgradefactory",
  description: "Upgrade your own factory.",
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
      
      if(!data.id || !data.factory?.owner) return interaction.error("You dont have any factory!")
      
      let cost = 500000 * Math.floor(data.factory.level + 1)
      
      if(data.cash < cost) return interaction.error("You dont have enough cash.\nCash needed " + `${formatNumber(cost)}`)
      
      data.cash = data.cash - cost
      data.factory.level = data.factory.level + 1
      data.factory.limit = data.factory.limit + 10
      
      await data.save()
      
      interaction.success(`You factory is now level ${data.factory.level} and total ${data.factory.limit} workers limit!`)
      
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