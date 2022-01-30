const Schema = require("../models/UserProfile")

module.exports = {
  name: "start",
  description: "Create an account!",
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
      
      if(data) return interaction.error("You already have an account 🏭 ")
      
      await new Schema({_id: interaction.user.id}).save()
      
      interaction.success("Account created.")
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
}