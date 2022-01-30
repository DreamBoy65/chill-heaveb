const Schema = require("../models/UserProfile")

module.exports = {
  name: "cash",
  description: "Check your cash .",
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
      
      interaction.success(`${interaction.user.tag} have **${formatNumber(data.cash)}** cash.`)
      
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