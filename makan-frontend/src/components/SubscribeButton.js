import React from "react";
import Button from "@material-ui/core/Button";

export default function SubscribeButton({ chefName, menuId, ...rest }) {
  
  return (
    <Button {...rest}>
      {isLoading ? <CircularProgress /> : children}
    </Button>
  );
}
