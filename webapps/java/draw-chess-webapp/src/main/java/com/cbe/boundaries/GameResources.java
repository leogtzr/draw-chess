package com.cbe.boundaries;

import com.cbe.domain.ChessPieces;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class GameResources {

    @PostMapping(value = "/save", consumes = "application/json; charset=utf-8")
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<ChessPieces> ok(@RequestBody ChessPieces chessPieces) {
        System.out.println("This ... ");
        System.out.println(chessPieces);
        return ResponseEntity.ok(chessPieces);
    }

}
