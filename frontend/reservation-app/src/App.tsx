import { Route, Routes } from "react-router";
import NotFound from "@components/NotFound";
import AppLayout from "@components/layout/AppLayout";
import EventType from "@modules/eventType/EventType";
import { ConstAppRoute } from "@const/appRoutes.const";
import ErrorModalProvider from "@shared/contexts/ErrorModalProvider";
import { GlobalLoadingProvider } from "@shared/contexts/GlobalLoadingProvider";
import Client from "@modules/client/Client";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@shared/components/ErrorFallback";

const Reservation = lazy(() => import("@modules/reservations/Reservation"));

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorModalProvider>
        <GlobalLoadingProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path={ConstAppRoute.Root} index element={<EventType />} />
              <Route
                path={ConstAppRoute.Reservations}
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <Reservation />
                  </Suspense>
                }
              />
              <Route path={ConstAppRoute.Client} element={<Client />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </GlobalLoadingProvider>
      </ErrorModalProvider>
    </ErrorBoundary>
  );
}

export default App;
