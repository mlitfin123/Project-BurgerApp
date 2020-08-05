USE burgers_db;

INSERT INTO burgers (burger_name, devoured) VALUES ("hamburger", FALSE);
INSERT INTO burgers (burger_name, devoured) VALUES ("cheeseburger", TRUE);
INSERT INTO burgers (burger_name, devoured) VALUES ("baconburger", FALSE);
INSERT INTO burgers (burger_name, devoured) VALUES ("turkeyburger", TRUE);
INSERT INTO burgers (burger_name, devoured) VALUES ("chickenburger", TRUE);

SELECT * FROM burgers;
