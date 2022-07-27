package com.example.demo.answerProcessing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    @Id
    String id;
    String userId;
    String questionId;
    String answerContent;
}
