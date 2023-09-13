package application.answerDB;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface WeekdayAnswerRepository extends MongoRepository<WeekdayAnswer, String> {
    Optional<WeekdayAnswer> findByUserIdAndQuestionId(String userId, String questionId);
    Optional<WeekdayAnswer> findByUserIdAndQuestion(String userId, String question);
}