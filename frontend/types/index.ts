export type Difficulty = 'Dễ' | 'Trung bình' | 'Khó';

export type RecipeStatus = 'published' | 'draft' | 'archived';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  notes?: string;
}

export interface InstructionStep {
  step: number;
  title: string;
  description: string;
  durationMinutes?: number;
  tip?: string;
  image?: string;
}

export interface NutritionInfo {
  calories: number; // kcal
  protein: number;  // g
  carbohydrates: number; // g
  fat: number;      // g
  fiber?: number;   // g
  sodium?: number;  // mg
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'author' | 'admin' | 'reader';
  bio?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  categorySlug: string;
  categoryName: string;
  author: Author;
  difficulty: Difficulty;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  calories: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  nutrition: NutritionInfo;
  isFeatured: boolean;
  status: RecipeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  recipeCount: number;
  iconName: string;
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  userName: string;
  email: string;
  emailConfirmed?: boolean;
  avatar: string;
  role: 'author' | 'admin' | 'reader';
  bio: string;
  location: string;
  website?: string;
  savedRecipeIds: string[];
  publishedCount: number;
  joinedDate: string;
}
