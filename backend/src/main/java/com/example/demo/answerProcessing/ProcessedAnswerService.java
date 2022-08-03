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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProcessedAnswerService {
    private final AnswerService answerService;
    private final UserService userService;
    private final TimeUnitService timeUnitService;
    private final ProcessedAnswerRepository processedAnswerRepository;


    public List<ProcessedAnswer> answerProcessing(Principal principal) {

        String userId = getUserId(principal);

        List<String> questionIdList = answerService.findAll().stream().filter(e -> e.getUserId().equals(userId)).map(TimeAnswer::getQuestionId).toList();

        cleanUpExistingProcessedAnswers(userId, questionIdList);

        dataProcessing(userId, questionIdList);

        return processedAnswerRepository.findAll();
    }

    public String getUserId(Principal principal) {
        Optional<User> user = userService.findByUsername(principal.getName());
        return user.orElseThrow().getId();
    }

    public void cleanUpExistingProcessedAnswers(String userId, List<String> questionsIdsByCurrentUser) {
        for (String questionId : questionsIdsByCurrentUser) {
            if (processedAnswerRepository.findByUserId(userId).isPresent()) {
                processedAnswerRepository.delete(processedAnswerRepository.findByUserId(userId).orElseThrow());
            }
        }
    }

    public void dataProcessing(String userId, List<String> questionIdList) {
        if ((questionIdList.contains("62e12614a362100c83bb83ab") && questionIdList.contains("62e12621a362100c83bb83ac"))) {

            safeProcessedAnswer(workQuestion("work", "#DF7401", userId, "62e12614a362100c83bb83ab", "62e12621a362100c83bb83ac"));
            safeProcessedAnswer(sleep1Question("sleepMorning", "#000000", userId, "00:00", "62e952ca23e813590e3ae529"));
            safeProcessedAnswer(sleep2Question("sleepNight", "#000000", userId, "62e952b023e813590e3ae528", "12:00"));


        }
    }

    public ProcessingData workQuestion(String task, String color, String userId, String beginQuestion, String endQuestion) {
        ProcessingData workData = new ProcessingData();
        workData.setTask(task);
        workData.setColor(color);
        workData.setBegin(answerService.findByUserIdAndQuestionId(userId, beginQuestion).orElseThrow().getTime());
        workData.setEnd(answerService.findByUserIdAndQuestionId(userId, endQuestion).orElseThrow().getTime());

        return workData;
    }

    public ProcessingData sleep1Question(String task, String color, String userId, String beginQuestion, String endQuestion) {
        ProcessingData sleepMorningData = new ProcessingData();
        sleepMorningData.setTask(task);
        sleepMorningData.setColor(color);
        sleepMorningData.setBegin(beginQuestion);
        sleepMorningData.setEnd(answerService.findByUserIdAndQuestionId(userId, endQuestion).orElseThrow().getTime());

        return sleepMorningData;
    }

    public ProcessingData sleep2Question(String task, String color, String userId, String beginQuestion, String endQuestion) {
        ProcessingData sleepNightData = new ProcessingData();
        sleepNightData.setTask(task);
        sleepNightData.setColor(color);
        sleepNightData.setBegin(answerService.findByUserIdAndQuestionId(userId, beginQuestion).orElseThrow().getTime());
        sleepNightData.setEnd(endQuestion);

        return sleepNightData;
    }

    public List<String> timeListCreation(ProcessingData processingData) {
        TimeUnit timeUnit = new TimeUnit();
        timeUnit.setTime(processingData.begin);
        timeUnit.setEnd(processingData.end);
        timeUnit.setLength(5);

        List<TimeUnit> timeUnitList = timeUnitService.createTimeUnitList(timeUnit);
        List<String> timeList = new java.util.ArrayList<>(timeUnitList.stream().map(TimeUnit::getTime).toList());
        timeList.remove(timeList.size() - 1);
        return timeList;
    }

    public void safeProcessedAnswer(ProcessingData processingData) {
        List<String> timeList = timeListCreation(processingData);
        ProcessedAnswer processedAnswer = new ProcessedAnswer();
        processedAnswer.setTimeList(timeList);
        processedAnswer.setTask(processingData.task);
        processedAnswer.setColor(processingData.color);
        processedAnswer.setUserId("test");
        processedAnswerRepository.save(processedAnswer);
    }
}
