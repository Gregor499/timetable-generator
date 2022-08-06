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

import static java.lang.Character.getNumericValue;

@Service
@RequiredArgsConstructor
public class ProcessedTimeAnswerService {
    private final AnswerService answerService;
    private final UserService userService;
    private final TimeUnitService timeUnitService;
    private final ProcessedTimeAnswerRepository processedAnswerRepository;


    public List<ProcessedTimeAnswer> processTimeAnswers(Principal principal) {

        String userId = getUserId(principal);

        cleanUpExistingProcessedAnswers(userId, getProcessedAnswersByUserId(userId));

        timeAnswerProcessing(userId);

        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }

    public String getUserId(Principal principal) {
        Optional<User> user = userService.findByUsername(principal.getName());
        return user.orElseThrow().getId();
    }

    public void cleanUpExistingProcessedAnswers(String userId, List<ProcessedTimeAnswer> processedTimeAnswersByUserIdList) {
        /*for (ProcessedTimeAnswer processedTimeAnswer : processedTimeAnswersByUserIdList) {
            if (processedTimeAnswer.userId.equals(userId)) {
                processedAnswerRepository.delete(processedTimeAnswer);
            }
        }*/
        processedAnswerRepository.deleteAll();
    }

    public void timeAnswerProcessing(String userId) {
        safeProcessedAnswer("work", "#DF7401", userId, answerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime(), answerService.findByUserIdAndQuestion(userId, "When does your work end ?").orElseThrow().getTime());
        safeProcessedAnswer("sleepMorning", "#000000", userId,
                morningTimeShorter(answerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTimeInMinutes()),
                answerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime());
        safeProcessedAnswer("sleepNight", "#000000", userId, answerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime(), "12:00");
    }

    public String morningTimeShorter(int begin) {
        int shortenedTime = begin - 60;
        if (shortenedTime < 0) {
            shortenedTime = 0;
        }

        int hours = 0;
        int minutes;
        for (int j = shortenedTime; j >= 60; j = j - 60) {
            hours++;
        }
        minutes = shortenedTime - (60 * hours);

        String hoursString;

        if (hours / 10 < 1) {
            hoursString = "0" + hours;
        } else {
            hoursString = hours + "";
        }

        String minutesString;

        if (minutes / 10 < 1) {
            minutesString = "0" + minutes;
        } else {
            minutesString = minutes + "";
        }
        return hoursString + ":" + minutesString;
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

    public List<ProcessedTimeAnswer> getProcessedAnswersByUserId(String userId) {
        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }
}
