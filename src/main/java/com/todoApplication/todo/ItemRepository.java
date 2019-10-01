package com.todoApplication.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel="list",path="list")
public interface ItemRepository extends JpaRepository<ToDoList, Long> {

    List<ToDoList> findByItem(String item);

}