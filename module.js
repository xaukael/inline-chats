Hooks.once('libWrapper.Ready', () => {
  libWrapper.register('inline-chats', 'TextEditor.enrichHTML', function(wrapped, ...args) {
	const rgx = /\[\[!(.*?)\]\]/gi;
	const matches = args[0].matchAll(rgx);
	let icon = `<i class="far fa-comments"></i>`;
	for (const match of matches) 
  	args[0] = args[0].replace(match[0], `<a onclick="ui.chat.processMessage($(this).clone().children().remove().end().text());" class="inline-chat">${icon} ${match[0].replace(`[[!`,``).replace(`]]`,``).trim()}</a>`)
	return wrapped(...args);
  }, 'WRAPPER');
});