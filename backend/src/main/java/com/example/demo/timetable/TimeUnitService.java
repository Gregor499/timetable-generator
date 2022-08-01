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

        int b = 1;

        //adding the desired length
        for (int i = endInMinutes; i > timeInMinutes; i = i - timeUnit.getLength()) {
            nextTimeInMinutes = nextTimeInMinutes + timeUnit.getLength();
            TimeUnit timeUnit1 = new TimeUnit();
            timeUnit1.setTimeInMinutes(nextTimeInMinutes);

            //converting back to "xx:xx" time
            int hours = 0;
            int minutes;
            for (int j = nextTimeInMinutes; j >= 60; j = j - 60) {
                hours++;
            }
            minutes = nextTimeInMinutes - (60 * hours);

            String hoursString;

            if (hours / 10 < 1) {
                hoursString = "0" + hours;
            } else {
                hoursString = hours + "";
            }

            String minutesString;

            if (minutes / 10 < 1) {
                minutesString = "0" + minutes;
            } else {
                minutesString = minutes + "";
            }
            timeUnit1.setTime(hoursString + ":" + minutesString);

            //setting the timeUnit id to time
            timeUnit1.setId(timeUnit1.getTime());
            timeUnitMap.put(b, timeUnit1);
            b++;
        }
        return timeUnitMap.values().stream().toList();
    }

    public void saveTimeUnitListInDb(List<TimeUnit> timeUnitList) {
        timeUnitRepository.deleteAll();
        timeUnitRepository.saveAll(timeUnitList);
    }

    public List<TimeUnit> findAll() {
        return timeUnitRepository.findAll();
    }
}
