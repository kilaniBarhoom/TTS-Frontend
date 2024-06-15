import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";
// import CookieConsent from "react-cookie-consent";
import { Outlet, useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../ui/background-beams";
import Footer from "./footer";
import Header from "./header";

const MainLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/projects");
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <div className="min-h-screen flex flex-col transition-all duration-300 ease-in-out">
        <header className="z-50  bg-muted/50">
          <Header />
        </header>
        <BackgroundBeams />
        <main className="flex-1 h-screen w-full flex z-50">
          <Outlet />
        </main>
        <footer className="z-50">
          <Footer />
        </footer>
      </div>
      {/* <CookieConsent
        disableButtonStyles
        buttonText="Accept!!"
        cookieName="myAwesomeCookieName2"
        containerClasses="bg-muted/50 p-4 rounded-md shadow-md border"
        // style={{ background: "muted" }}
        buttonClasses="bg-primary text-white p-2 rounded-md"
        expires={1000}
      >
        <Typography as="h3" element="h3">
          Cookies Alert!
        </Typography>
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent> */}
    </div>
  );
};

export default MainLayout;
