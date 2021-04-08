const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const Client = new Discord.Client;

const prefix = "!";

var list  = [];

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("guildMemberAdd", member=> {
    console.log("Une nouvelle Pétunia est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "765232317400481836").send(member.displayName + "Une nouvelle Pétunia est arrivé\nNous somme désormais **" + member.guild.memberCount + "sur le serveur !");
    member.roles.add("772463720487321600").then(mbr => {
         console.log("Rôle attribié avec succès pour " + member.displayName)   
    }).catch(() => {
         console.log("Le rôle n'a pas pu être attribué");
    });
});

Client.on("guildMemberRemove", member => {
console.log("un membre se casse");
member.guild.channels.cache.find(channel => channel.id === "765232317400481836").send(member.displayName + "Une Pétunia qui se casse ciao :sob:");
});

Client.on("message", async message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.reply("Nombre de message non ou mal défini.");
            }
            else{
                let number = parseInt(args[1]);
                
                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal défini.");
                }
                else{
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + messages.size + " messages  réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err );
                    });
                }
            }
        }
    }
    if(message.content === prefix + "playlist"){
        let msg = "**FILE D'ATTENTE !**\n";
        for(var i = 0;i = 0;i < list.length,i++){
            let name;
            await ytdl.getInfo(list[i], (err, info) => {
                if(err){
                    console.log("erreur de lien : " + err)
                    list.splice(i, 1);
                }
                else {
                    name = info.title;
                }
            });
            msg += "> " + i +" - " + name + "\n";
        }
        message.channel.send(msg);
    }
    
           else if (message.content.startsWith(prefix + "play")){
           if(message.member.voice.channel){
               let args = message.content.split(" ");
               

               if(args[1] == undefined || !args[1].startsWith("https://www.youtube.com/watch?v=")){
                   message.reply("Lien de la viéo non ou mal mentionné.");
               }
               else {
                   if(list.length > 0){
                       list.push(args[1]);
                       message.reply("Vidéo ajouté a la liste.");
                   }
                   else {
                       list.push(args[1]);
                       message.reply("Vidéo ajouté a la liste.");

                       message.member.voice.channel.join().then(connection => {
                           playMusic(connection);

                           connection.on("disconnect", () => {
                               list = [];

                           });
                       }).catch(err => {
                            message.replay("Erreur lors de la connexion : "+ err);
                       });
                   }
               }
           }
    }

    function playMusic(connection){
        let dispatcher = connection.play(ytdl(list[0], { quality: "highestaudio"}));

        dispatcher.on("finish", () => {
            list.shift();
            dispatcher.destroy();


            if(list.lenght > 0){
                playMusic(connection);
            }
            else {
                connection.disconnect();
            }
        });

        dispatcher.on("error", err => {
            console.log("erreur de dispatcher : " + err);
            dispatcher.destroy();
            connection.disconnect();
        });
    }

    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention =message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                     mention.ban();
                     message.channel.send(mention.displayName + "a été banni avec succès");
                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channels.send(mention.displayName + "a été kick avec succès.");
                }
                else{
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else{
                mention.roles.add("825767019143495690");
                message.channel.send(mention.displayName + "mute avec succès.");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention =message.mentions.members.first();
                
            if (mention == undefined){
                 message.reply("Membre non ou mal mentionné.");
            }
            else{
                mention.roles.remove("825767019143495690");
                message.channel.send(mention.displayName + "unmute avec succès.");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("membre non ou mal mentionné.");
            }
            else {
                let args = message.content.split(" ")

                mention.roles.add("825767019143495690");
                setTimeout(function(){
                    mention.roles.remove("825767019143495690");
                    message.channel.send("<@" + mention.id + ">tu peux désormais parler de nouveau !");
                }, args[2] + 1000);
            }
        }
    }

    //!draxlenul
    if(message.content == prefix + "draxlenul"){
        message.channel.send("mais mais....,c'est pas vrai je suis blesser la");
    }
    
    //!mabeautefatalwesh
    if(message.content == prefix + "mabeautefatalwesh"){
         message.channel.send(message.author.username + " est toujours un(e) bg");
    }

    //!onilanul
    if(message.content == prefix + "onilanul"){
         message.channel.send("oni est même vraiment nul");
    }

    //!chaineytb
    if(message.content == prefix + "chaineytb"){
        message.channel.send("Tiens cadeau https://www.youtube.com/channel/UC9hW70sYFYFDsmqtxPipifg")
    }

    //!ferme la
    if(message.content == prefix + "ferme la"){
        message.channel.send(message.author.username + " Je te le permet pas,fait gaffe ou le ban. :sweat: (humour ou pas mdr) https://tenor.com/view/stressed-familyguy-stewie-gif-4218879");
    }
    //!tumefaitchier
    if(message.content == prefix + "tumefaischier"){
        message.channel.send(message.author.username + " vas au toilette. ")
    }
}); 


Client.login("ODI1NzA5ODA4MjkxMTUxOTAz.YGB4Lw.QlyJPWKDN9UoogPmqOaOeVmHahU"
);