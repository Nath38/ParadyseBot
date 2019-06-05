const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

var prefix = ('p.')

const warns = JSON.parse(fs.readFileSync('./warns.json'))

client.on('ready', () => {
  console.log('Le bot est prêt!')
});

client.on('ready', () => {
  client.user.setGame('p.help')
  console.log('Joue à p.help')
})

/*Kick*/
client.on('message',message =>{
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'kick'){
     if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
     if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
     member.kick()
     message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
  }
});

/*Ban*/
client.on('message',message =>{
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'ban'){
     if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
     if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
     message.guild.ban(member, {days: 7})
     message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
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
      message.edit('Pong ! '+ Math.round(client.ping) + 'ms')
        })
      }
    })

client.on('message', message => {
    if (message.content === prefix + 'help') {
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Voici les commandes !')
      .setDescription('Mon prefix est **p.** et pour utiliser un commande faites **p.<Commande>**')
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('ping', "Pour s'avoir le ping du bot")
      .addField('avatar', 'Pour avoir votre avatar')
      .addField('info', 'Toutes les informations de ParadyseNoRP')
      .addField('invitation', 'Pour avoir une invitation')
      .addField('infractions', "Pour vois tous les warn d'une personne")
      .addField('membre', 'Pour savoir combien somme ton sur le serveur')
      .addField('serveur', "Pour plus d'information sur le serveur")
      .addField('youtubeur', 'Pour demander à avoir le grade de YouTubeur')
      .addField('workshop', 'Lien du workshop')
      .addField('help2', 'Commande administrateur')
      .setTimestamp()
      message.delete()
      message.channel.send(help_embed);
    }
  })

  client.on('message', message => {
    if (message.content === prefix + 'help2') {
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Voici les commandes administrateur !')
      .setDescription("Mon prefix est **p.** et pour utiliser un commande faites **p.<Commande>**")
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('clear', 'Clear des message')
      .addField('mute', 'Mute un joueur')
      .addField('Unmute', 'UnMute un joueur')
      .addField('ban', 'Ban un joueur')
      .addField('kick', 'Kick un joueur')
      .addField('warn', ':warning: Ne fonctionne pas :warning:')
      .addField('unwarn', ':warning: Ne fonctionne pas :warning:')
      .addField('mp', 'MP tous le discord')
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
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('Nathofgamer', 'Fondateur de ParadyseNoRP')
      .addField('Titidu200', 'Co-Fondateur de ParadyseNoRP')
      .addField('Azgar', 'Developer/codeur de ParadyseNoRP')
      .addField('Furax', "Superadmin de ParadyseNoRP")
      .addField('Rayan', 'Superadmin de ParadyseNoRP')
      .addField('51.254.167.194:27070', 'IP de ParadyseRP #1')
      .addField('147.135.185.65', 'IP de ParadyseRP #2')
      .addField('195.201.85.95:25593', 'IP de ParadyseNoRP #3')
      .addField('37.187.190.153:27510', 'IP de ParadyseNoRP #4')
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
    .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
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
      let muterole = message.guild.roles.find(role => role.name === 'mute')
      let userrole = message.guild.roles.find(role => role.name === 'Joueur')
      if (muterole) {
          member.removeRole(userrole)
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
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas warn ce membre")
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
          let muterole = message.guild.roles.find(role => role.name === 'mute')
          let userrole = message.guild.roles.find(role => role.name === 'Joueur')
          if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
          if(userrole && member.roles.has(muterole.id)) member.addRole(userrole)
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

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('553995867963523093').send(embed)
 
});
 
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('553995867963523093').send(embed)
 
});

client.on('message', message => {
  if (message.content === prefix + 'membre') {
    message.channel.send('Nous somme ' + message.guild.memberCount + ' sur ' + message.guild.name)
    message.delete()
  }
})

client.on('message', message => {
  if (message.content === prefix + 'serveur') {
    var server_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription("Informations du serveur")
    .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
    .addField("Server Name", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Vous avez rejoint le", message.member.joinedAt)
    .addField("Total Membre", message.guild.memberCount);
    message.delete()
    message.channel.send(server_embed);
  }
})

client.on('message', message => {
  if (message.content === prefix + 'youtubeur')
  if ('Youtube attente') {
  message.member.addRole('577207063046914069')
  message.channel.send("Un membre du staff vérifiera si vous êtes bien YouTubeur")
  }
  console.error()
})

client.on("message", message => {
  if (message.content === prefix + "accepter"){
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
  let member = message.mentions.members.first()
  if(!member) return message.channel.send("Membre introuvable")
  if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas accepter ce membre.")
  if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas accepter ce membre.")
  let ytbatt = message.guild.roles.find(role => role.name === 'Youtube attente')
  let ytb = message.guild.roles.find(role => role.name === 'Youtuber/Streamer')
  if(ytbatt && member.roles.has(ytbatt.id)) member.removeRole(ytbatt)
  if(ytb && member.roles.has(ytb.id)) member.addRole(ytb)
  message.channel.send(member + " est YouTubeur :white_check_mark:")
  console.error()
}
})

client.on('message', message => {
  if (message.content === prefix + 'workshop') {
    message.reply('Le workshop: https://steamcommunity.com/sharedfiles/filedetails/?id=1483869936')
    message.delete()
  }
})

client.on('message', message => {
  if (message.content === prefix + "say"){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.");
  let messageToBot = args.join(" ");
  message.delete().catch();
  message.channel.send(messageToBot);
  }
});

client.login(process.env.TOKEN);
