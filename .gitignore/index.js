const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

var prefix = ('p.')

const warns = JSON.parse(fs.readFileSync('./warns.json'))

client.on('ready', () => {
  console.log('Le bot est prêt!')
  client.user.setGame('p.help')
});

client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith(prefix + 'ban')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user)
        if (member) {
          member.ban({
            reason: 'Ils étaient méchants !',
          }).then(() => {
            message.reply(`${user.tag} a été banni avec succès !`);
          }).catch(err => {
            message.reply('Je ne peux pas le ban.');
            console.error(err);
          });
        } else {
          message.reply("Cet utilisateur n'est pas dans ce serveur");
        }
      } else {
        message.reply("Vous n'avez pas mentionné l'utilisateur à bannir !");
        message.delete()
      }
    }
  });

client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith(prefix + 'kick')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.kick("Motif facultatif qui s'affichera dans les logs").then(() => {
            message.reply(`${user.tag} a été kick avec succès.`);
          }).catch(err => {
            message.reply('Je ne pas kick cette personne');
            console.error(err);
          });
        } else {
          message.reply("Cet utilisateur n'est pas dans ce serveur");
        }
      } else {
        message.reply("Vous n'avez pas mentionné l'utilisateur à kick !");
        message.delete()
      }
    }
  });
  

client.on('message', message => {
    if (message.content === prefix + 'avatar') {
        message.channel.send(message.author.avatarURL)
        message.delete();
    }
  })

client.on('message', message => {
    if (message.content === prefix + 'ping') {
      message.channel.send('Calcul ...').then(message => {
      message.edit('Pong !'+ Math.round(client.ping) + 'ms')
        })
      }
    })

client.on('message', message => {
    if (message.content === prefix + 'help') {
      var help_embed = new Discord.RichEmbed()
      .setColor('#3300FF')
      .setTitle('Voici les commandes !')
      .setDescription('Les commandes du bot discord')
      .setThumbnail(message.author.avatarURL)
      .addField('ping', "Pour s'avoir le ping du bot")
      .addField('avatar', 'Pour avoir votre avatar')
      .addField('info', 'Toutes les informations de ParadyseNoRP')
      .addField('invitation', 'Pour crée une invitation')
      .addField('infractions', "Pour vois tous les warn d'une personne")
      .addField('clear', 'Reservée au staff')
      .addField('mute', 'Reservée au staff')
      .addField('ban', 'Reservée au staff')
      .addField('kick', 'Reservée au staff')
      .addField('warn', 'Reservée au staff')
      .addField('mp', 'Reservée au staff')
      .setTimestamp()
      message.delete()
      message.channel.send(help_embed);
    }
  })

  client.on('message', message => {
    if (message.content === prefix + 'info') {
      var info_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Les informations de ParadyseNoRP')
      .setDescription('Voici toutes les informations de ParadyseNoRP')
      .setThumbnail(message.author.avatarURL)
      .addField('Nathofgamer', 'Fondateur de ParadyseNoRP')
      .addField('Azgar', 'Developer/codeur de ParadyseNoRP')
      .addField('Furax', "Superadmin de ParadyseNoRP")
      .addField('37.187.190.153:27510', 'IP de ParadyseNoRP')
      .setThumbnail()
      message.delete()
      message.channel.send(info_embed);
    }
  })

client.on('message', async message => {
  if(message.content.startsWith(prefix + 'mp')){

    var args = message.content.split(" ").slice(1);
    var msge = args.join(' ');

    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send("Tu ne peux pas utiliser cette commande.");
    if(!msge) return message.channel.send('Precise un message !')

    var mpall = new Discord.RichEmbed()
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setColor('RANDOM')
    .addField('Annonce à lire', msge);
    message.delete()
    message.guild.members.map(m => m.send(mpall))
  }
});

client.on('message', message => {
  if (message.content === prefix + 'invitation'){
    message.channel.send('http://www.discord.me/paradyse')
    message.delete()
  }
}) 

client.on("message", message => {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + "clear") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let count = args[1]
      if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
      if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
      if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
      message.channel.bulkDelete(parseInt(count) + 1)
  }

  if (args[0].toLowerCase() === prefix + "mute") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("Membre introuvable")
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
      if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
      let muterole = message.guild.roles.find(role => role.name === 'Muted')
      if (muterole) {
          member.addRole(muterole)
          message.channel.send(member + ' a été mute :white_check_mark:')
      }
      else {
          message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
              message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                  channel.overwritePermissions(role, {
                      SEND_MESSAGES: false
                  })
              })
              member.addRole(role)
              message.channel.send(member + ' a été mute :white_check_mark:')
          })
      }
  }
})

client.on('message', message => {
    if (message.content === prefix + 'rip') {
      message.channel.send('https://i.imgur.com/w3duR07.png')
      message.delete()
    }
  })

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("Veuillez indiquer une raison")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
    }
 
    if (args[0].toLowerCase() === prefix + "infractions") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns', ((warns[member.id]) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
        message.channel.send(embed)
    }
        //unmute
        if(args[0].toLowerCase() === prefix + "unmute"){
          if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
          let member = message.mentions.members.first()
          if(!member) return message.channel.send("Membre introuvable")
          if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
          if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
          let muterole = message.guild.roles.find(role => role.name === 'Muted')
          if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
          message.channel.send(member + ' a été unmute :white_check_mark:')
      }
   
      //unwarn
      if(args[0].toLowerCase() === prefix + "unwarn"){
          let member = message.mentions.members.first()
          if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
          if(!member) return message.channel.send("Membre introuvable")
          if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
          if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unwarn ce membre.")
          if(!warns[member.id]|| !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
          warns[member.id].shift()
          fs.writeFileSync('./warns.json',JSON.stringify(warns))
          message.channel.send("Le dernier warn de " +member+ " a été retiré :white_check_mark:")
     
      }
  })

client.login(process.env.TOKEN)
