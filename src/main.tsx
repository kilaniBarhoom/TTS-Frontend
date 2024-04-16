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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <ErrorProvider>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
          <Toaster />
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
