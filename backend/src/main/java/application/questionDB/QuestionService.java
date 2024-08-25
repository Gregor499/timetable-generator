package application.questionDB;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question addNewQuestion(Question question) {
        if (question.order > 1) {
            setPreviousQuestionId(question);
        }
        return questionRepository.save(question);
    }

    public List<Question> findAll() {
        return questionRepository.findAll();
    }


    private void setPreviousQuestionId(Question question) {
        questionRepository.findQuestionByOrder(question.getOrder() - 1)
                .ifPresent(previousQuestion -> question.setPreviousQuestionId(previousQuestion.getId()));
    }
}
