import React, { useState, useEffect, useRef } from "react";
import Collapse from "@material-ui/core/Collapse";
import LinesEllipsis from "react-lines-ellipsis";

export default function CollapsibleText({ text, lines }) {
  const textRef = useRef();
  const [isTooLong, setIsTooLong] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTooLong(textRef.current.isClamped());
    }
  }, [textRef]);

  if (!isTooLong) {
    return <>{text}</>;
  }

  return (
    <>
      {!isExpanded && (
        <LinesEllipsis
          onClick={() => setIsExpanded(true)}
          text={text}
          maxLine={lines === undefined ? 3 : lines}
          ellipsis="...Read More"
          trimRight
          basedOn="letters"
          ref={textRef}
        />
      )}
      <Collapse onClick={() => setIsExpanded(false)} in={isExpanded}>
        {text}
      </Collapse>
    </>
  );
}
