-- NOTE FOR TEAMMATES / AI:
-- This file defines schema only. Lesson content seeds live in
-- db/lear2read_data.sql and must be updated whenever frontend lessonData.ts
-- adds or changes lessons.

-- 1. QuestionTypes Table
CREATE TABLE QuestionTypes (
    QuestionTypeID SERIAL PRIMARY KEY, -- [cite: 1, 2]
    Name VARCHAR(255),                 -- [cite: 53, 54]
    Description VARCHAR(255)           -- [cite: 55, 56]
);

-- 2. User ID Table
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,         -- [cite: 3, 6]
    Name VARCHAR(255) UNIQUE,          -- [cite: 6]
    Email VARCHAR(255),                -- [cite: 7, 8]
    Password VARCHAR(255)              -- [cite: 6]
);

-- 3. Categories Table
CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,      -- [cite: 9, 10, 11]
    Name VARCHAR(255),                  -- [cite: 12, 13]
    Description VARCHAR(255)            -- [cite: 14, 15]
);

-- 4. SubCategories Table
CREATE TABLE SubCategories (
    SubCategoryID SERIAL PRIMARY KEY,   -- [cite: 23, 26]
    CategoryID INT NOT NULL,            -- [cite: 28, 29]
    Name VARCHAR(255),                  -- [cite: 30, 31]
    Description VARCHAR(255),           -- [cite: 32, 33]
    CONSTRAINT fk_category FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) -- [cite: 27]
);

-- 5. Lessons Table
CREATE TABLE Lessons (
    LessonID SERIAL PRIMARY KEY,        -- [cite: 58, 59]
    SubCategoryID INT NOT NULL,         -- [cite: 60, 62]
    LessonDifficulty INT,               -- [cite: 63, 64]
    CONSTRAINT fk_subcategory FOREIGN KEY (SubCategoryID) REFERENCES SubCategories(SubCategoryID) -- [cite: 57]
);

-- 6. Questions Table
CREATE TABLE Questions (
    QuestionID SERIAL PRIMARY KEY,      -- [cite: 34, 36]
    Question VARCHAR(255),              -- [cite: 37, 45]
    Answer VARCHAR(255),                -- [cite: 38, 48]
    AudioURL VARCHAR(255),              -- [cite: 39, 51]
    QuestionTypeID INT,                 -- [cite: 40, 41]
    CONSTRAINT fk_qtype FOREIGN KEY (QuestionTypeID) REFERENCES QuestionTypes(QuestionTypeID)
);

-- 7. LessonProgress Table (Junction table for Users and Lessons)
CREATE TABLE LessonProgress (
    UserID INT,                         -- [cite: 16, 17, 18]
    LessonID INT,                       -- [cite: 19, 20]
    Completion BOOLEAN DEFAULT FALSE,   -- [cite: 21, 22]
    CompletedDate TIMESTAMP,            -- [cite: 21, 24]
    PRIMARY KEY (UserID, LessonID),     -- [cite: 17, 19]
    CONSTRAINT fk_user FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT fk_lesson FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID)
);

-- 8. LessonQuestions Table (Junction table for Lessons and Questions)
CREATE TABLE LessonQuestions (
    LessonID INT,                       -- [cite: 35, 43, 44]
    QuestionID INT,                     -- [cite: 46, 47]
    QuestionOrder INT,                  -- [cite: 49, 50]
    PRIMARY KEY (LessonID, QuestionID), -- [cite: 43, 46]
    CONSTRAINT fk_lesson_q FOREIGN KEY (LessonID) REFERENCES Lessons(LessonID),
    CONSTRAINT fk_question FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
);
