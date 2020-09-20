import React, { useState } from "react";
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import Typography from "@material-ui/core/Typography";

export default function Notifications() {
  const [messages, setMessages] = useState([]);

  return (
    <ActionCableConsumer
      channel="NotificationsChannel"
      onReceived={(message) => setMessages([...messages, message])}
    >
      <h1>Hello</h1>
      {messages.map((m) => (
        <Typography>{m}</Typography>
      ))}
    </ActionCableConsumer>
  );
}
