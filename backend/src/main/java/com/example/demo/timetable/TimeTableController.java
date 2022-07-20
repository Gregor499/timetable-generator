package com.example.demo.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.LinkedList;

@RestController
@RequestMapping("/api/time")
@RequiredArgsConstructor
public class TimeTableController {
    private final TimeUnitService timeUnitService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    LinkedList<TimeUnit> createTimeUnitList(TimeUnit timeUnit, int length, String end) {
        TimeUnit timeUnitTest = new TimeUnit("0","8:00");
        return timeUnitService.createTimeUnitList(timeUnitTest, 5, "22:00");
    }
}
