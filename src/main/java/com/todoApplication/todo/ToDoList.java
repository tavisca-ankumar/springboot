package com.todoApplication.todo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ToDoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    private Long id;
    private String item;

    public ToDoList() {
    }

    public ToDoList(String name) {
        this.item = item;
    }

    @Override
    public String toString() {
        return "ToDoList{" +
                "id=" + id +
                ", item='" + item + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
=======
    private int lid;
    private String task;

    public int getLid() {
        return lid;
    }

    public void setLid(int lid) {
        this.lid = lid;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
>>>>>>> 3c6b93ba54130aac4604cddcf8e4013fc47830f8
    }
}