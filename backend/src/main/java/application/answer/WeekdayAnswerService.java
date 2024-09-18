package application.answer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WeekdayAnswerService {
    private final WeekdayAnswerRepository weekdayAnswerRepository;

    @Transactional
    public void saveOrUpdateAnswer(WeekdayAnswer weekdayAnswer) {
        deleteAllExistingAnswersIfPresent(weekdayAnswer.getUserId(), weekdayAnswer.getQuestionId());
        weekdayAnswerRepository.save(weekdayAnswer);
    }

    public List<WeekdayAnswer> findAll() {
        return weekdayAnswerRepository.findAll();
    }

    public Optional<List<WeekdayAnswer>> findAllByUserIdAndQuestionId(String userId, String questionId) {
        return weekdayAnswerRepository.findAllByUserIdAndQuestionId(userId, questionId);
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

    public void deleteAllExistingAnswersIfPresent(String userId, String questionId) {
        findAllByUserIdAndQuestionId(userId, questionId)
                .ifPresentOrElse( weekdayAnswers ->
                    weekdayAnswers.forEach(weekdayAnswerRepository::delete), () -> log.debug("Answer not found for userId: {} and questionId: {}", userId, questionId)
                );
    }
}
