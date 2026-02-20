# Blog Articles in MySQL

Blog articles are stored in the `blog_articles` table and served by the backend. The frontend fetches from the API and falls back to static data if the API is unavailable or the table is empty.

## First-time setup (seed from existing frontend data)

1. **Export** articles from `Frontend/src/BlogArticle.jsx` into a JSON seed file:
   ```bash
   node Backend/scripts/export-articles-from-frontend.js
   ```
   This creates `Backend/seed/articles.json`.

2. **Seed** the database (requires `.env` with `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`):
   ```bash
   node Backend/scripts/seed-articles.js
   ```

## API

- **GET /api/articles** — List all articles (optional query: `?category=transformation`).
- **GET /api/articles/:slug** — Full article by slug.
- **POST /api/articles** — Create or update an article (body: same shape as frontend article object; `slug`, `title`, `sections` required).

## Adding new articles without redeploying

1. **Option A: POST from script or admin**
   - Send `POST /api/articles` with the full article JSON (slug, title, headerImage, meta, intro, sections, etc.).

2. **Option B: Insert via MySQL**
   - Insert a row into `blog_articles` with `sections_json`, `meta_json`, etc. as JSON strings.
   - **Columns:** `slug`, `title`, `header_image`, `meta_json`, `intro`, `intro_continuation`, `intro_closing`, `sections_json`, `tool_sections_json`, `similar_stories_json`, `author_json`, `ad_section_json`. Only `slug`, `title`, and `sections_json` are required; the rest can be `NULL` or empty.
   - **JSON columns:** Pass valid JSON as a string. In MySQL, use single quotes for the string and escape any single quotes inside the JSON by doubling them (`'` → `''`).
   - **Minimal example** (run in MySQL client or Workbench):
   ```sql
   INSERT INTO blog_articles (
     slug,
     title,
     header_image,
     meta_json,
     intro,
     sections_json
   ) VALUES (
     'my-first-article',
     'My First Article',
     '/blog/Transformation/top.png',
     '{"category":"Transformation","readTime":"5 min read","date":"February 2026"}',
     'Short intro text for the article.',
     '[{"number":1,"title":"Section One","content":"Section one body. Use '' for a single quote inside text."},{"number":2,"title":"Section Two","content":"Section two body."}]'
   );
   ```
   - **Optional columns** (use `NULL` if not needed): `intro_continuation`, `intro_closing`, `tool_sections_json`, `similar_stories_json`, `author_json`, `ad_section_json`.
   - **Inline image in sections:** In `sections_json`, add an object with `"imageOnly":true` and `"image":"/blog/Transformation/1.png"` in the array where the image should appear.

3. **Option C: Re-export and re-seed**
   - Add the new article to `Frontend/src/BlogArticle.jsx` (or to `Backend/seed/articles.json`), run the export script if needed, then run the seed script again. After that you can remove the article from the frontend file and rely on the DB.

Once the backend has articles, the site will show them from the database. You no longer need to redeploy the frontend just to publish a new article—add it via the API or DB and it will appear.
