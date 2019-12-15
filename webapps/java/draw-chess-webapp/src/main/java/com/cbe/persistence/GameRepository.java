package com.cbe.persistence;

import com.cbe.domain.Game;
import com.cbe.domain.GameId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends CrudRepository<Game, GameId> {
}
