package com.cbe.domain;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Data
@ToString
public class ChessPieces implements Serializable {

    private String name;
    private List<BoardPosition> boards;

    public ChessPieces() {}

    public ChessPieces(final String name, final List<BoardPosition> boards) {
        this.name = name;
        this.boards = boards;
    }

}
