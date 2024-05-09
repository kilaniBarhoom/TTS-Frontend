import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbComponent = ({
  tree,
  currentPage,
}: {
  tree: string[];
  currentPage: string;
}) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {tree.map((item, index) => (
          <div className="flex items-center" key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{item}</BreadcrumbLink>
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
