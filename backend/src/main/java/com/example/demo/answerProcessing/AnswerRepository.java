package com.example.demo.answerProcessing;

import com.example.demo.timetable.TimeUnit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AnswerRepository extends MongoRepository<Answer, String> {
    Optional<Answer> findAnswerById(String id);
}