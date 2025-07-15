
# Chitrapatam 🎬

Chitrapatam is a full-stack movie discovery and recommendation platform designed to showcase and explore Telugu movies with rich metadata and a user-friendly interface. The project combines the power of Django and FastAPI on the backend with a dynamic, responsive frontend built using React and Tailwind CSS.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Custom Django user model
  - OTP-based verification for secure registration and login

- 🎞️ **Movie Listings**
  - Display of Telugu movies with posters, titles, genres, and descriptions
  - Metadata includes cast, crew, release date, language, and links to trailers or IMDb pages

- 🔎 **Search & Filter**
  - Search movies by title or genre
  - Filter by categories and release years

- 📄 **Movie Detail Page**
  - Each movie links to a detail page with complete information
  - Additional links to trailers, IMDb, or watch options

- 🧠 **Data Handling**
  - Backend script to load bulk movie data into the database
  - Optimized models and relationships for cast and genre tagging

- 🖥️ **Responsive UI**
  - Built using React + Tailwind CSS
  - Clean and mobile-friendly design

---

## 🛠️ Tech Stack

### Frontend
- ReactJS
- ViteJS
- Tailwind CSS

### Backend
- Django
- Django REST Framework
- FastAPI (for additional endpoints)

### Database
- SQLite (development)

### Tools
- PostCSS
- ESLint
- Git & GitHub

---

## 📁 Project Structure

```
chitrapatam/
├── backend/              # Django project + app (Chitra + pata)
│   ├── manage.py
│   ├── load_movies.py    # Python script to load movie metadata
│   └── pata/             # Main Django app with models, views, and auth
├── fastapi_app/          # FastAPI routes for specific movie APIs
├── frontend/             # React + Vite + Tailwind-based UI
│   ├── src/Components    # UI components (Search, Header, MovieList)
│   ├── src/Pages         # Pages like Home and MovieDetail
│   └── public/           # Static assets
└── run.py                # Main script to run everything together
```

---

## 🧪 Setup & Run Locally

### Backend (Django)
```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### FastAPI
```bash
cd fastapi_app
uvicorn main:app --reload
```

---

## 📌 Contribution Guide

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 🙌 Acknowledgments

Special thanks to open APIs, The Movie Database (TMDb), and open-source contributors who inspired this project.

---

## 🧑‍💻 Author

**Pavan Pannati**  
Feel free to connect on [GitHub](https://github.com/pavanpannati)

---

## 📃 License

This project is licensed under the MIT License.
