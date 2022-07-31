package com.example.demo.answerDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public void addNewAnswer(TimeAnswer timeAnswer) {
        if (findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).isPresent()) {
            answerRepository.delete(findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId()).orElseThrow());
        }
        answerRepository.save(timeAnswer);
    }

    public List<TimeAnswer> findAll() {
        return answerRepository.findAll();
    }

    public Optional<TimeAnswer> findByQuestionId(String questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    public Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId) {
        return answerRepository.findByUserIdAndQuestionId(userId, questionId);
    }
}
