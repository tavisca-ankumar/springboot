package com.todoApplication.todo;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@RunWith(SpringRunner.class)
@WebMvcTest
public class ToDoControllerTests {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void verifyAllToDoList() throws Exception {
       MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.data", hasSize(10))).andDo(print()).andReturn();
        String content = result.getResponse().getContentAsString();
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    public void verifyAddItemInList() throws Exception {
        String bodyContent = "{\"todoname\":\"Shirin Niyazi\"}";
        RequestBuilder req =   MockMvcRequestBuilders
                .post("/add")
                .accept(MediaType.APPLICATION_JSON)
                .content(bodyContent)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(req).andExpect(jsonPath("$.data[10]",is("Shirin Niyazi"))).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(200, response.getStatus());
    }

    @Test
    public void canNotFoundForUnknownItem()throws Exception
    {
        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/search/anoop");
        MvcResult result=mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse res=result.getResponse();
        assertEquals("",res.getContentAsString());
        assertEquals(HttpStatus.NOT_FOUND.value(),res.getStatus());
    }

    @Test
    public void canFoundForUnknownItem()throws Exception
    {
        RequestBuilder requestBuilder= MockMvcRequestBuilders.get("/search/et porro tempora");
        MvcResult result=mockMvc.perform(requestBuilder).andExpect(jsonPath("$.data[0]", is("et porro tempora"))).andReturn();
        MockHttpServletResponse res=result.getResponse();
        assertEquals(HttpStatus.OK.value(),res.getStatus());
    }

    @Test
    public void canUpdateTodoItem() throws Exception
    {
        String bodyContent = "{\"todoname\":\"Shivani\"}";
        ObjectMapper objectMapper=new ObjectMapper();

        RequestBuilder req =   MockMvcRequestBuilders
                .put("/update/2")
                .accept(MediaType.APPLICATION_JSON)
                .content(bodyContent)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result=mockMvc.perform(req).andExpect(jsonPath("$.data[2]",is("Shivani"))).andReturn();
        MockHttpServletResponse res=result.getResponse();
        assertEquals(HttpStatus.OK.value(),res.getStatus());
    }

    @Test
    public void verifyListItemAfterDeletion() throws Exception {
        MockHttpServletResponse befreDeleteRes = mockMvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        String contentBeforeDeleteTest = befreDeleteRes.getContentAsString();
        Response resContentObject = objectMapper.readValue(contentBeforeDeleteTest, Response.class);
        System.out.println("LOOK  "+resContentObject);
        int lengthBeforeTest = resContentObject.getData().size();
        RequestBuilder reqBuilder = MockMvcRequestBuilders.delete("/delete/1").accept(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(reqBuilder).andExpect(status().isOk()).andReturn();
        MockHttpServletResponse res = result.getResponse();
        Response resContentAfterTest = objectMapper.readValue(res.getContentAsString(),Response.class);
        int lengthAfterTest = resContentAfterTest.getData().size();
        assertEquals(lengthAfterTest+1,lengthBeforeTest);
    }

}