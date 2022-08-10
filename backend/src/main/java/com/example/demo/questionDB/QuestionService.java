package com.example.demo.questionDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question addNewQuestion(Question question) {
        if (question.order > 1) {
            question.setPreviousQuestionId(questionRepository.findQuestionByOrder(question.order - 1).orElseThrow().id);
        }
        return questionRepository.save(question);
    }

    public List<Question> findAll() {
        return questionRepository.findAll();
    }
}
