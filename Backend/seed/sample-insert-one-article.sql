-- Run this in MySQL to insert one sample article.
-- Use your actual database: USE your_database_name;

INSERT INTO blog_articles (
  slug,
  title,
  header_image,
  meta_json,
  intro,
  intro_continuation,
  intro_closing,
  sections_json
) VALUES (
  'my-first-article',
  'My First Article',
  '/blog/Transformation/top.png',
  '{"category":"Transformation","readTime":"5 min read","date":"February 2026"}',
  'Short intro text for the article.',
  'Optional second intro paragraph.',
  'Optional closing intro paragraph.',
  '[
    {"number":1,"title":"Section One","content":"Section one body. Use single quotes in MySQL by doubling them: it''s working."},
    {"imageOnly":true,"image":"/blog/Transformation/1.png"},
    {"number":2,"title":"Section Two","content":"Section two body after the image."}
  ]'
);
