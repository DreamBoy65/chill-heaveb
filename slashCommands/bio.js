module.exports = {
  name: "bio",
  description: "Change your profile bio!",
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
        name: "bio",
        description: "Bio to change",
        required: true
      }
    }
  ],
  run: async(client, interaction) => {
    try {
      let bio = interaction.options.getString("bio")
      
      let data = await client.findUser(interaction.user.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      data.bio = bio
      
      await data.save()
      
      interaction.success("Your bio is now  \n\n" + bio)
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
