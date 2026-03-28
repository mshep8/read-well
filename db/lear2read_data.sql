-- -----------------------------------------------------------------------------
-- FRONTEND LESSON SYNC SEED
-- Keep this in sync with frontend/src/lib/lessonData.ts.
-- When adding new frontend lessons, add corresponding DB records here so
-- teammates and AI agents use the same lesson inventory.
-- -----------------------------------------------------------------------------

-- 1) Categories used by the frontend lesson catalog
WITH frontend_categories(name, description) AS (
  VALUES
    ('Letters & Sounds', 'Learn the alphabet, phonics, and how letters make words'),
    ('Words You''ll Use', 'Practice common words you see every day'),
    ('Sentences & Stories', 'Read short passages about everyday topics'),
    ('Real-World Reading', 'Practice with documents like forms and labels')
)
INSERT INTO Categories (Name, Description)
SELECT fc.name, fc.description
FROM frontend_categories fc
WHERE NOT EXISTS (
  SELECT 1 FROM Categories c WHERE c.Name = fc.name
);

-- 2) One subcategory per topic inside each frontend category
WITH category_topics(category_name, topic_name, topic_description, lesson_difficulty) AS (
  VALUES
    ('Letters & Sounds', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Letters & Sounds', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Letters & Sounds', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Letters & Sounds', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Letters & Sounds', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5),

    ('Words You''ll Use', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Words You''ll Use', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Words You''ll Use', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Words You''ll Use', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Words You''ll Use', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5),

    ('Sentences & Stories', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Sentences & Stories', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Sentences & Stories', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Sentences & Stories', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Sentences & Stories', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5),

    ('Real-World Reading', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Real-World Reading', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Real-World Reading', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Real-World Reading', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Real-World Reading', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5)
)
INSERT INTO SubCategories (CategoryID, Name, Description)
SELECT c.CategoryID, ct.topic_name, ct.topic_description
FROM category_topics ct
JOIN Categories c ON c.Name = ct.category_name
WHERE NOT EXISTS (
  SELECT 1
  FROM SubCategories sc
  WHERE sc.CategoryID = c.CategoryID
    AND sc.Name = ct.topic_name
);

-- 3) One lesson row per category/topic combo (20 total frontend lessons)
WITH category_topics(category_name, topic_name, topic_description, lesson_difficulty) AS (
  VALUES
    ('Letters & Sounds', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Letters & Sounds', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Letters & Sounds', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Letters & Sounds', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Letters & Sounds', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5),

    ('Words You''ll Use', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Words You''ll Use', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Words You''ll Use', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Words You''ll Use', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Words You''ll Use', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5),

    ('Sentences & Stories', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Sentences & Stories', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Sentences & Stories', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Sentences & Stories', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Sentences & Stories', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5),

    ('Real-World Reading', 'Documents', 'Frontend lesson topic: Documents', 1),
    ('Real-World Reading', 'Shopping', 'Frontend lesson topic: Shopping', 2),
    ('Real-World Reading', 'Everyday terms', 'Frontend lesson topic: Everyday terms', 3),
    ('Real-World Reading', 'Driving', 'Frontend lesson topic: Driving', 4),
    ('Real-World Reading', 'Auto/legal', 'Frontend lesson topic: Auto/legal', 5)
)
INSERT INTO Lessons (SubCategoryID, LessonDifficulty)
SELECT sc.SubCategoryID, ct.lesson_difficulty
FROM category_topics ct
JOIN Categories c ON c.Name = ct.category_name
JOIN SubCategories sc
  ON sc.CategoryID = c.CategoryID
 AND sc.Name = ct.topic_name
WHERE NOT EXISTS (
  SELECT 1 FROM Lessons l WHERE l.SubCategoryID = sc.SubCategoryID
);
