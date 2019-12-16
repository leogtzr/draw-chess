package com.cbe.domain;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class BoardPosition implements Serializable {
    private String fen;
    private String notes;
}
