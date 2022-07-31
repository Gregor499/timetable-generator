package com.example.demo.answerProcessing;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public void addNewAnswer(TimeAnswer timeAnswer) {

        answerRepository.save(timeAnswer);
    }

    public List<TimeAnswer> findAll() {
        return answerRepository.findAll();
    }
}
