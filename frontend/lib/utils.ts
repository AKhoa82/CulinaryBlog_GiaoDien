export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  return remainingMins > 0 ? `${hours}h ${remainingMins}p` : `${hours} giờ`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function generateRecipeJsonLd(recipe: any, baseUrl: string = 'https://culinaryblog.dlu.vn') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: [recipe.coverImage],
    author: {
      '@type': 'Person',
      name: recipe.author.name,
    },
    datePublished: recipe.createdAt,
    description: recipe.description,
    prepTime: `PT${recipe.prepTimeMinutes}M`,
    cookTime: `PT${recipe.cookTimeMinutes}M`,
    totalTime: `PT${recipe.prepTimeMinutes + recipe.cookTimeMinutes}M`,
    recipeYield: `${recipe.servings} phần`,
    recipeCategory: recipe.categoryName,
    recipeCuisine: 'Vietnamese',
    keywords: recipe.tags.join(', '),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein}g`,
      carbohydrateContent: `${recipe.nutrition.carbohydrates}g`,
      fatContent: `${recipe.nutrition.fat}g`,
    },
    recipeIngredient: recipe.ingredients.map(
      (ing: any) => `${ing.amount} ${ing.unit} ${ing.name}${ing.notes ? ` (${ing.notes})` : ''}`
    ),
    recipeInstructions: recipe.instructions.map((ins: any) => ({
      '@type': 'HowToStep',
      name: ins.title,
      text: ins.description,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: recipe.rating,
      reviewCount: recipe.reviewCount,
    },
  };
}
