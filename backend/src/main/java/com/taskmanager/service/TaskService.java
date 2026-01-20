package com.taskmanager.service;

import com.taskmanager.entity.Task;
import com.taskmanager.entity.Task.TaskStatus;
import com.taskmanager.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Task createTask(Task task, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        task.setUser(user);
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.TODO);
        }
        
        return taskRepository.save(task);
    }
    
    public List<Task> getUserTasks(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return taskRepository.findByUserId(user.getId());
    }
    
    public Task getTaskById(Long taskId, String username) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        
        if (!task.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized access to task");
        }
        
        return task;
    }
    
    public Task updateTask(Long taskId, Task updatedTask, String username) {
        Task existingTask = getTaskById(taskId, username);
        
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setDueDate(updatedTask.getDueDate());
        
        return taskRepository.save(existingTask);
    }
    
    public void deleteTask(Long taskId, String username) {
        Task task = getTaskById(taskId, username);
        taskRepository.delete(task);
    }
    
    public List<Task> getTasksByStatus(String username, TaskStatus status) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return taskRepository.findByUserIdAndStatus(user.getId(), status);
    }
}
