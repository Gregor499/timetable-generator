package application.timetable;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor

public class TimeUnitService {
    private final TimeUnitRepository timeUnitRepository;

    public List<TimeUnit> createTimeUnitList(TimeUnit timeUnit) {
        timeUnit.setId(timeUnit.getTime());
        timeUnit.setTimeInMinutes(convertTimeToMinutes(timeUnit.getTime()));

        //save initial entry
        Map<Integer, TimeUnit> timeUnits = new HashMap<>();
        timeUnits.put(0, timeUnit);

        int endInMinutes = convertTimeToMinutes(timeUnit.getEnd());
        int currentTimeInMinutes = timeUnit.getTimeInMinutes();
        int interval = timeUnit.getLength();
        int index = 1;

        //adding all time units after the initial one till the end
        while (currentTimeInMinutes + interval <= endInMinutes) {
            currentTimeInMinutes += interval;
            TimeUnit currentTimeUnit = createTimeUnit(currentTimeInMinutes);
            timeUnits.put(index++, currentTimeUnit);
        }
        return new ArrayList<>(timeUnits.values());
    }

    private TimeUnit createTimeUnit(int timeInMinutes) {
        TimeUnit timeUnit = new TimeUnit();
        timeUnit.setTimeInMinutes(timeInMinutes);
        timeUnit.setTime(convertMinutesToTimeUnit(timeInMinutes));
        timeUnit.setId(timeUnit.getTime());
        return timeUnit;
    }


    public int convertTimeToMinutes(String timeUnit){
        if (timeUnit == null || timeUnit.isEmpty()) {
            return 0;
        }

        String[] parts = timeUnit.split(":");
        int hours = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);
        return hours * 60 + minutes;
    }

    public String convertMinutesToTimeUnit(int minutes){
        int hours = minutes / 60;
        int minutesMinusHours = minutes % 60;
        return String.format("%02d:%02d", hours, minutesMinusHours);
    }

    public void saveTimeUnitListInDb(List<TimeUnit> timeUnitList) {
        timeUnitRepository.deleteAll();
        timeUnitRepository.saveAll(timeUnitList);
    }

    public List<TimeUnit> findAll() {
        return timeUnitRepository.findAll();
    }
}
