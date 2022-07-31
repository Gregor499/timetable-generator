package com.example.demo.answerProcessing;

import com.example.demo.timetable.TimeUnit;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.MongoCollection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import javax.management.Query;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public void addNewAnswer(TimeAnswer timeAnswer) {
        if (findByUserIdAndQuestionId(timeAnswer).isPresent()) {
            answerRepository.delete(findByUserIdAndQuestionId(timeAnswer).orElseThrow());
        }
        answerRepository.save(timeAnswer);
    }

    public List<TimeAnswer> findAll() {
        return answerRepository.findAll();
    }

    public Optional<TimeAnswer> findByUserIdAndQuestionId(TimeAnswer timeAnswer) {
        return answerRepository.findByUserIdAndQuestionId(timeAnswer.getUserId(), timeAnswer.getQuestionId());
    }
}
