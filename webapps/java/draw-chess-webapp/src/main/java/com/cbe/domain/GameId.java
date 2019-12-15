package com.cbe.domain;

import java.io.Serializable;
import java.util.Objects;

public class GameId implements Serializable {

    private long id;
    private String name;

    public GameId() {
    }

    public GameId(final long id, final String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameId gameId = (GameId) o;
        return id == gameId.id &&
                Objects.equals(name, gameId.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
