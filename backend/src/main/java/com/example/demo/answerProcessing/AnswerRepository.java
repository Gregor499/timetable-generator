package com.example.demo.answerProcessing;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface AnswerRepository extends MongoRepository<TimeAnswer, String> {
    Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId);
}