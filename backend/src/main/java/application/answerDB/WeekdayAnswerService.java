package application.answerDB;

import application.timetable.TimeUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WeekdayAnswerService {
    private final WeekdayAnswerRepository weekdayAnswerRepository;

    public void addNewAnswer(WeekdayAnswer weekdayAnswer) {
        if (findByUserIdAndQuestionId(weekdayAnswer.getUserId(), weekdayAnswer.getQuestionId()).isPresent()) {
            weekdayAnswerRepository.delete(findByUserIdAndQuestionId(weekdayAnswer.getUserId(), weekdayAnswer.getQuestionId()).orElseThrow());
        }

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
}
