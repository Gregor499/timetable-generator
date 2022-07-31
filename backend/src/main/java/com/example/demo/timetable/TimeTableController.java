package com.example.demo.timetable;

import com.example.demo.answerProcessing.AnswerService;
import com.example.demo.answerProcessing.TimeAnswer;
import com.example.demo.questionDB.Question;
import com.example.demo.questionDB.QuestionService;
import com.example.demo.user.User;
import com.example.demo.user.UserService;
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

    private final AnswerService answerService;

    private final UserService userService;
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

    @PostMapping("/answers")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    void addAnswer(@RequestBody TimeAnswer timeAnswer, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        timeAnswer.setUserId(user.getId());
        answerService.addNewAnswer(timeAnswer);
    }

    @GetMapping("/answers")
    List<TimeAnswer> getAnswers(){
        return answerService.findAll();
    }
}
