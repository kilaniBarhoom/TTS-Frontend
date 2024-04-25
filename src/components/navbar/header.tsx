import { useAuth } from "@/providers/auth-provider";
import { HeaderProfileDrop } from "./header-prof-drop";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="flex gap-3 ltr:pr-8 rtl:pl-8 xl:ltr:pr-0 xl:rtl:pl-0 ">
      <Button variant="ghost" size="icon" className="ltr:ml-auto rtl:mr-auto">
        <Bell size={20} />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      {user ? (
        <div className="flex items-center flex-row-reverse">
          <HeaderProfileDrop />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
