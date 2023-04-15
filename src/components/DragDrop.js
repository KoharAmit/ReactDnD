import React, { useState } from "react";
import Content from "./Content";
import { useDrop } from "react-dnd";
import "../App.css";

const ContentList = [
  {
    id: 1,
    text:
      "example1 : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ",
  },
  {
    id: 2,
    text:
      "example 2 : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 3,
    text:
      "example 3: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);
  const [contentList, setContentList] = useState(ContentList);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "text",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    canDrop: false, // disable dropping on the board
  }));

  const addImageToBoard = (id) => {
    const contentList = ContentList.filter((content) => id === content.id);
    setBoard((board) => [...board, contentList[0]]);
    setContentList((prevList) => prevList.filter((content) => content.id !== id));
  };

  const handleDrop = (item) => {
    // handle dropping of items in the board
    addImageToBoard(item.id);
  };

  return (
    <>
      <div className="contents">
        {contentList.map((content) => (
          <Content key={content.id} text={content.text} id={content.id} />
        ))}
      </div>
      <div className="board" ref={drop}>
        {board.map((content) => (
          <Content
            key={content.id}
            text={content.text}
            id={content.id}
            isInBoard // set the isInBoard prop to true for items in the board
          />
        ))}
      </div>
    </>
  );
}

export default DragDrop;
