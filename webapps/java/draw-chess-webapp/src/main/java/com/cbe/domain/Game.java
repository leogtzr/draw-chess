package com.cbe.domain;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Data
@ToString
@Entity
@IdClass(GameId.class)
public class Game implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Id
    private String name;

    private Date date;

    private String fen;
    private String notes;

}
