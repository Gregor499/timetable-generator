package com.example.demo.answerProcessing;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProcessedTimeAnswerRepository extends MongoRepository<ProcessedTimeAnswer, String> {
    List<ProcessedTimeAnswer> getProcessedAnswerListByUserId(String userId);
    void deleteProcessedTimeAnswersByUserId(String userid);
}