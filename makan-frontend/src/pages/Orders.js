import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setTabIndex } from "../actions/bottombar-actions";

export default function Orders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabIndex(2));
  }, [dispatch]);

  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
}
