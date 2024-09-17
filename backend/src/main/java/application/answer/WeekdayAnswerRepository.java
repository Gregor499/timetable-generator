package application.answer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface WeekdayAnswerRepository extends MongoRepository<WeekdayAnswer, String> {
    Optional<WeekdayAnswer> findByUserIdAndQuestionId(String userId, String questionId);
    Optional<List<WeekdayAnswer>> findAllByUserIdAndQuestionId(String userId, String questionId);
    Optional<WeekdayAnswer> findByUserIdAndQuestion(String userId, String question);
}