package com.example.demo.answerProcessing;

import com.example.demo.answerDB.AnswerService;
import com.example.demo.answerDB.TimeAnswer;
import com.example.demo.timetable.TimeUnit;
import com.example.demo.timetable.TimeUnitService;
import com.example.demo.user.User;
import com.example.demo.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProcessedAnswerService {
    private final AnswerService answerService;
    private final UserService userService;
    private final TimeUnitService timeUnitService;
    private final ProcessedAnswerRepository processedAnswerRepository;


    public List<ProcessedAnswer> answerProcessing(Principal principal) {
        processedAnswerRepository.deleteAll();

        Optional<User> user = userService.findByUsername(principal.getName());
        String userId = user.orElseThrow().getId();

        List<String> questionsIdsByCurrentUser = answerService.findAll().stream().filter(e -> e.getUserId().equals(userId)).map(TimeAnswer::getQuestionId).toList();
        if ((questionsIdsByCurrentUser.contains("62e12614a362100c83bb83ab") && questionsIdsByCurrentUser.contains("62e12621a362100c83bb83ac"))) {
            String answer1 = answerService.findByUserIdAndQuestionId (userId, "62e12614a362100c83bb83ab").orElseThrow().getTime();
            String answer2 = answerService.findByUserIdAndQuestionId (userId, "62e12621a362100c83bb83ac").orElseThrow().getTime();
            TimeUnit timeUnit = new TimeUnit();
            timeUnit.setTime(answer1);
            timeUnit.setEnd(answer2);
            timeUnit.setLength(5);
            ProcessedAnswer processedAnswer_work = new ProcessedAnswer();

            List<TimeUnit> timeUnitList = timeUnitService.createTimeUnitList(timeUnit);
            List<String> timeList = timeUnitList.stream().map(TimeUnit::getId).toList();
            processedAnswer_work.setTimeList(timeList);
            processedAnswer_work.setTask("work");
            processedAnswer_work.setColor("#DF7401");

            processedAnswerRepository.save(processedAnswer_work);
        }
        return processedAnswerRepository.findAll();
    }
}
