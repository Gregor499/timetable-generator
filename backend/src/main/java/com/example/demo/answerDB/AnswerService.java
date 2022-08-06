package com.example.demo.answerDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.lang.Character.getNumericValue;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public void addNewAnswer(TimeAnswer timeAnswer) {
        if (findByUserIdAndQuestion(timeAnswer.getUserId(), timeAnswer.getQuestionId()).isPresent()) {
            answerRepository.delete(findByUserIdAndQuestion(timeAnswer.getUserId(), timeAnswer.getQuestionId()).orElseThrow());
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

        answerRepository.save(timeAnswer);
    }

    public List<TimeAnswer> findAll() {
        return answerRepository.findAll();
    }

    public Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId) {
        return answerRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    public Optional<TimeAnswer> findByUserIdAndQuestion(String userId, String question) {
        return answerRepository.findByUserIdAndQuestion(userId, question);
    }
}
