Hooks.once('libWrapper.Ready', () => {
  libWrapper.register('inline-chats', 'TextEditor.enrichHTML', function(wrapped, ...args) {
	const rgx = /\[\[!(.*?)\]\]/gi;
	const matches = args[0].matchAll(rgx);
	
	for (const match of matches){
		let text = match[0].replace(`[[!`,``).replace(`]]`,``).trim();
		let icon = text.at(0)==='/'?'':'<i class="far fa-comments"></i>&nbsp;';
  	args[0] = args[0].replace(match[0], `<a onclick="ui.chat.processMessage($(this).clone().children().remove().end().text());" class="inline-chat">${icon}${text}</a>`)
	}
	return wrapped(...args);
  }, 'WRAPPER');
});