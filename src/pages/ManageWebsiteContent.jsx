import React, { useState } from "react";

const ManageWebsiteContent = () => {
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Welcome Message",
      content: "Welcome to our website!",
    },
    {
      id: 2,
      title: "About Us",
      content:
        "We provide the best services for you.",
    },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] =
    useState("");
  const [editingId, setEditingId] =
    useState(null);

  const handleAddContent = () => {
    if (!newTitle || !newContent) return;
    setContents([
      ...contents,
      {
        id: Date.now(),
        title: newTitle,
        content: newContent,
      },
    ]);
    setNewTitle("");
    setNewContent("");
  };

  const handleEditContent = (id) => {
    const item = contents.find(
      (c) => c.id === id
    );
    setNewTitle(item.title);
    setNewContent(item.content);
    setEditingId(id);
  };

  const handleUpdateContent = () => {
    setContents(
      contents.map((c) =>
        c.id === editingId
          ? {
              ...c,
              title: newTitle,
              content: newContent,
            }
          : c
      )
    );
    setNewTitle("");
    setNewContent("");
    setEditingId(null);
  };

  const handleDeleteContent = (id) => {
    setContents(
      contents.filter((c) => c.id !== id)
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Manage Website Content
      </h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={newTitle}
          onChange={(e) =>
            setNewTitle(e.target.value)
          }
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Content"
          value={newContent}
          onChange={(e) =>
            setNewContent(e.target.value)
          }
        />
        {editingId ? (
          <button
            onClick={handleUpdateContent}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAddContent}
            className="bg-green-500 text-white px-4 py-2 mt-2"
          >
            Add
          </button>
        )}
      </div>
      <ul>
        {contents.map((item) => (
          <li
            key={item.id}
            className="border p-3 mb-2 flex justify-between"
          >
            <div>
              <h2 className="font-bold">
                {item.title}
              </h2>
              <p>{item.content}</p>
            </div>
            <div>
              <button
                onClick={() =>
                  handleEditContent(item.id)
                }
                className="bg-yellow-500 text-white px-2 py-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleDeleteContent(item.id)
                }
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageWebsiteContent;
