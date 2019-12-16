package com.cbe.domain;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

// @Data
@ToString
public class ChessPieces implements Serializable {

    private String name;
    private List<BoardPosition> boards;

    public ChessPieces() {}

    public ChessPieces(final String name, final List<BoardPosition> boards) {
        this.name = name;
        this.boards = boards;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BoardPosition> getBoards() {
        return boards;
    }

    public void setBoards(List<BoardPosition> boards) {
        this.boards = boards;
    }
}
