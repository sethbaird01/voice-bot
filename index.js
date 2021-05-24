require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const minThreshold = 3;


bot.on("ready", () => {
    console.log('online');
    bot.users.fetch(process.env.USER_ID)
    .then(user => {user.send("online")});
});

let tempMembers = 0;

bot.on('voiceStateUpdate', async (oldState, newState) => {
    try {
        var voiceChannelNew = newState.channel;
        if ((voiceChannelNew.members.array().length != tempMembers) && voiceChannelNew.members.array().length >= minThreshold){
            tempMembers = voiceChannelNew.members.array().length;
            //send dm
            bot.users.fetch(process.env.USER_ID)
            .then(user => {user.send("threshold broken: " + voiceChannelNew.members.array().length)});
        } 
    } catch (error) {
        console.log('crisis averted: '+ error);
    }

});



bot.login(process.env.DISCORD_TOKEN);