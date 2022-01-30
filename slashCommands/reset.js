module.exports = {
  name: "reset",
  description: "Reset all data.",
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
      
      let msg = await interaction.sendE("Are you sure ?")
      
      let id = await client.col.verify(msg, interaction.user, 30000)
      
      if(id === "YES") {
        let d2 = await client.findUser(data.factory?.owner)
        if(d2) {
          if(d2.id === interaction.user.id) {
            d2.factory.workers.forEach(async c => {
              let d3 = await Schema.findOne({_id: c})
              d3.id = null
              d3.factory.owner = null
              await d3.save()
            })
          } else {
            d2.factory.workers = d2.factory.workers.filter(c => c !== interaction.user.id)
            await d2.save()
          }
        }
        await data.delete()
        return interaction.success("Successfully deleted your data.")
      }
      
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
