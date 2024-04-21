import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import i18n from "./i18n";
import App from "./App.tsx";
import { AuthProvider } from "./providers/auth-provider.tsx";
import { ErrorProvider } from "./providers/error-provider.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster";
import Loading from "./components/component/Loading.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

i18n.on("languageChanged", (locale) => {
  let lang = locale.substring(0, 2);
  let dir = i18n.dir(locale);

  const allowedLangs = ["en", "ar"];
  if (!allowedLangs.includes(lang)) {
    lang = "en";
    dir = "ltr";
  }

  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 1000 * 15,
      refetchOnReconnect: true,
      refetchIntervalInBackground: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <ErrorProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loading />}>
              <App />
              <Toaster />
            </Suspense>
          </QueryClientProvider>
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
