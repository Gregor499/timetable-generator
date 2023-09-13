package application.answerProcessing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("processedTimeAnswers")
@NoArgsConstructor
@AllArgsConstructor
public class ProcessedTimeAnswer {
    @Id
    private String id;
    private String task;
    private Boolean monday;
    private Boolean tuesday;
    private Boolean wednesday;
    private Boolean thursday;
    private Boolean friday;
    private Boolean saturday;
    private Boolean sunday;

    private String color;
    private String userId;
    private List<String> timeList;
}
