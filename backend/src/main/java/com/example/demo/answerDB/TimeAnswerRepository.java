package com.example.demo.answerDB;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface TimeAnswerRepository extends MongoRepository<TimeAnswer, String> {
    Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId);
    Optional<TimeAnswer> findByUserIdAndQuestion(String userId, String question);
}