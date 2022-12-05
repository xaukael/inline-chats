
CONFIG.TextEditor.enrichers.push({pattern:/\[\[!(.*?)\]\]/gi, enricher: function enricher (match, options){
    console.log("options",options);
    let text = match[0].replace(`[[!`,``).replace(`]]`,``).trim();
    let icon = text.at(0)==='/'?'':'<i class="far fa-comments"></i>&nbsp;';
  	let element = $(`<a onclick="ui.chat.processMessage($(this).clone().children().remove().end().text().replace('{{','[[').replace('}}',']]'));" class="inline-chat">${icon}${text}</a>`)[0];
    return element;
}})