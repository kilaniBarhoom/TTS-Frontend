import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Slash } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TreeT = {
  title?: string;
  link?: string;
};

const BreadcrumbComponent = ({
  tree,
  currentPage,
  className,
}: {
  tree: TreeT[];
  currentPage?: string;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={cn("mb-4", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {tree?.map((item, index) => (
            <div className="flex items-center" key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => navigate(item.link || '')} // Add a conditional operator to provide a default value if item.link is undefined
                >
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="ml-2">
                <Slash className="-rotate-12" size={16} />
              </BreadcrumbSeparator>
            </div>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbComponent;
