import { useState } from "react";
import { serverUrl } from "../config";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, refreshTasks }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const handleDelete = async (id) => {
    await fetch(`${serverUrl}/api/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    refreshTasks();
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditData({ title: task.title, description: task.description });
  };

  const handleUpdate = async (id) => {
    await fetch(`${serverUrl}/api/tasks/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingTaskId(null);
    setEditData({ title: "", description: "" });
    refreshTasks();
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white transition-all duration-300">
      <h2 className="text-lg font-semibold mb-3">Tasks</h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 rounded-lg border hover:shadow-lg transition-shadow duration-300"
          >
            {editingTaskId === task._id ? (
              <div className="flex-1 mr-4 w-full md:w-auto mb-2 md:mb-0">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full border p-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none min-h-[60px]"
                />
              </div>
            ) : (
              <div className="flex-1 mb-2 md:mb-0">
                <p className="font-medium text-gray-800">{task.title}</p>
                <p className="text-gray-500 text-sm">{task.description}</p>
              </div>
            )}

            <div className="flex gap-2 flex-shrink-0">
              {editingTaskId === task._id ? (
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center gap-1 transition transform hover:scale-105"
                >
                  <FaSave /> Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1 transition transform hover:scale-105"
                >
                  <FaEdit /> Update
                </button>
              )}

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center gap-1 transition transform hover:scale-105"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
