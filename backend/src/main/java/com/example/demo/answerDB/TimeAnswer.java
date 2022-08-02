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
    String id;
    String userId;
    String questionId;
    String time;
    int timeInMinutes;
}
