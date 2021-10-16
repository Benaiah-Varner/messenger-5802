const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const Sequelize = require("sequelize");
const User = require('./user')

// Change needed for conversation Model
// The instructions weren't clear on whether or not I needed to actually change the code, so I left this commented out

// const Conversation = db.define("conversation", {
//   userIds: {
//     type: Sequelize.ARRAY,
//     allowNull: false,
//   },
//   chatInitiator: {
//     type: Sequalize.STRING
//   },
// });

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

// ***** TICKET 3: Allow more than just two users to be in a conversation at once ***** //

// To accomplish this, I would change user1Id & user2Id to an array of userIds, that concats all conversation participant's id's together sorted alphabetically 

// We would need to change the findConversation method to find a conversation where { userIds.includes(userId), or chatInitiator.id === userId } 

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
