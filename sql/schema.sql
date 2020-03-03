-- CREATE TABLE `fun_game`.`sentences` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `noun` varchar(100) NOT NULL,
--   `objects` varchar(100) NULL,
--   PRIMARY KEY (`id`));

-- INSERT INTO `fun_game`.`sentences` (`noun`, `objects`) VALUES ('man; woman; child; angry man;', 'shoes; thumbs; drink; eyebrows;');

DROP DATABASE IF EXISTS fun_game;
CREATE DATABASE fun_game;
USE fun_game;

CREATE TABLE sentences (
    id INT AUTO_INCREMENT, 
    sentence VARCHAR(100),
    requires_noun INT,
    requires_object INT,
    PRIMARY KEY(id)
);

CREATE TABLE objects (
    id INT AUTO_INCREMENT, 
    sentence_object VARCHAR(15),
    PRIMARY KEY(id)
);

CREATE TABLE nouns (
    id INT AUTO_INCREMENT, 
    sentence_noun VARCHAR(15),
    PRIMARY KEY(id)
);

CREATE TABLE scavenger (
    id INT AUTO_INCREMENT, 
    scavenger_sentence VARCHAR(100),
    PRIMARY KEY(id)
);

INSERT INTO sentences(sentence, requires_noun, requires_object)
VALUES ("Compliment $n on their $o", 1, 1), ("Try and sell your $o to $n", 1, 1),
        ("Ask $n about your $o", 1, 1), ("Offer your $o to $n", 1, 1),
        ("Get $n to sign your $o", 1, 1);

INSERT INTO objects(sentence_object)
VALUES ("eyebrows"), ("mixtape"), ("shoes"), ("thumbs");

INSERT INTO nouns(sentence_noun)
VALUES ("an angry man"), ("a woman"), ("the bartender");

INSERT INTO scavenger(scavenger_sentence)
VALUES ("Someone on a date, but they're texting"), ("Someone whos very confused"), ("Someone spilled a drink"), ("A man hitting on an un-interested woman"), 
        ("Someone vaping inside"), ("Someone doing something thats illegal"), ("Something upside-down");