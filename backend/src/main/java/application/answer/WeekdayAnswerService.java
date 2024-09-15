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
        deleteExistingAnswerIfPresent(weekdayAnswer.getUserId(), weekdayAnswer.getQuestionId());
        weekdayAnswerRepository.save(weekdayAnswer);
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

    public void deleteExistingAnswerIfPresent(String userId, String questionId) {
        findByUserIdAndQuestionId(userId, questionId)
                .ifPresentOrElse( //error if multiple answers found
                    weekdayAnswerRepository::delete, () -> log.debug("Answer not found for userId: {} and questionId: {}", userId, questionId)

                );
    }
}
