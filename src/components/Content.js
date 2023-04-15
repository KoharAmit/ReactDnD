import React from "react";
import { useDrag } from "react-dnd";

function Content({ id, text, isInBoard }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "text",
    item: { id: id },
    canDrag: !isInBoard,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    >
      {text}
    </div>
  );
}

export default Content;
