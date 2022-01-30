module.exports = {
  name: "factoryinfo",
  description: "Get info about your factory!",
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
        description: "ID of the factory!",
        required: false
      }
    }
  ],
  run: async(client, interaction) => {
    try {
      let ID = interaction.options.getString("id")
      if(!ID) {
        ID = interaction.user
      }
      
      let data = await client.findUser(ID.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      
      if(!data.id) return interaction.error("Invalid ID")
      
      let d2 = await client.findUser(data.factory.owner)
      
      await client.users.fetch(data.factory.owner)
      
      interaction.sendE(`• Factory Info •\n\n• Name:\n${client.emoji.arrow} ${d2.factory.name}\n• Owner:\n${client.emoji.arrow} ${client.users.cache.get(d2.factory.owner)?.tag}\n• Workers:\n${client.emoji.arrow} ${d2.factory.workers.length}/${d2.factory.limit}\n• Level:\n${client.emoji.arrow} ${d2.factory.level}`, {
        thumbnail: "https://cdn.discordapp.com/emojis/934992943234809956.png?v=1"
      })
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 
