import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <div className="task-header">
            <h3>{task.title}</h3>
            <div className="task-badges">
              <span className={`badge ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`badge ${getStatusClass(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-footer">
            <span className="task-date">Due: {formatDate(task.dueDate)}</span>
            <div className="task-actions">
              <button onClick={() => onEdit(task)} className="btn-edit">
                Edit
              </button>
              <button onClick={() => onDelete(task.id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
