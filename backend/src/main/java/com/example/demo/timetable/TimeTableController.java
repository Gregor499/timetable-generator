package com.example.demo.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/time")
@RequiredArgsConstructor
public class TimeTableController {
    private final TimeUnitService timeUnitService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    List<TimeUnit> createTimeUnitList(@RequestBody TimeUnit timeUnit) {
        return timeUnitService.createTimeUnitList(timeUnit);
    }
}
