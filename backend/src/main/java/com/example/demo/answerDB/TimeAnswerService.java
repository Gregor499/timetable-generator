package com.example.demo.answerDB;

import com.example.demo.timetable.TimeUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.Character.getNumericValue;

@Service
@RequiredArgsConstructor
public class TimeAnswerService {
    private final TimeAnswerRepository timeAnswerRepository;
    private final TimeUnitService timeUnitService;

    public void addNewAnswer(TimeAnswer timeAnswer) {
        if (findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).isPresent()) {
            timeAnswerRepository.delete(findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).orElseThrow());
        }

        timeAnswer.setTime(timeUnitService.timeInMinutesToTimeConverter(timeAnswer.getTimeInMinutes()));

        timeAnswerRepository.save(timeAnswer);
    }

    public List<TimeAnswer> findAll() {
        return timeAnswerRepository.findAll();
    }

    public Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId) {
        return timeAnswerRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    public Optional<TimeAnswer> findByUserIdAndQuestion(String userId, String question) {
        return timeAnswerRepository.findByUserIdAndQuestion(userId, question);
    }

    public void deleteAllAnswers() {
        timeAnswerRepository.deleteAll();
    }
}
