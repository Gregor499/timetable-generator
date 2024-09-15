package application.answer;

import application.timetable.TimeUnitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimeAnswerService {
    private final TimeAnswerRepository timeAnswerRepository;
    private final TimeUnitService timeUnitService;

    @Transactional
    public void safeOrUpdateAnswer(TimeAnswer timeAnswer) {
        deleteExistingAnswerIfPresent(timeAnswer.getUserId(), timeAnswer.getQuestionId());
        timeAnswer.setTime(timeUnitService.convertMinutesToTimeUnit(timeAnswer.getTimeInMinutes()));
        timeAnswerRepository.save(timeAnswer);
    }

    public List<TimeAnswer> findAll() {
        return timeAnswerRepository.findAll();
    }

    public Optional<TimeAnswer> findByUserIdAndQuestionId(String userId, String questionId) {
        return timeAnswerRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    public Optional<TimeAnswer> findByUserIdAndQuestion(String userId, String question) {
        return timeAnswerRepository.findByUserIdAndQuestion(userId, question);
    }

    public void deleteAllAnswers() {
        timeAnswerRepository.deleteAll();
    }


    private void deleteExistingAnswerIfPresent(String userId, String questionId) {
        findByUserIdAndQuestionId(userId, questionId)
                .ifPresentOrElse(
                        timeAnswerRepository::delete, () -> log.debug("Answer not found for userId: {} and questionId: {}", userId, questionId)
                );
    }

}
