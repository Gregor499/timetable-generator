package com.example.demo.timetableGenerator;

import com.example.demo.questionDB.Question;
import com.example.demo.questionDB.QuestionRepository;
import com.example.demo.questionDB.QuestionService;
import org.junit.jupiter.api.Test;
import org.assertj.core.api.Assertions;


import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class QuestionServiceTest {

    @Test
    void shouldAddNewQuestionCaseOrderIsGreaterThan1(){
        //GIVEN
        Question question = new Question(null, "b", 2, "b");
        Question prevQuestion = new Question("a", "a", 1, "a");

        Question expected = new Question("b", "b", 2, "b", "a");

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.save(question)).thenReturn(expected);
        when(questionRepository.findQuestionByOrder(1)).thenReturn(Optional.of(prevQuestion));

        QuestionService questionService = new QuestionService(questionRepository);

        //WHEN
        Question actual = questionService.addNewQuestion(question);

        //THEN
        Assertions.assertThat(actual).isEqualTo(expected);
    }

    @Test
    void shouldAddNewQuestionCaseOrderIs1(){
        //GIVEN
        Question question = new Question(null, "a", 1, "a");
        Question expected = new Question("a", "a", 1, "a");

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.save(question)).thenReturn(expected);
        QuestionService questionService = new QuestionService(questionRepository);

        //WHEN
        Question actual = questionService.addNewQuestion(question);

        //THEN
        Assertions.assertThat(actual).isEqualTo(expected);
    }

    @Test
    void shouldNotAddNewQuestionCaseWithoutPreviousQuestion(){
        //GIVEN
        Question question = new Question(null, "f", 6, "f");

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        QuestionService questionService = new QuestionService(questionRepository);

        //WHEN
        Assertions.assertThatExceptionOfType(NoSuchElementException.class)
                .isThrownBy(() -> questionService.addNewQuestion(question));
    }
}
