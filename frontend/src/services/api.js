import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  
  register: (username, email, password) => 
    api.post('/auth/register', { username, email, password }),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const taskService = {
  getAllTasks: () => api.get('/tasks'),
  
  getTaskById: (id) => api.get(`/tasks/${id}`),
  
  createTask: (task) => api.post('/tasks', task),
  
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  
  getTasksByStatus: (status) => api.get(`/tasks/status/${status}`)
};

export default api;
