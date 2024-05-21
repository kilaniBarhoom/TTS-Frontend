import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

type TreeT = {
  title?: string;
  link?: string;
};

const BreadcrumbComponent = ({
  tree,
  currentPage,
}: {
  tree: TreeT[];
  currentPage?: string;
}) => {
  const navigate = useNavigate();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {tree?.map((item, index) => (
          <div className="flex items-center" key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                {item.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
