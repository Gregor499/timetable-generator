package application.answerProcessing;

import application.answerDB.TimeAnswerService;
import application.answerDB.WeekdayAnswer;
import application.answerDB.WeekdayAnswerService;
import application.timetable.TimeUnit;
import application.timetable.TimeUnitService;
import application.user.User;
import application.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        safeProcessedAnswer("morningSleep", getWeekdays(userId, WORKDAY_QUESTION), userId,
                setRenderCap(timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTimeInMinutes(), - 60),
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime());

        safeProcessedAnswer("morningRoutine", getWeekdays(userId, WORKDAY_QUESTION), userId,
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When are you ready for the day?").orElseThrow().getTime());

        safeProcessedAnswer("workWayTime", getWeekdays(userId, WORKDAY_QUESTION), userId,
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to begin going to work ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime());

        safeProcessedAnswer("work", getWeekdays(userId, WORKDAY_QUESTION), userId,
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your work end ?").orElseThrow().getTime());

        safeProcessedAnswer("leisureTime", getWeekdays(userId, WORKDAY_QUESTION), userId,
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your leisure time start ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your leisure time end ?").orElseThrow().getTime());

        safeProcessedAnswer("eveningRoutine", getWeekdays(userId, WORKDAY_QUESTION), userId,
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to start to get ready for bed ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime());

        safeProcessedAnswer("nightSleep", getWeekdays(userId, WORKDAY_QUESTION), userId,
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime(),
                setRenderCap(timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTimeInMinutes(), + 60));
    }

    public String setRenderCap(int timeInMinutes, int shift) {
        int renderCap = Math.max(0, Math.min(timeInMinutes + shift, 1440));
        return timeUnitService.timeInMinutesToTimeConverter(renderCap);
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
