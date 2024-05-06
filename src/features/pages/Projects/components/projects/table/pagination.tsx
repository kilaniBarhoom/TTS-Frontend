import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";
// import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const TablePagiation = ({ totalPages }: { totalPages: string }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    PageSize: "",
    PageNumber: "",
  });

  // auto set PageSize and PageNumber to the query params
  useEffect(() => {
    setSearchParams(
      (prev) => {
        prev.delete("PageSize");
        prev.delete("PageNumber");
        prev.set("PageSize", "5");
        prev.set("PageNumber", "1");
        return prev;
      },
      { replace: true }
    );
  }, []);

  const PageNumber = searchParams.get("PageNumber") || "1";
  const setPageNumber = (value: string) => {
    setSearchParams(
      (prev) => {
        prev.delete("PageNumber");
        if (value) prev.set("PageNumber", value);
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <Pagination className="w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={"sm"}
            onClick={() => {
              if (parseInt(PageNumber) > 1) {
                setPageNumber((parseInt(PageNumber) - 1).toString());
              }
            }}
            className={`${
              parseInt(PageNumber) === 1
                ? "pointer-events-none cursor-not-allowed"
                : ""
            }`}
          />
        </PaginationItem>
        {parseInt(totalPages) > 4 && parseInt(PageNumber) > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from(
          { length: Math.min(parseInt(totalPages), 4) },
          (_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  size={"sm"}
                  onClick={() => setPageNumber(pageNumber.toString())}
                  isActive={PageNumber === pageNumber.toString()}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }
        )}
        {parseInt(totalPages) > 4 &&
          parseInt(PageNumber) < parseInt(totalPages) - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        <PaginationItem>
          <PaginationNext
            size={"sm"}
            onClick={() => {
              if (parseInt(PageNumber) < parseInt(totalPages)) {
                setPageNumber((parseInt(PageNumber) + 1).toString());
              }
            }}
            className={`${
              parseInt(PageNumber) === parseInt(totalPages)
                ? "pointer-events-none cursor-not-allowed"
                : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagiation;
