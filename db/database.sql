CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee(
id INT(11) NOT NULL AUTO_INCREMENT,
name VARCHAR(45) DEFAULT NULL,
surname VARCHAR(45) DEFAULT NULL,
position VARCHAR(45) DEFAULT NULL,
salary INT(5) DEFAULT NULL,
PRIMARY KEY (id)
);

INSERT INTO employee VALUES
(1, 'Joe', 'Fernandez','Scrum Master', 3500),
(2, 'Elva', 'Nanyhn','Product Owner', 2500),
(3, 'Marcelo', 'Mikisch','Tech Lead', 3500),
(4, 'Fernando', 'jara','Developer', 4500);