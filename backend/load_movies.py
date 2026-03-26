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
def load_file(i):
    # Load JSON data
    with open(f"D:\desktop 1\\db\\telugu_150_movies_full{i}.json" , "r", encoding="utf-8") as f:
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
                for cast in cast_list:
                    actor_name = cast['actor']
                    #character_name = cast_dict.get("character")

                    if actor_name:
                        actor_obj, created = Cast.objects.get_or_create(
                            actor_name=actor_name
                        )
                        cast_objects.append(actor_obj)
                    #print(actor_name)
            except Exception as e:
                print("Error parsing cast:", cast_string, e)

        # Link cast to movie
        movie.cast.set(cast_objects)
        #print([f"{c.actor_name} as {c.character}" for c in cast_objects])

for i in range(1,5):
    load_file(i)