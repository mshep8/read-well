-- Adding basic types and categories
INSERT INTO QuestionTypes (Name, Description) VALUES ('Multiple Choice', 'Pick one');
INSERT INTO Categories (Name, Description) VALUES ('Stem', 'Science and Math');
INSERT INTO SubCategories (CategoryID, Name, Description) VALUES (1, 'Biology', 'Study of life');

-- Adding 4 users and a lesson
INSERT INTO Users (Name, Email, Password) VALUES ('Jane Doe', 'jane@example.com', 'hashed_pass');
INSERT INTO Users (Name, Email, Password) VALUES ('John Smith', 'john@example.com', 'hashed_pass');
INSERT INTO Users (Name, Email, Password) VALUES ('Maria Garcia', 'maria@example.com', 'hashed_pass');
INSERT INTO Users (Name, Email, Password) VALUES ('David Chen', 'david@example.com', 'hashed_pass');
INSERT INTO Lessons (SubCategoryID, LessonDifficulty) VALUES (1, 2);

-- Adding a question and linking it to the lesson
INSERT INTO Questions (Question, Answer, QuestionTypeID) VALUES ('What is 2+2?', '4', 1);
INSERT INTO LessonQuestions (LessonID, QuestionID, QuestionOrder) VALUES (1, 1, 1);

-- Recording a user's progress
INSERT INTO LessonProgress (UserID, LessonID, Completion, CompletedDate) 
VALUES (1, 1, TRUE, NOW());