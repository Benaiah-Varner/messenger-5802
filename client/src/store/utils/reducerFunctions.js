export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      // change this to otherUsers, set it to otherUsers: {sender.id: sender}
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return convo;
    }
  });
};

// A new function called addUserToConvo would be needed here, that takes state and a payload, the payload being the conversation. Make a copy of the conversation, add the new user to the otherUsers object (otherUsers.newUser.id: newUser), and return the convo copy. 

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    // this needs to be changed to if (convo.otherUsers.id)
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      // change this to convo.otherUsers.id.online = true
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    //this needs to be changed to loop through the otherUsers in the conversation, and add each of these to the currentUsers table. for (const user in convo.otheruser) {user.id === true}, we also need to add validation so we dont add the same user to the store twice, so if (!currentUsers.user.id), {user.id === true}
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    // then here we need to change line 66 to otherUsers: {user.id: user, messages: []}
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    // need to change this if statement to if (convo.otherUsers.recipientId)
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return convo;
    }
  });
};
