import { Home, LineChart, Settings, Ticket } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export const SideNavItems: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home className="size-5 mr-1" />,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <LineChart className="size-5 mr-1" />,
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: <Ticket className="size-5 mr-1 -rotate-45" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings className="size-5 mr-1 -rotate-45" />,
  },
];
