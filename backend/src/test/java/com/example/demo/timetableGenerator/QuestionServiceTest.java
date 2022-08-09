package com.example.demo.timetableGenerator;

import com.example.demo.questionDB.Question;
import com.example.demo.questionDB.QuestionRepository;
import com.example.demo.questionDB.QuestionService;
import org.junit.jupiter.api.Test;
import org.assertj.core.api.Assertions;


import java.util.Optional;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class QuestionServiceTest {

    @Test
    void shouldAddNewQuestionCaseOrderIs1(){
        //GIVEN
        Question question = new Question("b", "b", 2, "b");
        Question prevQuestion = new Question("a", "a", 1, "a");

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.findQuestionByOrder(question.getOrder()-1)).thenReturn(Optional.of(prevQuestion));

        QuestionService questionService = new QuestionService(questionRepository);

        //WHEN
        Question actual = questionService.addNewQuestion(question);
        Question expected = new Question("b", "b", 2, "b", "a");

        //THEN
        Assertions.assertThat(actual).isEqualTo(expected);
    }

    @Test
    void shouldAddNewQuestionCaseOrderIsGreaterThan1(){
        //GIVEN
        Question question = new Question("c", "c", 3, "c");
        Question prevQuestion = new Question("d", "d", 2, "d", "c");

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.findQuestionByOrder(question.getOrder()-1)).thenReturn(Optional.of(prevQuestion));

        QuestionService questionService = new QuestionService(questionRepository);

        //WHEN
        Question actual = questionService.addNewQuestion(question);
        Question expected = new Question("c", "c", 3, "c", "d");

        //THEN
        Assertions.assertThat(actual).isEqualTo(expected);
    }

    @Test
    void shouldAddNewQuestionCaseOrderIsLessThan1(){
        //GIVEN
        Question question = new Question("a", "a", 1, "a");

        QuestionRepository questionRepository = mock(QuestionRepository.class);

        QuestionService questionService = new QuestionService(questionRepository);

        //WHEN
        Question actual = questionService.addNewQuestion(question);
        Question expected = new Question("a", "a", 1, "a");

        //THEN
        Assertions.assertThat(actual).isEqualTo(expected);
    }
}
