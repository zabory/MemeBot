

module.exports = {
		
		handle: function(bot, input, auth){
			
			// I expect this to have some stuff
			json = JSON.parse(input)
			command = json.command
			
			// sends message to user
			if(command == 'sendToUser'){
				user = json.user
				body = json.body
				// find and open user dm
				bot.users.cache.array().forEach(currentUser => {
					if(user == currentUser.username){
						currentUser.createDM().then(userDM => {
							// send the message
							userDM.send(body)
						});
					}
				});
			// sends message to meme channel
			}else if(command == 'sendToChannel' || command == 'sendToQueue'){
				body = json.body
				channelID = json.channelID
	
				//go through userDM channel IDs as well to get the right channel
				authChannel = bot.channels.cache.get(channelID)
				
				if(authChannel == null){
					bot.users.cache.array().forEach(currentUser => {
						if(currentUser.dmChannel == channelID){
							authChannel = currentUser.dmChannel
						}
					});
				}
				
				// sends message
				authChannel.send(body).then(message => {
					if(command == 'sendToQueue'){
						// add reactions
						message.guild.emojis.cache.array().forEach(emoji => {
							if(emoji.name=='check' || emoji.name=='x_'){
								message.react(emoji)
							}
						});
						
						//TODO add reactions based off the tags sent
						message.channel.messages.cache.array().forEach(currentMessage => {
							if(currentMessage.content.includes('Tags')){
								tagCount = currentMessage.content.split('\n').length
								for(i = 0; i < tagCount - 1; i++){
									if(i == 0){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='one'){
												message.react(emoji)
											}
										});
									}else if(i == 1){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='two'){
												message.react(emoji)
											}
										});
									}else if(i == 2){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='three'){
												message.react(emoji)
											}
										});
									}else if(i == 3){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='four'){
												message.react(emoji)
											}
										});
									}else if(i == 4){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='five'){
												message.react(emoji)
											}
										});
									}else if(i == 5){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='six'){
												message.react(emoji)
											}
										});
									}else if(i == 6){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='seven'){
												message.react(emoji)
											}
										});
									}else if(i == 7){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='eight'){
												message.react(emoji)
											}
										});
									}else if(i == 8){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='nine'){
												message.react(emoji)
											}
										});
									}else if(i == 9){
										message.guild.emojis.cache.array().forEach(emoji => {
											if(emoji.name=='ten'){
												message.react(emoji)
											}
										});
									}
								}
							}
						});
					}
					
				});
				
				
			// clears queue of meme channel
			}else if(command == 'clearQueue'){
				bot.guilds.cache.array()[0].channels.cache.array().forEach(channel => {
					if(channel.type == 'text' && channel.id == auth.channel){
						channel.bulkDelete(100)
					}
				});
			}else if(command == 'sendAllTags'){
				tagList = json.body
				helpChannel = bot.channels.cache.get(auth.helpChannel)
				
				helpChannel.messages.cache.array().forEach(currentMessage => {
					if(currentMessage.content.includes('Tag list')){
						currentMessage.edit('Tag list\n=================\n' + tagList.replace(/,/g, '\n'))
					}
				});
				
			}else if(command == 'queueSize'){
				queueSize = json.body
				authChannel = bot.channels.cache.get(auth.channel)
				
				authChannel.messages.cache.array().forEach(currentMessage => {
					//console.log(currentMessage)
					if(currentMessage.content.includes('**Queue count**:')){
						currentMessage.edit('**Queue count**:' + queueSize)
					}
				});
				
			}else if(command == 'sendAllCommands'){
				tagList = json.body
				helpChannel = bot.channels.cache.get(auth.helpChannel)
				
				helpChannel.messages.cache.array().forEach(currentMessage => {
					if(currentMessage.content.includes('Command list')){
						currentMessage.edit('Command list\n=================\n' + tagList.replace(/,/g, '\n'))
					}
				});
				
			}else if(command == 'clearHelpChannel'){
				helpChannel = bot.channels.cache.get(auth.helpChannel)
				helpChannel.bulkDelete(100)
				helpChannel.send('Tag list\n=================\n')
				helpChannel.send('Command list\n=================\n')
			}
			
			
		}
}