package com.example.demo.timetable;

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

        String questionId;
        String question;
        String type;
    }
