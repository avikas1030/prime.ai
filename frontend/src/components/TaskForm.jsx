import { useState } from "react";
import { serverUrl } from "../config";
import { FaTasks, FaPen } from "react-icons/fa"; // optional icons

const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${serverUrl}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    refreshTasks();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <FaTasks className="text-blue-500" /> Add Task
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
          <FaPen /> Title
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
          <FaPen /> Description
        </label>
        <textarea
          placeholder="Enter task description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none min-h-[60px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        type="submit"
         className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md font-semibold transition transform hover:scale-105 w-[130px]"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
