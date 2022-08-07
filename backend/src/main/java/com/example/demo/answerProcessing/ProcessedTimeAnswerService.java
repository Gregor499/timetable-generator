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


    public List<ProcessedTimeAnswer> processTimeAnswers(Principal principal) {

        String userId = getUserId(principal);

        cleanUpExistingProcessedAnswers(userId);

        timeAnswerProcessing(userId);

        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }

    public String getUserId(Principal principal) {
        Optional<User> user = userService.findByUsername(principal.getName());
        return user.orElseThrow().getId();
    }

    public void cleanUpExistingProcessedAnswers(String userId) {
        processedAnswerRepository.deleteProcessedTimeAnswersByUserId(userId);
    }

    public void timeAnswerProcessing(String userId) {
        safeProcessedAnswer("morningSleep", "#000000", userId,
                morningTimeShorter(answerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTimeInMinutes()),
                answerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime());

        safeProcessedAnswer("morningRoutine", "#DF7401", userId, answerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime(),
                answerService.findByUserIdAndQuestion(userId, "Until then do you need to be ready for the day?").orElseThrow().getTime());

        safeProcessedAnswer("workWayTime", "#DF7401", userId, answerService.findByUserIdAndQuestion(userId, "When do you want to begin going to work ?").orElseThrow().getTime(),
                answerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime());

        safeProcessedAnswer("work", "#DF7401", userId, answerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime(),
                answerService.findByUserIdAndQuestion(userId, "When does your work end ?").orElseThrow().getTime());

        safeProcessedAnswer("leisureTime", "#DF7401", userId, answerService.findByUserIdAndQuestion(userId, "When does your leisure time start ?").orElseThrow().getTime(),
                answerService.findByUserIdAndQuestion(userId, "When does your leisure time end ?").orElseThrow().getTime());

        safeProcessedAnswer("eveningRoutine", "#DF7401", userId, answerService.findByUserIdAndQuestion(userId, "When do you want to start to get ready for bed ?").orElseThrow().getTime(),
                answerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime());

        safeProcessedAnswer("nightSleep", "#000000", userId, answerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime(),
                eveningTimeShorter(answerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTimeInMinutes()));
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

    public String eveningTimeShorter(int begin) {
        int shortenedTime = begin + 60;
        if (shortenedTime > 1440) {
            shortenedTime = 1440;
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
