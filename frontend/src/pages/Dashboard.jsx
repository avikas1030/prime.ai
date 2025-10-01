
import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { serverUrl } from "../config";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // import the CSS

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data || err.message);
    }
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/tasks`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">My Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
         <FiLogOut size={18} /> Logout
        </button>
      </header>

      {/* Profile Section */}
      {profile && (
        <section className="profile-section">
          <Profile profile={profile} />
        </section>
      )}

      {/* Task Management */}
      <section className="task-section">
        <h2 className="section-title">Manage Your Tasks</h2>
        <TaskForm refreshTasks={fetchTasks} />
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      </section>
    </div>
  );
};

export default Dashboard;
