package com.taskmanager.dto;

import com.taskmanager.entity.Task.Priority;
import com.taskmanager.entity.Task.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    private TaskStatus status;
    private Priority priority;
    private LocalDateTime dueDate;
}
