package application.answerProcessing;

import application.answer.TimeAnswer;
import application.answer.TimeAnswerService;
import application.answer.WeekdayAnswer;
import application.answer.WeekdayAnswerService;
import application.timetable.TimeUnit;
import application.timetable.TimeUnitService;
import application.user.User;
import application.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimeAnswerProcessingService {
    private static final String WORKDAY_QUESTION = "On which days do you work ?";

    private final TimeAnswerService timeAnswerService;
    private final WeekdayAnswerService weekdayAnswerService;
    private final UserService userService;
    private final TimeUnitService timeUnitService;
    private final ProcessedTimeAnswerRepository processedAnswerRepository;


    public List<ProcessedTimeAnswer> processTimeAnswers(Principal principal) throws Exception {
        String userId = getUserId(principal);

        cleanUpExistingProcessedAnswers(userId);
        process(userId);

        timeAnswerService.deleteAllAnswers();
        weekdayAnswerService.deleteAllAnswers();

        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }

    public String getUserId(Principal principal) {
        Optional<User> user = userService.findByUsername(principal.getName());
        return user.orElseThrow().getId();
    }

    public void cleanUpExistingProcessedAnswers(String userId) {
        processedAnswerRepository.deleteProcessedTimeAnswersByUserId(userId);
    }

    public void process(String userId) throws Exception {
        for (QuestionConnection questionConnection : QuestionConnection.values()) {
            connectAnswers(questionConnection, userId);
        }
    }
    
    public void connectAnswers(QuestionConnection questionConnection, String userId) throws Exception {
        int timeOffset = questionConnection.getTimeOffset();
        String taskName = questionConnection.getTaskName();
        String weekdayQuestion = WORKDAY_QUESTION;
        String beginQuestion = questionConnection.getBeginQuestion();
        String endQuestion = questionConnection.getEndQuestion();

        Map<String, Boolean> weekdays = getWeekdays(userId, weekdayQuestion);

        TimeAnswer beginAnswer = getTimeAnswer(userId, beginQuestion);
        TimeAnswer endAnswer = getTimeAnswer(userId, endQuestion);

        String beginTime = beginAnswer.getTime();
        String endTime = endAnswer.getTime();

        String adjustedBeginTime = setRenderCap(beginAnswer.getTimeInMinutes(), timeOffset);
        String adjustedEndTime = setRenderCap(endAnswer.getTimeInMinutes(), timeOffset);

        if (timeOffset < 0) {
            safeProcessedAnswer(taskName, weekdays, createTimeUnitList(adjustedBeginTime, endTime), userId);
        }
        if (timeOffset > 0) {
            safeProcessedAnswer(taskName, weekdays, createTimeUnitList(beginTime, adjustedEndTime), userId);
        }
        if (timeOffset == 0) {
            safeProcessedAnswer(taskName, getWeekdays(userId, weekdayQuestion), createTimeUnitList(beginTime, endTime), userId);
        } else {
            log.info("Unplanned shift value :{}", timeOffset);
        }
    }

    private Map<String, Boolean> getWeekdays(String userId, String question) throws Exception {
        WeekdayAnswer weekdayAnswer = weekdayAnswerService.findByUserIdAndQuestion(userId, question)
                .orElseThrow(() -> new Exception("Error: weekdayAnswer not available!"));

        Map<String, Boolean> weekdays = new HashMap<>();
        weekdays.put("monday", weekdayAnswer.isMonday());
        weekdays.put("tuesday", weekdayAnswer.isTuesday());
        weekdays.put("wednesday", weekdayAnswer.isWednesday());
        weekdays.put("thursday", weekdayAnswer.isThursday());
        weekdays.put("friday", weekdayAnswer.isFriday());
        weekdays.put("saturday", weekdayAnswer.isSaturday());
        weekdays.put("sunday", weekdayAnswer.isSunday());

        return weekdays;
    }

    private TimeAnswer getTimeAnswer(String userId, String question) throws Exception {
        return timeAnswerService.findByUserIdAndQuestion(userId, question)
                .orElseThrow(() -> new Exception("Answer not found for question: " + question));
    }

    public String setRenderCap(int timeInMinutes, int shift) {
        int renderCap = Math.max(0, Math.min(timeInMinutes + shift, 1440));
        return timeUnitService.convertMinutesToTimeUnit(renderCap);
    }

    public void safeProcessedAnswer(String task, Map<String, Boolean> workdays, List<String> timeList, String userId) {
        ProcessedTimeAnswer processedTimeAnswer = new ProcessedTimeAnswer();
        processedTimeAnswer.setTask(task);
        processedTimeAnswer.setWorkdays(workdays);
        processedTimeAnswer.setTimeList(timeList);
        processedTimeAnswer.setUserId(userId);

        processedAnswerRepository.save(processedTimeAnswer);
    }

    public List<String> createTimeUnitList(String startTime, String endTime) {
        TimeUnit timeUnit = new TimeUnit(startTime, endTime, 5);

        List<TimeUnit> timeUnitList = timeUnitService.createTimeUnitList(timeUnit);
        List<String> timeList = new java.util.ArrayList<>(timeUnitList.stream()
                .map(TimeUnit::getTime)
                .toList());
        timeList.remove(timeList.size() - 1);
        return timeList;
    }


    public List<ProcessedTimeAnswer> getProcessedAnswersByUserId(Principal principal) {
        String userId = getUserId(principal);
        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }
}
