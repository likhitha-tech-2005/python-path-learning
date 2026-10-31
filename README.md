# Python Path

Python Path is a responsive, dependency-free learning site with 100 Python 3 questions. Each lesson includes a challenge, sample input and result, a solution, and a step-by-step explanation.

## Run locally

From this folder, start Python's built-in web server:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Publish with GitHub Pages

The included GitHub Actions workflow deploys the site automatically whenever changes are pushed to `main`. Enable GitHub Pages for the repository with **Build and deployment → GitHub Actions**. After the first successful workflow, GitHub Pages serves the course at `https://<owner>.github.io/<repository>/`.

## Course features

- Search questions and filter the course index by topic.
- Save questions and track lesson completion.
- Keep saved lessons and progress in this browser using local storage.
- Copy solution code to use in a local Python interpreter.
- Use the responsive course layout on desktop and mobile.

The site has no server-side account or database. Course examples target Python 3.10 or later; the GUI, process-pool, and network examples may need the appropriate local environment or access to a service.
