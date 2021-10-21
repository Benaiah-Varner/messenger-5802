import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { fetchConversations } from "../../store/utils/thunkCreators";
import { readMessage } from "../../store/utils/thunkCreators";
import moment from "moment";
import { BadgeAvatar } from "../Sidebar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatarBox: {
    display: 'flex', alignItems: 'flex-end', flexDirection: 'column'
  }
}))

const Messages = (props) => {
  const classes = useStyles()
  const { messages, otherUser, userId, conversation, fetchConversations, activeChat } = props;
  const readMessages = messages.filter((mes) => mes.read === true && mes.senderId === userId);
  const lastReadMessage = readMessages[readMessages.length - 1];

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
          <Box key={message.id} className={classes.avatarBox}> 
            <SenderBubble text={message.text} time={time} />
            {
              lastReadMessage.id === message.id &&
              <BadgeAvatar
                photoUrl={otherUser.photoUrl}
                username={otherUser.username}
                online={otherUser.online}
                chatReadAvatar={true}
                sideBar={false}
              />
            }
          </Box>
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