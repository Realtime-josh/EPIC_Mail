const Message = {
  messages : [
   {
      messageId : 1,
      senderId : 1,
      receiverId : 2,
      parentMessageId : 1,
      subject : "Come Home Now",
      Message : "Hello Josh! Come home now. We have a suprise for you",
      status : "unread",
      createdOn : "2019-02-28T13:01:56.153Z" 
   }
     ],

  groups : [
             {
               groupId : 1,
               groupName : "Comedy Club",
               createdByUser : 1,
               groupMembers : [
                                {
                                  groupId : 1,
                                  userId : 1
                                }
                                  ]
                            },
                          ],
                            lastParentMessageId : 1,
                            lastMessageId : 1,
                            lastGroupId : 1
                        };


 const mapMessages = new Map();
 const mapGroup = new Map();

 Message.messages.forEach((message)=>{
  mapMessages.set(String(message.messageId), message);
 });

Message.groups.forEach((group)=>{
  mapGroup.set(String(group.groupId), group);
 });



export {
  mapMessages,
  mapGroup,
  Message
};

