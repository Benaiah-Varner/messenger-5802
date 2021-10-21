import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { fetchConversations } from "../../store/utils/thunkCreators";
import { readMessage } from "../../store/utils/thunkCreators";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, conversation, fetchConversations, activeChat } = props;

  useEffect(() => {
    // sets unread messages to read each time a chat gets selected.
    async function readData() {
      if (conversation.unreadMessages?.length > 0) {
        await readMessage(conversation.unreadMessages)
        fetchConversations()
      }
    }
    readData()
  }, [activeChat])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConversations: () => {
      dispatch(fetchConversations());
    }
  };
};

export default connect(null, mapDispatchToProps)(Messages);