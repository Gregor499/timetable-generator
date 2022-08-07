package com.example.demo.timetable;

import com.example.demo.answerDB.TimeAnswerService;
import com.example.demo.answerDB.TimeAnswer;
import com.example.demo.answerProcessing.ProcessedTimeAnswer;
import com.example.demo.answerProcessing.ProcessedTimeAnswerService;
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
    private final TimeAnswerService timeAnswerService;
    private final UserService userService;
    private final ProcessedTimeAnswerService processedTimeAnswerService;

    @PostMapping("/time")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    List<TimeUnit> createTimeUnitList(@RequestBody TimeUnit timeUnit) {
        timeUnitService.saveTimeUnitListInDb(timeUnitService.createTimeUnitList(timeUnit));
        return timeUnitService.findAll();
    }

    @GetMapping("time")
    List<TimeUnit> getTimeUnitList() {
        return timeUnitService.findAll();
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
    TimeAnswer addAnswer(@RequestBody TimeAnswer timeAnswer, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        timeAnswer.setUserId(user.getId());
        timeAnswerService.addNewAnswer(timeAnswer);
        return timeAnswerService.findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).orElseThrow();
    }

    @GetMapping("/answers")
    List<TimeAnswer> getAnswers() {
        return timeAnswerService.findAll();
    }

    @GetMapping("/processedTimeAnswers")
    List<ProcessedTimeAnswer> getProcessedAnswers(Principal principal) {
        return processedTimeAnswerService.processTimeAnswers(principal);
    }
}
