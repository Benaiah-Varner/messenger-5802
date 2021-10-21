import React from "react";
import { Box, Badge, Avatar } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  profilePic: ({ chatReadAvatar }) => ({
    height: chatReadAvatar ? 31 : 44,
    width: chatReadAvatar ? 31 : 44,
    marginTop: chatReadAvatar && '11px' 
  }),
  badge: {
    height: 13,
    width: 13,
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "#D0DAE9"
  },
  online: {
    backgroundColor: "#1CED84"
  },
  sidebar: {
    marginLeft: 17
  },
}));

const UserAvatar = (props) => {
  const { sidebar, username, photoUrl, online, chatReadAvatar } = props;
  const classes = useStyles({ chatReadAvatar });

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circle">
        <Avatar alt={username} src={photoUrl} className={classes.profilePic}></Avatar>
      </Badge>
    </Box>
  );
};

export default UserAvatar;
