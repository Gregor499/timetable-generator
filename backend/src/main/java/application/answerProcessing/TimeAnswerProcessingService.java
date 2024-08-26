package application.answerProcessing;

import application.answerDB.TimeAnswerService;
import application.answerDB.WeekdayAnswer;
import application.answerDB.WeekdayAnswerService;
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
    private static final int OFFSET = 60;

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
        for (AnswerConnection answerConnection : AnswerConnection.values()) {
            connectAnswers(answerConnection, userId);
        }
    }

    //todo: rename task to questionType
    //todo: flexible offset
    //todo: untangle "connectAnswers()"

    public void connectAnswers(AnswerConnection answerConnection, String userId) throws Exception {
        if (answerConnection.getTimeOffset() < 0) {
            safeProcessedAnswer(answerConnection.getTaskName(), getWeekdays(userId, WORKDAY_QUESTION), userId,
                    setRenderCap(timeAnswerService.findByUserIdAndQuestion(userId, answerConnection.getBeginQuestion())
                            .orElseThrow(() -> new Exception("Answer not found for question: " + answerConnection.getBeginQuestion()))
                            .getTimeInMinutes(), answerConnection.getTimeOffset()),
                    timeAnswerService.findByUserIdAndQuestion(userId, answerConnection.getEndQuestion())
                            .orElseThrow(() -> new Exception("Answer not found for question: " + answerConnection.getEndQuestion()))
                            .getTime());
        }
        if (answerConnection.getTimeOffset() > 0) {
            safeProcessedAnswer(answerConnection.getTaskName(), getWeekdays(userId, WORKDAY_QUESTION), userId,
                    timeAnswerService.findByUserIdAndQuestion(userId, answerConnection.getBeginQuestion())
                            .orElseThrow(() -> new Exception("Answer not found for question: " + answerConnection.getBeginQuestion()))
                            .getTime(),
                    setRenderCap(timeAnswerService.findByUserIdAndQuestion(userId, answerConnection.getEndQuestion())
                            .orElseThrow(() -> new Exception("Answer not found for question: " + answerConnection.getEndQuestion()))
                            .getTimeInMinutes(), answerConnection.getTimeOffset()));
        }
        if(answerConnection.getTimeOffset() == 0){
            safeProcessedAnswer(answerConnection.getTaskName(), getWeekdays(userId, WORKDAY_QUESTION), userId,
                    timeAnswerService.findByUserIdAndQuestion(userId, answerConnection.getBeginQuestion())
                            .orElseThrow(() -> new Exception("Answer not found for question: " + answerConnection.getBeginQuestion()))
                            .getTime(),
                    timeAnswerService.findByUserIdAndQuestion(userId, answerConnection.getEndQuestion())
                            .orElseThrow(() -> new Exception("Answer not found for question: " + answerConnection.getEndQuestion()))
                            .getTime());
        }
        else {
            log.info("Unplanned 'else' case because of shift value :{}", answerConnection.getTimeOffset());
        }
    }

    public String setRenderCap(int timeInMinutes, int shift) {
        int renderCap = Math.max(0, Math.min(timeInMinutes + shift, 1440));
        return timeUnitService.convertMinutesToTimeUnit(renderCap);
    }

    public void safeProcessedAnswer(String task, Map<String, Boolean> workdays, String userId, String startTime, String endTime) {
        List<String> timeList = createTimeList(startTime, endTime);

        ProcessedTimeAnswer processedTimeAnswer = new ProcessedTimeAnswer();
        processedTimeAnswer.setTimeList(timeList);
        processedTimeAnswer.setTask(task);
        processedTimeAnswer.setWorkdays(workdays);
        processedTimeAnswer.setUserId(userId);

        processedAnswerRepository.save(processedTimeAnswer);
    }

    public List<String> createTimeList(String startTime, String endTime) {
        TimeUnit timeUnit = new TimeUnit(startTime, endTime, 5);

        List<TimeUnit> timeUnitList = timeUnitService.createTimeUnitList(timeUnit);
        List<String> timeList = new java.util.ArrayList<>(timeUnitList.stream()
                .map(TimeUnit::getTime)
                .toList());
        timeList.remove(timeList.size() - 1);
        return timeList;
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

    public List<ProcessedTimeAnswer> getProcessedAnswersByUserId(String userId) {
        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }
}
