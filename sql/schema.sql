CREATE TABLE `fun_game`.`sentences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `noun` varchar(100) NOT NULL,
  `objects` varchar(100) NULL,
  PRIMARY KEY (`id`));

INSERT INTO `fun_game`.`sentences` (`noun`, `objects`) VALUES ('man; woman; child; angry man;', 'shoes; thumbs; drink; eyebrows;');
