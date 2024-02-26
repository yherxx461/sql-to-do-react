CREATE TABLE "todo" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(120) NOT NULL,
  "completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todo" ("task")
VALUES ('Make breakfast'),
	('Group work'),
	('Grocery Shopping'),
	('Do laundry'
);

SELECT * FROM "todo";

DROP TABLE "todo";