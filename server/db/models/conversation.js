const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Sequelize = require("sequelize");
const User = require('./user')

// Change needed for conversation Model
const Conversation = db.define("conversation", {
  userIds: {
    type: Sequelize.ARRAY,
    allowNull: false,
  },
  chatInitiator: {
    type: User
  },
});

// find conversation given two user Ids

// ***** TICKET 1: Allow more than just two users to be in a conversation at once ***** //

// To accomplish this, I would change user1Id & user2Id to an array of userIds, that concats all conversation participant's id's together sorted alphabetically 

// See conversations.js for rest of explanation

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
