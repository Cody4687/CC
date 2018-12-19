const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({
  disableEveryone: true
});
bot.commands = new Discord.Collection();


var fs = require('fs');

const math = require('mathjs')

function requireUncached(module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}


bot.on("ready", () => {
  console.log('bot is online!');
});

bot.on("message", message => {

  var prefix = botconfig.prefix;
  var messageArray = message.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);

  try {
    if (cmd === '/new') {


      fs.writeFileSync(`./CCoins/${message.author.id}.json`, `{
          "amount": "0",
          "status": "true"}`

      )
      message.channel.send(`Account Opened`)

    };


    if (cmd === '/credit') {
      var ids = ["449584221225222154"];
      var a = ids.indexOf(message.author.id);
      if (a == -1) {
        return
      };


      const json = requireUncached(`./CCoins/${message.mentions.users.first().id}.json`)
      let e = ((math.eval(`${json.amount} + ${args[1]}`)))

      fs.writeFileSync(`./CCoins/${message.mentions.users.first().id}.json`, `{
  "amount": "${e}",
  "status": "true"}`

      )

      message.channel.send(`Credited!`)
    };



    if (cmd === '/pay') {
      const json1 = requireUncached(`./CCoins/${message.author.id}.json`)
      const json2 = requireUncached(`./CCoins/${message.mentions.users.first().id}.json`)
            var inStr = args[0];
      var justOneDot = inStr.replace(/[.](?=.*?\.)/g, '');
      var outStr = parseFloat(justOneDot.replace(/[^0-9.]/g, ''));
      if ((math.eval(`${json1.amount} - ${outStr}`)) < 1) {
        return ("you do not have the funds atm fag")
      }


      let give = math.chain(json2.amount)
        .add(outStr)
        .done()
      let get = math.chain(json1.amount)
        .subtract(outStr)
        .done()



      if (json1.amount != undefined) {
        fs.writeFileSync(`./CCoins/${message.author.id}.json`, `{
"amount": "${get}",
"status": "true"}`

        )
      }
      if (json2.amount != undefined) {
        fs.writeFileSync(`./CCoins/${message.mentions.users.first().id}.json`, `{
  "amount": "${give}",
  "status": "true"}`

        )
      }
      message.channel.send(`Paid ${args[1]} to ${args[0]}!`)
    };
    if (cmd === `/balance`) {
      let json = requireUncached(`./CCoins/${message.author.id}.json`)
      message.channel.send(`You have ${json.amount} CCoins!`)
    };

    if (cmd === `/50-50`) {
      const json = requireUncached(`./CCoins/${message.author.id}.json`)
      let e = (Math.random())
      var inStr = args[0];
      var justOneDot = inStr.replace(/[.](?=.*?\.)/g, '');
      var outStr = parseFloat(justOneDot.replace(/[^0-9.]/g, ''));
      if ((math.eval(`${json.amount} - ${outStr}`)) < 1) {
        return;
      }
      if (e > 0.5) { //lose
              if ((math.eval(`${json.amount} - ${outStr}`)) < 1) {
        return;
      }
        console.log("you lose, " + e)
        message.channel.send(`You lost ${outStr} CCoins!`)
        let lose = math.chain(json.amount)
          .subtract(outStr)
          .done()
        fs.writeFileSync(`./CCoins/${message.author.id}.json`, `{
          "amount": "${lose}",
          "status": "true"}`)
      }
      if (e < 0.5) { //win
              if ((math.eval(`${json.amount} - ${outStr}`)) < 1) {
        return;
      }
        console.log("you win, " + e)
        message.channel.send(`You won ${outStr} CCoins!`)
        let win = math.chain(json.amount)
          .add(outStr)
          .done()
        fs.writeFileSync(`./CCoins/${message.author.id}.json`, `{
        "amount": "${win}",
        "status": "true"}`)
      }
    }
  } catch (err) {
    console.log(err)
  }
});
var inStr = "a12ab.c34...h.r3245$##@$7567567567576576567567567567567#2@afdsdFe567";
var justOneDot = inStr.replace(/[.](?=.*?\.)/g, '');
var outStr = parseFloat(justOneDot.replace(/[^0-9.]/g, ''));




bot.login(tokenfile
  .token);
