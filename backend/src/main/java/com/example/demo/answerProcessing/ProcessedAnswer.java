package com.example.demo.answerProcessing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("processedAnswers")
@NoArgsConstructor
@AllArgsConstructor
public class ProcessedAnswer {
    @Id
    String id;
    String task;
    String color;
    List<String> timeList;
    //String weekday;
}
