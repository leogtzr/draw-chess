package com.cbe.persistence;

import com.cbe.domain.Game;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {
    @Query(value = "select distinct(name) from game", nativeQuery = true)
    List<String> names();

    List<Game> findByName(String name);
}
