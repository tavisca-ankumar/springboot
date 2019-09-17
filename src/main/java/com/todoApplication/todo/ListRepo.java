package com.todoApplication.todo;

import com.todoApplication.todo.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel="list",path="list")
public interface ListRepo extends JpaRepository<ToDoList, Integer> {
    List<ToDoList> findByTask(String task);

}