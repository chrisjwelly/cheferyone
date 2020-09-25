import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

export default function AvatarCors(props) {
  return (
    <Avatar {...props} imgProps={{ crossOrigin: "anonymous" }}>
      <ImageIcon fontSize="large" />
    </Avatar>
  );
}
