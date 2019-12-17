package com.cbe.domain;

import lombok.Data;
import lombok.ToString;

import java.sql.Date;

@Data
@ToString
public class ChessBoard {
    private String name;
    private Date date;
    private String fen;
    private String notes;
}
