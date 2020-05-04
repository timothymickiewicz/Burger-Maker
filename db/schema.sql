CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burger varchar(255) NOT NULL,
  isEaten boolean NOT NULL default '0',
  PRIMARY KEY (id)
);
