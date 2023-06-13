package application.timetable;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimeUnitRepository extends MongoRepository<TimeUnit, String> {
    Optional<TimeUnit> findTimeUnitById(String id);
}