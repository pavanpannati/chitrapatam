import json
import os
import sys
import django

# Setup Django environment
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Chitra.settings')  # Replace with your project name
django.setup()

from pata.models import movie_posters, Cast  # assuming you have an Actor model

# Load JSON data
with open("C:\\Users\\Admin\\OneDrive\\Desktop\\db\\telugu_150_movies_full4.json", "r", encoding="utf-8") as f:
    data = json.load(f)
import ast  # ✅ safe way to convert string to dict

# Loop through movie data
for item in data:
    # Create movie entry
    movie = movie_posters.objects.create(
        title=item.get("title"),
        release_date=item.get("release_date"),
        overview=item.get("overview"),
        runtime=item.get("runtime"),
        genres=", ".join(item.get("genres", [])),
        poster_url=item.get("poster_url"),
        director=", ".join(item.get("director", [])),
        writer=", ".join(item.get("writer", [])),
        streaming_on=", ".join(item.get("streaming_on", [])),
    )

    # Handle cast (ManyToMany)
    cast_list = item.get("cast", [])
    cast_objects = []

    for cast_string in cast_list:
        try:
            cast_dict = ast.literal_eval(cast_string)  # safely convert string → dict
            actor_name = cast_dict.get("actor")
            character_name = cast_dict.get("character")

            if actor_name:
                actor_obj, created = Cast.objects.get_or_create(
                    actor_name=actor_name,
                    character=character_name
                )
                cast_objects.append(actor_obj)
        except Exception as e:
            print("Error parsing cast:", cast_string, e)

    # Link cast to movie
    movie.cast.set(cast_objects)
    print([f"{c.actor_name} as {c.character}" for c in cast_objects])
