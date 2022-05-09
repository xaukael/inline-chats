Hooks.once('libWrapper.Ready', () => {
  libWrapper.register('inline-chats', 'TextEditor.enrichHTML', function(wrapped, ...args) {
	const rgx = /\[\[!(.*?)\]\]/gi;
	if (!args[0]) return wrapped(...args);
	const matches = args[0].matchAll(rgx);
	
	for (const match of matches){
		let text = match[0].replace(`[[!`,``).replace(`]]`,``).trim();
		let icon = text.at(0)==='/'?'':'<i class="far fa-comments"></i>&nbsp;';
  	args[0] = args[0].replace(match[0], `<a onclick="ui.chat.processMessage($(this).clone().children().remove().end().text());" class="inline-chat">${icon}${text}</a>`)
	}
	return wrapped(...args);
  }, 'WRAPPER');
});

Hooks.on('renderChatMessage', (message, html)=>{
  html.find('.inline-chat').click(function(){
    ui.chat.processMessage($(this).clone().children().remove().end().text());
  })
})