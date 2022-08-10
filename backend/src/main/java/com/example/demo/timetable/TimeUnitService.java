package com.example.demo.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Character.getNumericValue;

@Service
@RequiredArgsConstructor

public class TimeUnitService {
    private final TimeUnitRepository timeUnitRepository;

    public List<TimeUnit> createTimeUnitList(TimeUnit timeUnit) {
        timeUnit.setId(timeUnit.getTime());

        String timeUnitTime = timeUnit.getTime();
        String timeUnitEnd = timeUnit.getEnd();

        //converting "xx:xx" time to minutes
        int timeInMinutes = (getNumericValue(timeUnitTime.charAt(0)) * 600 + (getNumericValue(timeUnitTime.charAt(1)) * 60 +
                getNumericValue(timeUnitTime.charAt(3)) * 10 + getNumericValue(timeUnitTime.charAt(4))));

        timeUnit.setTimeInMinutes(timeInMinutes);

        //save initial entry
        Map<Integer, TimeUnit> timeUnitMap = new HashMap<>();
        timeUnitMap.put(0, timeUnit);

        int endInMinutes = (getNumericValue(timeUnitEnd.charAt(0)) * 600 + (getNumericValue(timeUnitEnd.charAt(1)) * 60 +
                getNumericValue(timeUnitEnd.charAt(3)) * 10 + getNumericValue(timeUnitEnd.charAt(4))));

        int nextTimeInMinutes = timeInMinutes;

        int mapKeyCounter = 1;

        //adding the desired length
        for (int i = endInMinutes; i > timeInMinutes; i = i - timeUnit.getLength()) {
            nextTimeInMinutes = nextTimeInMinutes + timeUnit.getLength();
            TimeUnit timeUnit1 = new TimeUnit();
            timeUnit1.setTimeInMinutes(nextTimeInMinutes);

            //converting back to "xx:xx" time
            timeUnit1.setTime(timeInMinutesToTimeConverter(nextTimeInMinutes));

            //setting the timeUnit id to time
            timeUnit1.setId(timeUnit1.getTime());
            timeUnitMap.put(mapKeyCounter, timeUnit1);
            mapKeyCounter++;
        }
        return timeUnitMap.values().stream().toList();
    }

    public String timeInMinutesToTimeConverter(int minutes){
        int hourCounter = 0;
        int minuteCounter;
        for (int j = minutes; j >= 60; j = j - 60) {
            hourCounter++;
        }
        minuteCounter = minutes - (60 * hourCounter);

        String hoursString;

        if (hourCounter / 10 < 1) {
            hoursString = "0" + hourCounter;
        } else {
            hoursString = hourCounter + "";
        }

        String minutesString;

        if (minuteCounter / 10 < 1) {
            minutesString = "0" + minuteCounter;
        } else {
            minutesString = minuteCounter + "";
        }

        return (hoursString + ":" + minutesString);
    }

    public void saveTimeUnitListInDb(List<TimeUnit> timeUnitList) {
        timeUnitRepository.deleteAll();
        timeUnitRepository.saveAll(timeUnitList);
    }

    public List<TimeUnit> findAll() {
        return timeUnitRepository.findAll();
    }
}
