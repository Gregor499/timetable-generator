package application.timetableGenerator;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import application.answer.WeekdayAnswer;
import application.answer.WeekdayAnswerRepository;
import application.answer.WeekdayAnswerService;

public class WeekdayAnswerServiceTest {

    @Mock
    private WeekdayAnswerRepository weekdayAnswerRepository;

    @Mock
    private Logger log;

    @InjectMocks
    private WeekdayAnswerService weekdayAnswerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        log = LoggerFactory.getLogger(WeekdayAnswerService.class);
    }

    @Test
    void testDeleteAllExistingAnswerIfPresent_AnswersFound() {
        // Arrange
        String userId = "testUserId";
        String questionId = "testQuestionId";
        WeekdayAnswer answer = new WeekdayAnswer();
        when(weekdayAnswerRepository.findByUserIdAndQuestionId(userId, questionId)).thenReturn(Optional.of(answer));

        // Act
        weekdayAnswerService.deleteAllExistingAnswersIfPresent(userId, questionId);

        // Assert
        verify(weekdayAnswerRepository, times(1)).delete(answer);
        //verify(log, never()).debug(anyString(), anyString(), anyString());
    }

    @Test
    void testDeleteAllExistingAnswerIfPresent_AnswersNotFound() {
        // Arrange
        String userId = "testUserId";
        String questionId = "testQuestionId";
        when(weekdayAnswerRepository.findByUserIdAndQuestionId(userId, questionId)).thenReturn(Optional.empty());

        // Act
        weekdayAnswerService.deleteAllExistingAnswersIfPresent(userId, questionId);

        // Assert
        verify(weekdayAnswerRepository, never()).delete(any());
        //verify(log, times(1)).debug("Answer not found for userId: {} and questionId: {}", userId, questionId);
    }
}