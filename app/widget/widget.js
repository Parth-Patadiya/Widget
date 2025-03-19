"use client";

import { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

export default function Widget() {
  const [context, setContext] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  useEffect(() => {
    if (context?.boardId) {
      monday.api(`query { boards(ids: ${context.boardId}) { name items { id name } } }`)
        .then((res) => {
          setItems(res.data.boards[0].items);
        });
    }
  }, [context]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full">
      <h1 className="text-lg text-yellow-300 font-bold">Monday.com Widget</h1>
      <p className="text-gray-600">Board: {context?.boardName || "Loading..."}</p>
      <ul className="mt-2">
        {items.map((item) => (
          <li key={item.id} className="p-2 bg-gray-100 rounded-md mt-1">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
