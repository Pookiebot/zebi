const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const mysql = require("mysql");
class Config extends Command {
  constructor(client) {
    super(client, {
      name: "config",
      description: "Configurer le bot",
      usage: "config",
      guildOnly: true,
      category: "Système",
      permLevel: "Owner",
      database: "gardien",
    });
  }
  async run(message, args) {
    try {
      message.delete()
      const db = mysql.createConnection(this.db);
        db.connect(function(err) {
          if(err) throw err;
          const newembed = new RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setDescription(
            `
             Vous venez de configurer le bot pour la première fois,
             voici les commandes supplementaire pour configurer d'avantage le bot.
            `
            )
            .setThumbnail("https://media.giphy.com/media/SsIZDCNEudKM4tzhyU/giphy.gif")
            .addField("config prefix [value] :", "Permet de gerer le prefix")
            .setFooter("Configuration")
            .setTimestamp()
            db.query(`SELECT * FROM server WHERE server_id = '${message.guild.id}'`, (err,rows) => {
              if(err) throw err;
            
              if(rows.length < 1) {
                var sql = `INSERT INTO server (server_id, server_name, owner_id) VALUES ('${message.guild.id}', '${message.guild.name}' , '${message.client.appInfo.owner.id}')`;
                db.query(sql, function (err, result)
                {
                  if (err) throw err;
                  message.channel.send(newembed);
                  console.log("réussi");
                })
              } else if (!args[0]){
                return message.channel.send("merci de renseignez une commande").then(m => m.delete(2500));
              } else if (args[0] === "prefix"){
                if(!args[1]) {
                  return message.channel.send(":x: Merci de renseigner un prefix").then(m => m.delete(2500));
                }
                var sql1 = `UPDATE server SET prefix = '${args[1]}' WHERE server_id = '${message.guild.id}'`
                let oprefix = rows[0].prefix
                message.channel.send(`Prefix changé de ${oprefix} à ${args[1]}`).then(m => m.delete(2500));
                db.query(sql1, function (err, result) {
                  if (err) throw err;
                })
             } 
                
          })
        })

    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Config;