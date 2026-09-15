import React, { useState, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../frontend/lib/query-client';
import { MOCK_RECIPES, MOCK_CATEGORIES } from '../frontend/lib/mock-data';
import { Recipe, Category } from '../frontend/types';

// Layout components
import { Navbar } from '../frontend/components/layout/Navbar';
import { Footer } from '../frontend/components/layout/Footer';
import { DashboardSidebar } from '../frontend/components/layout/DashboardSidebar';
import { RouteSimulatorBar } from '../frontend/components/layout/RouteSimulatorBar';

// App Router Pages
import { HomePage } from '../frontend/app/page';
import { RecipesPage } from '../frontend/app/recipes/page';
import { RecipeDetailPage } from '../frontend/app/recipes/[slug]/page';
import { CategoriesPage } from '../frontend/app/categories/page';
import { CategoryDetailPage } from '../frontend/app/categories/[slug]/page';
import { LoginPage } from '../frontend/app/(auth)/login/page';
import { RegisterPage } from '../frontend/app/(auth)/register/page';
import AuthLayout from '../frontend/app/(auth)/layout';
import { DashboardOverviewPage } from '../frontend/app/dashboard/page';
import { DashboardRecipesPage } from '../frontend/app/dashboard/recipes/page';
import { RecipeFormPage } from '../frontend/app/dashboard/recipes/new/page';
import { EditRecipePage } from '../frontend/app/dashboard/recipes/[id]/edit/page';
import { DashboardCategoriesPage } from '../frontend/app/dashboard/categories/page';
import { ProfilePage } from '../frontend/app/profile/page';
import { SearchPage } from '../frontend/app/search/page';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [savedIds, setSavedIds] = useState<string[]>(['rec-1', 'rec-3']);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState<boolean>(false);

  // Sync with browser URL navigation
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname || '/';
      const search = window.location.search || '';
      setCurrentPath(pathname + search);
    };

    window.addEventListener('popstate', handlePopState);
    if (window.location.pathname && window.location.pathname !== '/') {
      setCurrentPath(window.location.pathname + window.location.search);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', path);
    } catch {
      // Ignore if iframe origin restrictions apply
    }
  };

  const handleToggleBookmark = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveRecipe = (newOrUpdated: Recipe) => {
    setRecipes((prev) => {
      const index = prev.findIndex((r) => r.id === newOrUpdated.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = newOrUpdated;
        return next;
      }
      return [newOrUpdated, ...prev];
    });
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddCategory = (newCat: Category) => {
    setCategories((prev) => [newCat, ...prev]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Route Dispatcher matching Next.js 14 App Router
  const renderCurrentRoute = () => {
    const cleanPath = currentPath.split('?')[0];

    // 1. Home Route: /
    if (cleanPath === '/') {
      return (
        <HomePage
          recipes={recipes}
          categories={categories}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onSelectRecipe={(r) => handleNavigate(`/recipes/${r.slug}`)}
          onToggleBookmark={handleToggleBookmark}
          savedIds={savedIds}
        />
      );
    }

    // 2. Recipes List Route: /recipes
    if (cleanPath === '/recipes') {
      return (
        <RecipesPage
          recipes={recipes}
          categories={categories}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onSelectRecipe={(r) => handleNavigate(`/recipes/${r.slug}`)}
          onToggleBookmark={handleToggleBookmark}
          savedIds={savedIds}
        />
      );
    }

    // 3. Recipe Detail Route: /recipes/[slug]
    if (cleanPath.startsWith('/recipes/')) {
      const slug = cleanPath.replace('/recipes/', '');
      const currentRecipe = recipes.find((r) => r.slug === slug) || recipes[0];
      return (
        <RecipeDetailPage
          recipe={currentRecipe}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={currentRecipe ? savedIds.includes(currentRecipe.id) : false}
        />
      );
    }

    // 4. Categories List Route: /categories
    if (cleanPath === '/categories') {
      return (
        <CategoriesPage
          categories={categories}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
        />
      );
    }

    // 5. Category Detail Route: /categories/[slug]
    if (cleanPath.startsWith('/categories/')) {
      const slug = cleanPath.replace('/categories/', '');
      const currentCat = categories.find((c) => c.slug === slug) || categories[0];
      return (
        <CategoryDetailPage
          category={currentCat}
          recipes={recipes}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onSelectRecipe={(r) => handleNavigate(`/recipes/${r.slug}`)}
          onToggleBookmark={handleToggleBookmark}
          savedIds={savedIds}
        />
      );
    }

    // 6. Auth Login: /auth/login
    if (cleanPath === '/auth/login') {
      return (
        <AuthLayout>
          <LoginPage
            onNavigate={handleNavigate}
            onSuccessLogin={() => handleNavigate('/dashboard')}
          />
        </AuthLayout>
      );
    }

    // 7. Auth Register: /auth/register
    if (cleanPath === '/auth/register') {
      return (
        <AuthLayout>
          <RegisterPage
            onNavigate={handleNavigate}
            onSuccessRegister={() => handleNavigate('/dashboard')}
          />
        </AuthLayout>
      );
    }

    // 8. Dashboard Overview: /dashboard
    if (cleanPath === '/dashboard') {
      return (
        <DashboardOverviewPage
          recipes={recipes}
          categories={categories}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
        />
      );
    }

    // 9. Dashboard Recipe List: /dashboard/recipes
    if (cleanPath === '/dashboard/recipes') {
      return (
        <DashboardRecipesPage
          recipes={recipes}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onDeleteRecipe={handleDeleteRecipe}
        />
      );
    }

    // 10. Dashboard New Recipe Form: /dashboard/recipes/new
    if (cleanPath === '/dashboard/recipes/new') {
      return (
        <RecipeFormPage
          categories={categories}
          onNavigate={handleNavigate}
          onSaveRecipe={handleSaveRecipe}
        />
      );
    }

    // 11. Dashboard Edit Recipe Form: /dashboard/recipes/[id]/edit
    if (cleanPath.startsWith('/dashboard/recipes/') && cleanPath.endsWith('/edit')) {
      const parts = cleanPath.split('/');
      const recipeId = parts[3]; // /dashboard/recipes/:id/edit
      return (
        <EditRecipePage
          recipeId={recipeId}
          recipes={recipes}
          categories={categories}
          onNavigate={handleNavigate}
          onSaveRecipe={handleSaveRecipe}
        />
      );
    }

    // 12. Dashboard Categories: /dashboard/categories
    if (cleanPath === '/dashboard/categories') {
      return (
        <DashboardCategoriesPage
          categories={categories}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      );
    }

    // 13. Profile Page: /profile
    if (cleanPath === '/profile') {
      return (
        <ProfilePage
          recipes={recipes}
          savedRecipeIds={savedIds}
          onNavigate={handleNavigate}
          onSelectRecipe={(r) => handleNavigate(`/recipes/${r.slug}`)}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    }

    // 14. Search Page: /search
    if (cleanPath.startsWith('/search')) {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q') || '';
      return (
        <SearchPage
          recipes={recipes}
          initialQuery={q}
          isLoading={isLoadingSkeleton}
          onNavigate={handleNavigate}
          onSelectRecipe={(r) => handleNavigate(`/recipes/${r.slug}`)}
          onToggleBookmark={handleToggleBookmark}
          savedIds={savedIds}
        />
      );
    }

    // Fallback: Home
    return (
      <HomePage
        recipes={recipes}
        categories={categories}
        isLoading={isLoadingSkeleton}
        onNavigate={handleNavigate}
        onSelectRecipe={(r) => handleNavigate(`/recipes/${r.slug}`)}
        onToggleBookmark={handleToggleBookmark}
        savedIds={savedIds}
      />
    );
  };

  const isDashboard = currentPath.startsWith('/dashboard');
  const isAuthPage = currentPath === '/auth/login' || currentPath === '/auth/register';

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#F5F0E6] text-[#1C2421] flex flex-col font-sans selection:bg-[#C6A15B]/25 selection:text-[#022C24]">
        {/* Next.js App Router Simulator Bar at the top */}
        <RouteSimulatorBar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          isLoadingSkeleton={isLoadingSkeleton}
          onToggleSkeleton={() => setIsLoadingSkeleton(!isLoadingSkeleton)}
        />

        {/* Layout Render */}
        {isAuthPage ? (
          /* Dedicated Auth Layout: Completely standalone, NO Navbar, NO Sidebar, NO Footer */
          <main className="flex-1 w-full min-h-screen">
            {renderCurrentRoute()}
          </main>
        ) : isDashboard ? (
          <div className="flex-1 flex flex-col md:flex-row">
            <DashboardSidebar currentPath={currentPath} onNavigate={handleNavigate} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {renderCurrentRoute()}
            </main>
          </div>
        ) : (
          <>
            <Navbar
              currentPath={currentPath}
              onNavigate={handleNavigate}
              savedCount={savedIds.length}
            />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
              {renderCurrentRoute()}
            </main>
            <Footer onNavigate={handleNavigate} />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
