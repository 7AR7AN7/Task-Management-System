package com.taskmanager.controller;

import com.taskmanager.dto.*;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.Task.TaskStatus;
import com.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest taskRequest, 
                                                    Authentication authentication) {
        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setStatus(taskRequest.getStatus() != null ? taskRequest.getStatus() : TaskStatus.TODO);
        task.setPriority(taskRequest.getPriority());
        task.setDueDate(taskRequest.getDueDate());
        
        Task savedTask = taskService.createTask(task, authentication.getName());
        return ResponseEntity.ok(convertToResponse(savedTask));
    }
    
    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(Authentication authentication) {
        List<Task> tasks = taskService.getUserTasks(authentication.getName());
        List<TaskResponse> response = tasks.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id, 
                                                     Authentication authentication) {
        Task task = taskService.getTaskById(id, authentication.getName());
        return ResponseEntity.ok(convertToResponse(task));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id,
                                                    @Valid @RequestBody TaskRequest taskRequest,
                                                    Authentication authentication) {
        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setStatus(taskRequest.getStatus());
        task.setPriority(taskRequest.getPriority());
        task.setDueDate(taskRequest.getDueDate());
        
        Task updatedTask = taskService.updateTask(id, task, authentication.getName());
        return ResponseEntity.ok(convertToResponse(updatedTask));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication authentication) {
        taskService.deleteTask(id, authentication.getName());
        return ResponseEntity.ok("Task deleted successfully");
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskResponse>> getTasksByStatus(@PathVariable TaskStatus status,
                                                                Authentication authentication) {
        List<Task> tasks = taskService.getTasksByStatus(authentication.getName(), status);
        List<TaskResponse> response = tasks.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    
    private TaskResponse convertToResponse(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setStatus(task.getStatus());
        response.setPriority(task.getPriority());
        response.setDueDate(task.getDueDate());
        response.setCreatedAt(task.getCreatedAt());
        response.setUpdatedAt(task.getUpdatedAt());
        return response;
    }
}
