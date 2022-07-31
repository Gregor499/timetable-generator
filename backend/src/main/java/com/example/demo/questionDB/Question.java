package com.example.demo.questionDB;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Question {
        @Id
        String id;

        int order;
        String question;
        String type;
    }
