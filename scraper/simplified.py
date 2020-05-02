import numpy as np
import json as json

# source: https://dominikschmidt.xyz/simplified-recipes-1M/

with np.load('simplified-recipes-1M.npz') as data:
    ings = []
    #recipes = data['recipes']
    ingredients = data['ingredients']
    for i, ingredient in enumerate(ingredients):
        if len(ingredient) < 3:
            continue
        ings.append(ingredient)


with open('ingredients.csv', 'w+') as outfile:
    for ingredient in ings:
        outfile.write(ingredient + '\n')