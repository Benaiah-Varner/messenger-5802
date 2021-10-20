const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

// We also need to change associations to accomodate for the change in the conversation model. I would change this to: Conversation.belongsTo(User, { as: "chatInitiator" }), and Conversation.belongsTo(User, { as: "userIds" })
User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
