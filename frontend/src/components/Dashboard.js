import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      loadTasks();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskService.updateTask(editingTask.id, taskData);
      loadTasks();
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'ALL') return true;
    return task.status === filter;
  });

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'TODO').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>TaskManager</h1>
        <div className="nav-right">
          <span>Welcome, {user?.username}!</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="stats-container">
          <div className="stat-card">
            <h3>{taskStats.total}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="stat-card">
            <h3>{taskStats.todo}</h3>
            <p>To Do</p>
          </div>
          <div className="stat-card">
            <h3>{taskStats.inProgress}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card">
            <h3>{taskStats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="controls">
          <button 
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }} 
            className="btn-primary"
          >
            + New Task
          </button>

          <div className="filter-buttons">
            <button 
              onClick={() => setFilter('ALL')} 
              className={filter === 'ALL' ? 'active' : ''}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('TODO')} 
              className={filter === 'TODO' ? 'active' : ''}
            >
              To Do
            </button>
            <button 
              onClick={() => setFilter('IN_PROGRESS')} 
              className={filter === 'IN_PROGRESS' ? 'active' : ''}
            >
              In Progress
            </button>
            <button 
              onClick={() => setFilter('COMPLETED')} 
              className={filter === 'COMPLETED' ? 'active' : ''}
            >
              Completed
            </button>
          </div>
        </div>

        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
