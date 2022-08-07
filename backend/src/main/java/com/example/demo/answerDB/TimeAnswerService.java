package com.example.demo.answerDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.Character.getNumericValue;

@Service
@RequiredArgsConstructor
public class TimeAnswerService {
    private final TimeAnswerRepository timeAnswerRepository;

    public void addNewAnswer(TimeAnswer timeAnswer) {
        if (findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).isPresent()) {
            timeAnswerRepository.delete(findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).orElseThrow());
        }
        int hours = 0;
        int minutes;
        for (int j = timeAnswer.timeInMinutes; j >= 60; j = j - 60) {
            hours++;
        }
        minutes = timeAnswer.timeInMinutes - (60 * hours);

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
        timeAnswer.setTime(hoursString + ":" + minutesString);

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
}
