package com.example.demo.timetable;

import com.example.demo.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static java.lang.Character.getNumericValue;

@Service
@RequiredArgsConstructor

public class TimeUnitService {
    private final TimeUnitRepository timeUnitRepository;
    public List<TimeUnit> createTimeUnitList(TimeUnit timeUnit) {
        timeUnitRepository.deleteAll();
        timeUnit.setId(timeUnit.getTime());
        timeUnitRepository.save(timeUnit);

        String timeUnitTime = timeUnitRepository.findTimeUnitsById(timeUnit.getId()).orElseThrow().getTime();
        String timeUnitEnd = timeUnitRepository.findTimeUnitsById(timeUnit.getId()).orElseThrow().getEnd();

        //converting "xx:xx" time to minutes
        int timeInMinutes = (getNumericValue(timeUnitTime.charAt(0)) * 600 + (getNumericValue(timeUnitTime.charAt(1)) * 60 + getNumericValue(timeUnitTime.charAt(3)) * 10 + getNumericValue(timeUnitTime.charAt(4))));
        int endInMinutes = (getNumericValue(timeUnitEnd.charAt(0)) * 600 + (getNumericValue(timeUnitEnd.charAt(1)) * 60 + getNumericValue(timeUnitEnd.charAt(3)) * 10 + getNumericValue(timeUnitEnd.charAt(4))));
        int nextTimeInMinutes = timeInMinutes;

        //adding the desired length
        for (int i = endInMinutes; i > timeInMinutes; i = i - timeUnit.getLength()) {
            nextTimeInMinutes = nextTimeInMinutes + timeUnit.getLength();

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
            timeUnit.setTime(hoursString + ":" + minutesString);

            //setting the timeUnit id to time
            timeUnit.setId(timeUnit.getTime());
            timeUnitRepository.save(timeUnit);
        }
        return findAll();
    }

    public List<TimeUnit> findAll(){
        return timeUnitRepository.findAll();
    }
}
