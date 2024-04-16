import { useAuth } from "@/providers/auth-provider";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { HeaderProfileDrop } from "./header-prof-drop";
import SideNav from "./side-nav";

const Header = () => {
  const { user } = useAuth();
  const scrolled = useScroll(5);

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-border print:hidden`,
        {
          "border-b border-border bg-background/75 backdrop-blur-lg": scrolled,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-2">
        <div className="flex items-center">
          <SideNav />
          <img
            src="/assets/globals/TTSLogo.png"
            alt="TTS"
            className="w-20 h-14"
          />
        </div>
        <div className="block ltr:pr-8 rtl:pl-8 xl:ltr:pr-0 xl:rtl:pl-0">
          {user ? (
            <div className="flex items-center flex-row-reverse">
              <HeaderProfileDrop />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
