
CONFIG.TextEditor.enrichers.push({pattern:/\[\[!(.*?)\]\]/gi, enricher: function enricher (match, options){
    console.log("options", options);
    let id = options.relativeTo?.id;
    let text = match[0].replace(`[[!`,``).replace(`]]`,``).trim();
    let icon = text.at(0)==='/'?'':'<i class="far fa-comments"></i>&nbsp;';
    if (options.relativeTo?.documentName == "Actor") 
      return $(`<a onclick="ChatMessage.create({content:$(this).clone().children().remove().end().text().replace('{{','[[').replace('}}',']]'), speaker:ChatMessage.getSpeaker({actor: game.actors.get('${id}')})});" class="inline-chat">${icon}${text}</a>`)[0]
    if (options.relativeTo?.documentName == "JournalEntryPage")
      return $(`<a onclick="ChatMessage.create({content:$(this).clone().children().remove().end().text().replace('{{','[[').replace('}}',']]'), speaker:ChatMessage.getSpeaker({alias: '${options.relativeTo?.name}'})});" class="inline-chat">${icon}${text}</a>`)[0]
    return $(`<a onclick="ui.chat.processMessage($(this).clone().children().remove().end().text().replace('{{','[[').replace('}}',']]'));" class="inline-chat">${icon}${text}</a>`)[0]
}})

Hooks.on('renderChatMessage', (message, html)=>{
  html.find('.inline-chat').click(function(){
    ui.chat.processMessage($(this).clone().children().remove().end().text());
  })
})