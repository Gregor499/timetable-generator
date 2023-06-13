package application.answerProcessing;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessedTimeAnswerRepository extends MongoRepository<ProcessedTimeAnswer, String> {
    List<ProcessedTimeAnswer> getProcessedAnswerListByUserId(String userId);
    void deleteProcessedTimeAnswersByUserId(String userid);
}