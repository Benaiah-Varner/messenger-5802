const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Sequelize = require("sequelize");
const User = require('./user')

// Change needed for conversation Model
// The instructions weren't clear on whether or not I needed to actually change the code, so I left this commented out

const Conversation = db.define("conversation", {
  userIds: {
    type: Object,
    allowNull: false,
  },
  convoName: {
    type: String,
    allowNull: true,
  }
});

// find conversation given two user Ids

// ***** TICKET 3: Allow more than just two users to be in a conversation at once ***** //

// To accomplish this, I would change user1Id & user2Id to an object storing the users, with userId as the key, and the user object itself as the value.

// Since a user (or many users) can be in multiple chats at once, e would need to change the findConversation method to find a conversation by id, since its the only unique property on the conversation model. 

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
