package com.example.demo.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TimeTableController {
    private final TimeUnitService timeUnitService;
    private final QuestionService questionService;

    @PostMapping("/time")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    List<TimeUnit> createTimeUnitList(@RequestBody TimeUnit timeUnit) {
        return timeUnitService.createTimeUnitList(timeUnit);
    }

    @PostMapping("/questions")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    void addQuestion(@RequestBody Question question) {
        questionService.addNewQuestion(question);
    }

    @GetMapping("/questions")
    List<Question> getQuestions() {
        return questionService.findAll();
    }
}
