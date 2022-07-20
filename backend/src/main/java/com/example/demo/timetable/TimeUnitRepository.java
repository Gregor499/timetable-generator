package com.example.demo.timetable;

import com.example.demo.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimeUnitRepository extends MongoRepository<TimeUnit, String> {
    Optional<TimeUnit> findTimeUnitsByTime(String time);
}