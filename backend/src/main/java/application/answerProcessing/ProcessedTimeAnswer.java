package application.answerProcessing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

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

    private String userId;
    private List<String> timeList;

    public void setWorkdays(Map<String, Boolean> weekdays){
        setMonday(weekdays.get("monday"));
        setTuesday(weekdays.get("tuesday"));
        setWednesday(weekdays.get("wednesday"));
        setThursday(weekdays.get("thursday"));
        setFriday(weekdays.get("friday"));
        setSaturday(weekdays.get("saturday"));
        setSunday(weekdays.get("sunday"));
    }
}
