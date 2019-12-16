package com.cbe.boundaries;

import com.cbe.domain.ChessPieces;
import com.cbe.domain.Game;
import com.cbe.persistence.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Calendar;

@RestController
public class GameResources {

    // private static final Calendar CALENDAR = Calendar.getInstance();

    @Autowired
    private GameRepository gameRepository;

    @PostMapping(value = "/save", consumes = "application/json; charset=utf-8")
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<ChessPieces> ok(final @RequestBody ChessPieces chessPieces) {

        final Date date = new Date(new java.util.Date().getTime());

        chessPieces.getBoards().forEach(board -> {
            final Game game = new Game();
            game.setFen(board.getFen());
            game.setDate(date);
            game.setName(chessPieces.getName());
            game.setNotes(board.getNotes());

            gameRepository.save(game);
        });

        return ResponseEntity.ok(chessPieces);

    }

}
