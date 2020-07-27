var auth = require('./auth.json');

module.exports = {
		handle : function(data){
			
			//we need this because the bot adds the reactions on to the picture the first time, so only do this if more than the bot reacts
			if(data.users.cache.array().length > 1){
				
				// get the channel ID
				channel = data.message.channel.id
				//make sure the channelID is the meme curator channel
				if(channel == auth.channel){
					if(data.emoji.id == auth.deny){
						console.log("denied")
					}else if(data.emoji.id == auth.approve){
						console.log("approved")
					}
				}
			}
		}
}