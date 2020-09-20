import React, { useState } from "react";
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import Typography from "@material-ui/core/Typography";

export default function Notifications() {
  const [messages, setMessages] = useState([]);
  console.log(messages)

  return (
    <ActionCableConsumer
      channel="NotificationsChannel"
      onReceived={(message) => {console.log(message); setMessages([...messages, message]);}}>
      <h1>Hello</h1>
      {messages.map((m) => (
        <Typography>{m.message}</Typography>
      ))}
    </ActionCableConsumer>
  );
}
