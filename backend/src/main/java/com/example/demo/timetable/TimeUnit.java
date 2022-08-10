package com.example.demo.timetable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timeUnits")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeUnit {
    @Id
    private String id;
    private String time;
    private int length;
    private String end;
    private int timeInMinutes;
}
