package com.example.demo.questionDB;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    Optional<Question> findQuestionById(String id);
    Optional<Question> findQuestionByOrder(int order);
}
