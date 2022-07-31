package com.example.demo.questionDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service
    @RequiredArgsConstructor

    public class QuestionService {
        private final QuestionRepository questionRepository;

        public void addNewQuestion(Question question) {
            questionRepository.save(question);
        }

        public List<Question> findAll(){
            return questionRepository.findAll();
        }
}
