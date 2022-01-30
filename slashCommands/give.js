module.exports = {
  name: "give",
  description: "Give cash to someone.",
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
        description: "User to give cash!",
        required: true
      }
    },
    {
      "Integer": {
        name: "amount",
        description: "Amount of coins to give!",
        required: true
      }
    }
  ],
  run: async(client, interaction) => {
    try {
      let am = interaction.options.getInteger("amount")
      let user = interaction.options.getUser("user")
      
      let data = await client.findUser(interaction.user.id)
      let d2 = await client.findUser(user.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      
      if(!d2) return interaction.error(`${user.tag} does not have any account!`)
      
      if(am > data.cash) return interaction.error("You dont have enough cash!")
      
      data.cash = data.cash - am
      d2.cash = data.cash + am
      
      await data.save()
      await d2.save()
      
      interaction.success(`Given ${formatNumber(am)} to ${user.tag}`)
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