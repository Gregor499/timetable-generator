package com.example.demo.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
@RequiredArgsConstructor
public class TimeUnitService {
    private final TimeUnitRepository timeUnitRepository;

    LinkedList<TimeUnit> timeUnitList;

    public LinkedList<TimeUnit> createTimeUnitList(TimeUnit timeUnit, int length, String end) {
        timeUnitList.add(timeUnit);
        int timeInMinutes = timeUnit.getTime().charAt(0) + (timeUnit.getTime().charAt(1) * 10) + ((timeUnit.getTime().charAt(3) + timeUnit.getTime().charAt(4) * 10) / 60);
        int endInMinutes = timeUnit.getTime().charAt(0) + (timeUnit.getTime().charAt(1) * 10) + ((timeUnit.getTime().charAt(3) + timeUnit.getTime().charAt(4) * 10) / 60);

        for (int i = endInMinutes; i > 0; i--) {
            int nextTimeInMinutes = timeInMinutes + length;

            int hours = 0;
            int minutes;
            for (int j = nextTimeInMinutes; j >= 60; j = j / 60) {
                hours++;
            }
            minutes = nextTimeInMinutes - (60 * hours);

            timeUnit.setTime(hours + ":" + minutes);
            timeUnitList.add(timeUnit);
        }
        return timeUnitList;
    }
}
