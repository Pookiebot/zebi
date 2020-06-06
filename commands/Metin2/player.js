/* eslint-disable */

const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const mysql = require("mysql");
class Player extends Command {
  constructor(client) {
  super(client, {
    name: "player",
    description: "Afficher les infos du joueur",
    usage: "player [player name]",
    category: "Metin 2",
    database: "player"
  });
}

  async run(message, args) {
    try {
      message.delete()
      let ID = args[0] || message.member.nickname;
      let sql;
      const db = mysql.createConnection(this.db)
      db.connect(function(err) {
        if(err) throw err;
        console.log("Connecté à la db Player !")
      })
      
      db.query(`SELECT * FROM player FULL JOIN player_index ON account_id = player_index.id WHERE name = '${ID}'`, (err,rows) => {
            if (err) {
              console.log(err)
            } else if(rows.length < 1){
                message.channel.send("Ce joueur n'existe pas ! \n merci de mettre votre pseudo au même nom que sur le serveur ou sinon utiliser la commande /player [name] pour rechercher un utilisateur.");
              
            } else {
              let LEVEL = rows[0].level;
              let JOB = rows[0].job;
              let raceString = []
                raceString[0] = "Guerrier | Male"
                raceString[4] = "Guerrier | Female"
                raceString[2] = "Sura | Male"
                raceString[6] = "Sura | Female"
                raceString[5] = "Ninja | Male"
                raceString[1] = "Ninja | Female"
                raceString[7] = "Shaman | Male"
                raceString[3] = "Shaman | Female"

              let imgString = []
                imgString[0] = "https://it-wiki.metin2.gameforge.com/images/3/38/War_M_Classe.png"
                imgString[4] = "https://it-wiki.metin2.gameforge.com/images/8/87/War_F_Classe.png"
                imgString[5] = "https://it-wiki.metin2.gameforge.com/images/4/41/Ninja_M_Classe.png"
                imgString[1] = "https://it-wiki.metin2.gameforge.com/images/5/53/Ninja_F_Classe.png"
                imgString[2] = "https://it-wiki.metin2.gameforge.com/images/b/b1/Sura_M_Classe.png"
                imgString[6] = "https://it-wiki.metin2.gameforge.com/images/8/8b/Sura_F_Classe.png"
                imgString[7] = "https://it-wiki.metin2.gameforge.com/images/3/34/Shamy_M_Classe.png"
                imgString[3] = "https://it-wiki.metin2.gameforge.com/images/7/73/Shamy_F_Classe.png"

              let lastplay = rows[0].last_play;
         
              let empire = rows[0].empire;
              let empireString = []
                empireString[1] = "Shinsoo"
                empireString[2] = "Chunjo"
                empireString[3] = "Jinno"
              
              const zbub = new Date()

              const playerembed = new RichEmbed()
                .setTitle("Player Info")
                .setColor("RED")
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                .setThumbnail(imgString[JOB])
                .addField("Player : ", ID, true)
                .addField("Level : ", LEVEL, true)
                .addField("Race | Genre ", raceString[JOB], true)
                .addField("Empire : ", empireString[empire], true)
                .addField("Dernière connexion : ", lastplay)
                .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
                .setTimestamp()
              message.channel.send(playerembed)
            }
          })
        } catch (e) {
            console.log(e);
        }
      }
    }

module.exports = Player;