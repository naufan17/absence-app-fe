import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

interface PaginationProps {
  data: {
    page: number;
    limit: number;
    total: number;
    totalData: number;
    totalPage: number;
  };
  fetchData: (page: number) => Promise<void>;
}

export function PaginationTable({ data, fetchData }: PaginationProps) {

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <div className="flex items-center justify-between my-4">
      <p className="text-sm text-muted-foreground">
        Showing {(data.page - 1) * data.limit + 1} to {data.page * data.limit} of {data.total} results
      </p>
      <Pagination className="flex items-center justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(data.page - 1)} disabled={data.page === 1}
            >
              <ChevronLeft/>
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-muted-foreground mx-2">
              Page {data.page} of {data.totalPage}
            </span>
          </PaginationItem>
          <PaginationItem>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(data.page + 1)} disabled={data.page === data.totalPage}
            >
              Next
              <ChevronRight/>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}