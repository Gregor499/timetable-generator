package com.example.demo.answerDB;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface AnswerRepository extends MongoRepository<TimeAnswer, String> {
    Optional<TimeAnswer> findByQuestionId(String questionId);

    Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId);
}