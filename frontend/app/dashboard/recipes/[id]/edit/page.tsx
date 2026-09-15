import React from 'react';
import { Recipe, Category } from '../../../../../types';
import { RecipeFormPage } from '../../new/page';

export interface EditRecipePageProps {
  recipeId: string;
  recipes: Recipe[];
  categories: Category[];
  onNavigate: (path: string) => void;
  onSaveRecipe?: (recipe: Recipe) => void;
}

export const EditRecipePage: React.FC<EditRecipePageProps> = ({
  recipeId,
  recipes,
  categories,
  onNavigate,
  onSaveRecipe,
}) => {
  const existingRecipe = recipes.find((r) => r.id === recipeId) || recipes[0];

  return (
    <RecipeFormPage
      categories={categories}
      onNavigate={onNavigate}
      onSaveRecipe={onSaveRecipe}
      initialData={existingRecipe}
      isEditMode={true}
    />
  );
};
