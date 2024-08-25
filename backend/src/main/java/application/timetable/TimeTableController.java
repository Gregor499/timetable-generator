package application.timetable;

import application.answerDB.TimeAnswerService;
import application.answerDB.TimeAnswer;
import application.answerDB.WeekdayAnswer;
import application.answerDB.WeekdayAnswerService;
import application.answerProcessing.ProcessedTimeAnswer;
import application.answerProcessing.TimeAnswerProcessingService;
import application.questionDB.Question;
import application.questionDB.QuestionService;
import application.user.User;
import application.user.UserService;
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
    private final WeekdayAnswerService weekdayAnswerService;
    private final UserService userService;
    private final TimeAnswerProcessingService timeAnswerProcessingService;

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

    @PostMapping("/timeAnswers")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    TimeAnswer addAnswer(@RequestBody TimeAnswer timeAnswer, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        timeAnswer.setUserId(user.getId());
        timeAnswerService.addNewAnswer(timeAnswer);
        return timeAnswerService.findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).orElseThrow();
    }

    @PostMapping("/weekdayAnswers")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    WeekdayAnswer addAnswer(@RequestBody WeekdayAnswer weekdayAnswer, Principal principal) {
        User user = userService.findByUsername(principal.getName()).orElseThrow();
        weekdayAnswer.setUserId(user.getId());
        weekdayAnswerService.addNewAnswer(weekdayAnswer);
        return weekdayAnswerService.findByUserIdAndQuestionId(weekdayAnswer.getUserId(), weekdayAnswer.getQuestionId()).orElseThrow();
    }

    @GetMapping("/answers")
    List<TimeAnswer> getAnswers() {
        return timeAnswerService.findAll();
    }

    @GetMapping("/processedTimeAnswers")
    List<ProcessedTimeAnswer> getProcessedAnswers(Principal principal) throws Exception {
        return timeAnswerProcessingService.processTimeAnswers(principal);
    }
}
