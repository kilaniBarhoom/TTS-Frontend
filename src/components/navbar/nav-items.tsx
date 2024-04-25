import { Home, Settings, Ticket } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export const SideNavItems: SideNavItem[] = [
  {
    title: "Projects",
    path: "/projects",
    icon: <Home className="size-5 mr-1" />,
  },
  {
    title: "Tickets",
    path: "/tickets",
    icon: <Ticket className="size-5 mr-1" />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <Home className="size-5 mr-1" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings className="size-5 mr-1" />,
  },
];
