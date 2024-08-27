package application.questionDB;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuestionConnection {
    //todo: integrate to QuestionDB
    MORNING_SLEEP("morningSleep",
            "When do you want to wake up ?",
            "When do you want to wake up ?",
            -60),

    MORNING_ROUTINE("morningRoutine",
            "When do you want to wake up ?",
            "When are you ready for the day?"),

    WORK_WAY_TIME("workWayTime",
            "When do you want to begin going to work ?",
            "When does your work start ?"),

    WORK("work",
            "When does your work start ?",
            "When does your work end ?"),

    LEISURE_TIME("leisureTime",
            "When does your leisure time start ?",
            "When does your leisure time end ?"),

    EVENING_ROUTINE("eveningRoutine",
            "When do you want to start to get ready for bed ?",
            "When do you want to sleep ?"),

    NIGHT_SLEEP("nightSleep",
            "When do you want to sleep ?",
            "When do you want to sleep ?",
            +60);

    private final String taskName;
    private final String beginQuestion;
    private final String endQuestion;
    private final int timeOffset;

    QuestionConnection(String taskName, String beginQuestion, String endQuestion) {
        this(taskName, beginQuestion, endQuestion, 0);
    }
}