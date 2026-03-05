import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
// Import Pages
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { RingManagerPage } from '@/pages/RingManagerPage';
import { MatchScoringPage } from '@/pages/MatchScoringPage';
import { RankingPage } from '@/pages/RankingPage';
import { RulesPage } from '@/pages/RulesPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { RingsListPage } from '@/pages/RingsListPage';
import { CircuitPage } from '@/pages/CircuitPage';
import { StudentAreaPage } from '@/pages/StudentAreaPage';
import { ConfigPage } from '@/pages/ConfigPage';
import { UniformsPage } from '@/pages/UniformsPage';
import { NewsPage } from '@/pages/NewsPage';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/circuito",
    element: <CircuitPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/categorias",
    element: <CategoriesPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/top-four",
    element: <RankingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/rings",
    element: <RingsListPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/ring/:ringId",
    element: <RingManagerPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/match/:matchId",
    element: <MatchScoringPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/ranking",
    element: <RankingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/rules",
    element: <RulesPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/area-aluno",
    element: <StudentAreaPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/config",
    element: <ConfigPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/uniformes",
    element: <UniformsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/noticias",
    element: <NewsPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)