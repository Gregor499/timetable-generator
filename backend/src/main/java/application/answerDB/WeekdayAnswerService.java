package application.answerDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WeekdayAnswerService {
    private final WeekdayAnswerRepository weekdayAnswerRepository;

    public void saveOrUpdateAnswer(WeekdayAnswer weekdayAnswer) {
        deleteExistingAnswerIfPresent(weekdayAnswer.getUserId(), weekdayAnswer.getQuestionId());
        weekdayAnswerRepository.save(weekdayAnswer);
    }

    private void deleteExistingAnswerIfPresent(String userId, String questionId) {
        findByUserIdAndQuestionId(userId, questionId).ifPresent(weekdayAnswerRepository::delete);
    }

    public List<WeekdayAnswer> findAll() {
        return weekdayAnswerRepository.findAll();
    }

    public Optional<WeekdayAnswer> findByUserIdAndQuestionId(String userId, String questionId) {
        return weekdayAnswerRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    public Optional<WeekdayAnswer> findByUserIdAndQuestion(String userId, String question) {
        return weekdayAnswerRepository.findByUserIdAndQuestion(userId, question);
    }

    public void deleteAllAnswers() {
        weekdayAnswerRepository.deleteAll();
    }
}
