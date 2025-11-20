import { Route, Routes } from "react-router";
import NotFound from "@components/NotFound";
import AppLayout from "@components/layout/AppLayout";
import EventType from "@modules/eventType/EventType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConstAppRoute } from "@const/appRoutes.const";
import Home from "@modules/home/Home";
import ErrorModalProvider from "@shared/contexts/ErrorModalProvider";
import { GlobalLoadingProvider } from "@shared/contexts/GlobalLoadingProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorModalProvider>
        <GlobalLoadingProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path={ConstAppRoute.Root} index element={<Home />} />
              <Route path={ConstAppRoute.Reservations} />
              <Route path={ConstAppRoute.Client} />
              <Route path={ConstAppRoute.EventTypes} element={<EventType />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </GlobalLoadingProvider>
      </ErrorModalProvider>
    </QueryClientProvider>
  );
}

export default App;
