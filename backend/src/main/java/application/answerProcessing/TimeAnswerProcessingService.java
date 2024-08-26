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
        connectAnswers(userId, "morningSleep", WORKDAY_QUESTION,
                "When do you want to wake up ?", "When do you want to wake up ?", -OFFSET);

        //morningRoutine is connected to morningSleep
        connectAnswers(userId, "morningRoutine", WORKDAY_QUESTION,
                "When do you want to wake up ?", "When are you ready for the day?", 0);

        connectAnswers(userId, "workWayTime", WORKDAY_QUESTION,
                "When do you want to begin going to work ?", "When does your work start ?", 0);

        connectAnswers(userId, "work", WORKDAY_QUESTION,
                "When does your work start ?", "When does your work end ?", 0);

        connectAnswers(userId, "leisureTime", WORKDAY_QUESTION,
                "When does your leisure time start ?", "When does your leisure time end ?", 0);

        //eveningRoutine is connected to nightSleep
        connectAnswers(userId, "eveningRoutine", WORKDAY_QUESTION,
                "When do you want to start to get ready for bed ?", "When do you want to sleep ?", 0);

        connectAnswers(userId, "nightSleep", WORKDAY_QUESTION, "When do you want to sleep ?", "When do you want to sleep ?", OFFSET);
    }

    public void connectAnswers(String userId, String questionType, String weekdayType, String startTimeQuestion, String endTimeQuestion, int shift) throws Exception {
        if (shift < 0) {
            safeProcessedAnswer(questionType, getWeekdays(userId, weekdayType), userId,
                    setRenderCap(timeAnswerService.findByUserIdAndQuestion(userId, startTimeQuestion).orElseThrow().getTimeInMinutes(), shift),
                    timeAnswerService.findByUserIdAndQuestion(userId, endTimeQuestion).orElseThrow().getTime());
        }
        if (shift > 0) {
            safeProcessedAnswer(questionType, getWeekdays(userId, weekdayType), userId,
                    timeAnswerService.findByUserIdAndQuestion(userId, startTimeQuestion).orElseThrow().getTime(),
                    setRenderCap(timeAnswerService.findByUserIdAndQuestion(userId, endTimeQuestion).orElseThrow().getTimeInMinutes(), shift));
        }
        if(shift == 0){
            safeProcessedAnswer(questionType, getWeekdays(userId, weekdayType), userId,
                    timeAnswerService.findByUserIdAndQuestion(userId, startTimeQuestion).orElseThrow().getTime(),
                    timeAnswerService.findByUserIdAndQuestion(userId, endTimeQuestion).orElseThrow().getTime());
        }
        else {
            log.info("Unplanned 'else' case because of shift value :{}", shift);
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
