# main.py (FastAPI)

import os
import django
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel
import sys
from django.db.models import Q

# Setup Django environment
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Chitra.settings')
django.setup()

from pata.models import movie_posters  # your movie model
from pata.models import Cast           # your cast model

# FastAPI app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class MovieBrief(BaseModel):
    id: int
    title: str
    poster_url: Optional[str]

    class Config:
        orm_mode = True

class CastSchema(BaseModel):
    id: int
    actor_name: str
    image_url: Optional[str]
    movies: List[MovieBrief]

    class Config:
        orm_mode = True

class MovieSchema(BaseModel):
    id: int
    title: str
    release_date: Optional[str]
    overview: Optional[str]
    runtime: Optional[int]
    genres: Optional[str]
    poster_url: Optional[str]
    director: Optional[str]
    writer: Optional[str]
    streaming_on: Optional[str]
    cast: List[CastSchema]

    class Config:
        orm_mode = True

# 🔍 GET /movies/ - With optional search
@app.get("/movies/", response_model=List[MovieSchema])
def get_movies(search: Optional[str] = Query(None)):
    queryset = movie_posters.objects.all()

    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) |
            Q(director__icontains=search) |
            Q(release_date__icontains=search)
        ).distinct()

    movies_data = []

    for movie in queryset:
        cast_data = []
        for actor in movie.cast.all():
            other_movies = actor.movie_posters.exclude(id=movie.id)
            cast_data.append({
                "id": actor.id,
                "actor_name": actor.actor_name,
                "image_url": actor.image_url,
                "movies": [
                    {
                        "id": m.id,
                        "title": m.title,
                        "poster_url": m.poster_url
                    } for m in other_movies
                ]
            })

        movies_data.append({
            "id": movie.id,
            "title": movie.title,
            "release_date": str(movie.release_date) if movie.release_date else None,
            "overview": movie.overview,
            "runtime": movie.runtime,
            "genres": movie.genres,
            "poster_url": movie.poster_url,
            "director": movie.director,
            "writer": movie.writer,
            "streaming_on": movie.streaming_on,
            "cast": cast_data
        })

    return movies_data

# 🎬 GET /movies/{title}/ - Movie detail with cast and their other movies
@app.get("/movies/{title}/", response_model=MovieSchema)
def get_movie_by_title(title: str):
    try:
        movie = movie_posters.objects.get(title=title)

        cast_data = []
        for actor in movie.cast.all():
            other_movies = actor.movie_posters.exclude(id=movie.id)
            cast_data.append({
                "id": actor.id,
                "actor_name": actor.actor_name,
                "image_url": actor.image_url,
                "movies": [
                    {
                        "id": m.id,
                        "title": m.title,
                        "poster_url": m.poster_url
                    } for m in other_movies
                ]
            })

        return {
            "id": movie.id,
            "title": movie.title,
            "release_date": str(movie.release_date) if movie.release_date else None,
            "overview": movie.overview,
            "runtime": movie.runtime,
            "genres": movie.genres,
            "poster_url": movie.poster_url,
            "director": movie.director,
            "writer": movie.writer,
            "streaming_on": movie.streaming_on,
            "cast": cast_data
        }

    except movie_posters.DoesNotExist:
        raise HTTPException(status_code=404, detail="Movie not found")

@app.get("/movies/", response_model = List[MovieSchema])
def genre(query: Optional[str] = Query(None)):
    queryset = movie_posters.objects.all()
    if query:
        query = query.strip().lower()
        queryset = queryset.filter(
            Q(genres__icontains=query)
        )
    movie_data = []
    for movie in queryset:
        movie_data.append({
            "id": movie.id,
            "title": movie.title,
            "genres": movie.genres
        })
    return movie_data