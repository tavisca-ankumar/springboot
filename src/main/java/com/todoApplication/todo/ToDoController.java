<<<<<<< HEAD
package com.todoApplication.todo;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ToDoController {

    @Autowired
    private ItemRepository repository;




=======
//package com.todoApplication.todo;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//@RestController
//public class ToDoController {
//
//    @Autowired
//    ListRepo repo;
//
>>>>>>> 3c6b93ba54130aac4604cddcf8e4013fc47830f8
//    private String[] arrayData = {"delectus aut autem",
//            "quis ut nam facilis et officia qui",
//            "fugiat veniam minus",
//            "et porro tempora",
//            "laboriosam mollitia et enim quasi adipisci quia provident illum",
//            "qui ullam ratione quibusdam voluptatem quia omnis",
//            "illo expedita consequatur quia in",
//            "quo adipisci enim quam ut ab",
//            "molestiae perspiciatis ipsa",
//            "illo est ratione doloremque quia maiores aut"};
//
//    private List<String> data =  new ArrayList<>(Arrays.asList(arrayData));
//    private List<String> tempdata =  new ArrayList<>();
<<<<<<< HEAD

//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public List<ToDoList> getList(){
//        ToDoList task = new ToDoList();
//        task.setTask(tsk);
//        ListsOfTodo lists = repo.save(task);
//        return lists;
=======
//
//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public ResponseEntity<?> showHomePage() throws JSONException {
//        JSONObject js = new JSONObject().put("data",data);
//        return new ResponseEntity<>(js.toString(), HttpStatus.OK);
>>>>>>> 3c6b93ba54130aac4604cddcf8e4013fc47830f8
//    }
//
//    @RequestMapping(value = "/add", method = RequestMethod.POST)
//    public ResponseEntity<?> addData(@RequestBody String newData){
//        JSONObject js = new JSONObject(newData);
//        String todoname = js.getString("todoname");
//        data.add(todoname);
//        return showHomePage();
//    }
//
//    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
//    public ResponseEntity<?> deleteData(@PathVariable("id") int todoid) {
//        data.remove(todoid);
//        return showHomePage();
//    }
//
//    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
//    public ResponseEntity<?> updatePage(@PathVariable("id") int todoid, @RequestBody String newData) {
//        JSONObject js = new JSONObject(newData);
//        String todoname = js.getString("todoname");
//        data.set(todoid,todoname);
//        return showHomePage();
//    }
//
<<<<<<< HEAD
    @RequestMapping(value = "/search/{name}", method = RequestMethod.GET)
    public List<ToDoList
            > updatePage(@PathVariable("name") String name) {
        List<ToDoList> list= repository.findByItem(name);
        return list;
    }
}
=======
//    @RequestMapping(value = "/search/{name}", method = RequestMethod.GET)
//    public ResponseEntity<?> updatePage(@PathVariable("name") String name) {
//        if (data.contains(name)) {
//            tempdata.add(name);
//            JSONObject js = new JSONObject().put("data",tempdata);
//            tempdata.remove(tempdata.indexOf(name));
//            return new ResponseEntity<>(js.toString(), HttpStatus.OK);
//        }
//        JSONObject js = new JSONObject().put("data",tempdata);
//        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//    }
//
//}
>>>>>>> 3c6b93ba54130aac4604cddcf8e4013fc47830f8
