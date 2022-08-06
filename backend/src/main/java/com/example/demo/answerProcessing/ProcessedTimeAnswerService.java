package com.example.demo.answerProcessing;

import com.example.demo.answerDB.AnswerService;
import com.example.demo.timetable.TimeUnit;
import com.example.demo.timetable.TimeUnitService;
import com.example.demo.user.User;
import com.example.demo.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProcessedTimeAnswerService {
    private final AnswerService answerService;
    private final UserService userService;
    private final TimeUnitService timeUnitService;
    private final ProcessedTimeAnswerRepository processedAnswerRepository;


    public List<ProcessedTimeAnswer> timeAnswerProcessing(Principal principal) {

        String userId = getUserId(principal);

        cleanUpExistingProcessedAnswers(userId, getProcessedAnswersByUserId(userId));

        dataProcessing(userId);

        return processedAnswerRepository.findAll();
    }

    public String getUserId(Principal principal) {
        Optional<User> user = userService.findByUsername(principal.getName());
        return user.orElseThrow().getId();
    }

    public void cleanUpExistingProcessedAnswers(String userId, List<ProcessedTimeAnswer> processedTimeAnswersByUserIdList) {
        for (ProcessedTimeAnswer processedTimeAnswer : processedTimeAnswersByUserIdList) {
            if (processedTimeAnswer.userId.equals(userId)) {
                processedAnswerRepository.delete(processedTimeAnswer);
            }
        }
    }

    public void dataProcessing(String userId) {
            safeProcessedAnswer("work", "#DF7401", userId, answerService.findByUserIdAndQuestionId(userId, "62e12614a362100c83bb83ab").orElseThrow().getTime(), answerService.findByUserIdAndQuestionId(userId, "62e12621a362100c83bb83ac").orElseThrow().getTime());
            safeProcessedAnswer("sleepMorning", "#000000", userId, "00:00", answerService.findByUserIdAndQuestionId(userId, "62e952ca23e813590e3ae529").orElseThrow().getTime());
            safeProcessedAnswer("sleepNight", "#000000", userId, answerService.findByUserIdAndQuestionId(userId, "62e952b023e813590e3ae528").orElseThrow().getTime(), "12:00");
    }

    public void safeProcessedAnswer(String task, String color, String userId, String begin, String end) {
        List<String> timeList = timeListCreation(begin, end);

        ProcessedTimeAnswer processedTimeAnswer = new ProcessedTimeAnswer();
        processedTimeAnswer.setTimeList(timeList);
        processedTimeAnswer.setTask(task);
        processedTimeAnswer.setColor(color);
        processedTimeAnswer.setUserId(userId);
        processedAnswerRepository.save(processedTimeAnswer);
    }

    public List<String> timeListCreation(String begin, String end) {
        TimeUnit timeUnit = new TimeUnit();
        timeUnit.setTime(begin);
        timeUnit.setEnd(end);
        timeUnit.setLength(5);

        List<TimeUnit> timeUnitList = timeUnitService.createTimeUnitList(timeUnit);
        List<String> timeList = new java.util.ArrayList<>(timeUnitList.stream().map(TimeUnit::getTime).toList());
        timeList.remove(timeList.size() - 1);
        return timeList;
    }

    public List<ProcessedTimeAnswer> getProcessedAnswersByUserId(String userId){
        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }
}
