CREATE TABLE "to-do" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(120) NOT NULL,
  "completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "to-do" ("task")
VALUES ('Make breakfast'),
	('Group work'),
	('Grocery Shopping'),
	('Do laundry'
);

SELECT * FROM "to-do";

DROP TABLE "to-do";