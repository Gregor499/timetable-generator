package com.example.demo.answerDB;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "answers")
@NoArgsConstructor
@AllArgsConstructor
public class TimeAnswer {
    @Id
    private String id;
    private String userId;
    private String questionId;
    private String question;
    private String time;
    private int timeInMinutes;
}
