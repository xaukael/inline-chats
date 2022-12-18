TextEditor.onClickInlineChat = function(element, event, relativeToUuid){
  let content = $(element).clone().children().remove().end().text().replace('{{','[[').replace('}}',']]');
  if (content.at(0)==='/') return ui.chat.processMessage(content);
  if (relativeToUuid == 'undefined') return ui.chat.processMessage(content);
  let document;
  if (game.release?.generation >= 10) document = fromUuidSync(relativeToUuid);
  else document = CONFIG[data.type].collection.instance.get(relativeToUuid);
  
  console.log(document)
  if (!document) return ui.chat.processMessage(content);
  if (document.documentName == "Actor") 
      return ChatMessage.create({content, speaker:ChatMessage.getSpeaker({actor: document})});
  if (document.documentName == "JournalEntryPage")
    return ChatMessage.create({content, speaker:ChatMessage.getSpeaker({alias: document.name})});
  if (document.documentName == "Item")
    if (document.parent.documentName == "Actor") return ChatMessage.create({content, speaker:ChatMessage.getSpeaker({actor: document.parent})});
    else return ChatMessage.create({content, speaker:ChatMessage.getSpeaker({alias: document.name})});
  return ui.chat.processMessage(content);

}


CONFIG.TextEditor.enrichers.push({pattern:/\[\[!(.*?)\]\]/gi, enricher: function enricher (match, options){
    console.log("options", options);
    let relativeToUuid = options.relativeTo?.uuid;
    let text = match[0].replace(`[[!`,``).replace(`]]`,``).trim();
    let icon = text.at(0)==='/'?'':'<i class="far fa-comment"></i>&nbsp;';
    return $(`<a onclick="TextEditor.onClickInlineChat(this, event, '${relativeToUuid}')" class="inline-chat">${icon}${text}</a>`)[0]
}})

Hooks.on('renderChatMessage', (message, html)=>{
  html.find('.inline-chat').click(function(){
    ui.chat.processMessage($(this).clone().children().remove().end().text());
  })
})
