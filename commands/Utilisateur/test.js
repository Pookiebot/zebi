const Command = require("../../modules/Command.js");
const mysql = require("mysql")
const DB = require("../../modules/db.js")
class Test extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      description: "Affiche votre niveau de permission.",
      usage: "test",
      guildOnly: true
    });
  }

  async run(message, args, level) {
    try{
      async function getConfig() {
        const db = mysql.createConnection(DB)
        db.connect(function(err) {
          if (err) throw err;
          console.log("connected")
        db.query(`SELECT * FROM server WHERE server_id = '${message.guild.id}'`, (err, rows) => {
          if (err) throw err;
          console.log(rows);
        })
        })
      }
      const test = await getConfig()
      console.log()
    }catch(e) {
      console.log(e);
    }
  }
}

module.exports = Test;