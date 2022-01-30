module.exports = {
  name: "work",
  description: "Work in your factory.",
  cooldown: {
    time: 600000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  run: async(client, interaction) => {
    try {
      let data = await client.findUser(interaction.user.id)
      
      if(!data) return interaction.error("Start a factory by typing - /start")
      
      if(!data.id) return interaction.error("You are not in a factory!")
      
      let d2 = await client.findUser(data.factory.owner)
      
      let money = getRandomInt(450, 600)
      let owm = Math.floor(money / 85)
      
      if(data.multiplier.time >= 1) {
        money = money * data.multiplier.time
        data.multiplier.used = data.multiplier.used + 1
        
        if(data.multiplier.used >= data.multiplier.moves) {
          data.multiplier.time = 0
          data.multiplier.used = 0
          data.multiplier.moves = 0
          
          interaction.followUp("Your Boost Ended!")
        }
      }
      
      data.cash = data.cash + money
      
      if(d2.factory.owner !== data._id) {
        d2.cash = d2.cash + owm
        await d2.save()
      }
      
      await data.save()
      
      interaction.success(`You worked in factory and earned ${formatNumber(money)} \n${data.multiplier.time ? `Boosted by ${data.multiplier.time} and ${data.multiplier.moves - data.multiplier.used} moves left!` : ""}`)
      
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
} 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatNumber(number, minimumFractionDigits = 0) {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2
  });
}