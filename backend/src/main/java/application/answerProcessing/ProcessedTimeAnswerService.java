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
public class ProcessedTimeAnswerService {
    private final TimeAnswerService timeAnswerService;

    private final WeekdayAnswerService weekdayAnswerService;
    private final UserService userService;
    private final TimeUnitService timeUnitService;
    private final ProcessedTimeAnswerRepository processedAnswerRepository;


    public List<ProcessedTimeAnswer> processTimeAnswers(Principal principal) throws Exception {

        String userId = getUserId(principal);

        cleanUpExistingProcessedAnswers(userId);

        timeAnswerProcessing(userId);

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

    public void timeAnswerProcessing(String userId) throws Exception {
        safeProcessedAnswer("morningSleep", getWorkdayBooleans(userId, "On which days do you work ?"), "#000000", userId,
                morningTimeShorter(timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTimeInMinutes()),
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime());

        safeProcessedAnswer("morningRoutine", getWorkdayBooleans(userId, "On which days do you work ?"), "#DF7401", userId, timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to wake up ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When are you ready for the day?").orElseThrow().getTime());

        safeProcessedAnswer("workWayTime", getWorkdayBooleans(userId, "On which days do you work ?"), "#DF7401", userId, timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to begin going to work ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime());

        safeProcessedAnswer("work", getWorkdayBooleans(userId, "On which days do you work ?"), "#DF7401", userId, timeAnswerService.findByUserIdAndQuestion(userId, "When does your work start ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your work end ?").orElseThrow().getTime());

        safeProcessedAnswer("leisureTime", getWorkdayBooleans(userId, "On which days do you work ?"), "#DF7401", userId, timeAnswerService.findByUserIdAndQuestion(userId, "When does your leisure time start ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When does your leisure time end ?").orElseThrow().getTime());

        safeProcessedAnswer("eveningRoutine", getWorkdayBooleans(userId, "On which days do you work ?"), "#DF7401", userId, timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to start to get ready for bed ?").orElseThrow().getTime(),
                timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime());

        safeProcessedAnswer("nightSleep", getWorkdayBooleans(userId, "On which days do you work ?"), "#000000", userId, timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTime(),
                eveningTimeShorter(timeAnswerService.findByUserIdAndQuestion(userId, "When do you want to sleep ?").orElseThrow().getTimeInMinutes()));
    }

    public String morningTimeShorter(int begin) {
        int shortenedTime = begin - 60;
        if (shortenedTime < 0) {
            shortenedTime = 0;
        }

        return timeUnitService.timeInMinutesToTimeConverter(shortenedTime);
    }

    public String eveningTimeShorter(int begin) {
        int shortenedTime = begin + 60;
        if (shortenedTime > 1440) {
            shortenedTime = 1440;
        }
        return timeUnitService.timeInMinutesToTimeConverter(shortenedTime);
    }

    public void safeProcessedAnswer(String task, Map<String, Boolean> workdays, String color, String userId, String begin, String end) {
        List<String> timeList = timeListCreation(begin, end);

        ProcessedTimeAnswer processedTimeAnswer = new ProcessedTimeAnswer();
        processedTimeAnswer.setTimeList(timeList);
        processedTimeAnswer.setTask(task);
        processedTimeAnswer.setMonday(workdays.get("monday"));
        processedTimeAnswer.setTuesday(workdays.get("tuesday"));
        processedTimeAnswer.setWednesday(workdays.get("wednesday"));
        processedTimeAnswer.setThursday(workdays.get("thursday"));
        processedTimeAnswer.setFriday(workdays.get("friday"));
        processedTimeAnswer.setSaturday(workdays.get("saturday"));
        processedTimeAnswer.setSunday(workdays.get("sunday"));
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

    private Map<String, Boolean> getWorkdayBooleans(String userId, String question) throws Exception {
        Map<String, Boolean> workdayBooleans = new HashMap<>();
        if (weekdayAnswerService.findByUserIdAndQuestion(userId, question).isPresent()){
            WeekdayAnswer weekdayAnswer = weekdayAnswerService.findByUserIdAndQuestion(userId, question).get();
            workdayBooleans.put("monday", weekdayAnswer.isMonday());
            workdayBooleans.put("tuesday", weekdayAnswer.isTuesday());
            workdayBooleans.put("wednesday", weekdayAnswer.isWednesday());
            workdayBooleans.put("thursday", weekdayAnswer.isThursday());
            workdayBooleans.put("friday", weekdayAnswer.isFriday());
            workdayBooleans.put("saturday", weekdayAnswer.isSaturday());
            workdayBooleans.put("sunday", weekdayAnswer.isSunday());

        }
        else throw new Exception("Error: workdayAnswer not available !");
        return workdayBooleans;
    }
    public List<ProcessedTimeAnswer> getProcessedAnswersByUserId(String userId) {
        return processedAnswerRepository.getProcessedAnswerListByUserId(userId);
    }
}
