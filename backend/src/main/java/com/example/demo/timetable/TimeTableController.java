package com.example.demo.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;

@RestController
@RequestMapping("api/time")
@RequiredArgsConstructor
public class TimeTableController {
    private final TimeUnitService timeUnitService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    LinkedList<TimeUnit> createTimeUnitList(TimeUnit timeUnit, int length, String end) {
        return timeUnitService.createTimeUnitList(timeUnit, length, end);
    }

}
