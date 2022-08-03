package com.example.demo.answerProcessing;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcessedAnswerRepository extends MongoRepository<ProcessedAnswer, String> {
    Optional<ProcessedAnswer> findByUserId(String userId);

}