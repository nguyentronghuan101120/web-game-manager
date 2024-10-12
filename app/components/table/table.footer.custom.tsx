import AppButton from "../app-button";
import { Pagination } from "@nextui-org/react";

export type TableFooterCustomProps = {
  total: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  itemsPerPage: number;
  page: number;
};

const TableFooterCustom = ({
  total,
  onPageChange,
  onPrevious,
  onNext,
  itemsPerPage,
  page,
}: TableFooterCustomProps) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400"></span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={totalPages}
        onChange={(page) => {
          onPageChange(page);
        }}
        className="z-[0]"
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <AppButton
          variant="flat"
          className="w-20"
          disabled={page === 1}
          onClick={() => {
            if (page > 1) {
              onPrevious();
            }
          }}
        >
          Previous
        </AppButton>
        <AppButton
          variant="flat"
          className="w-20"
          disabled={page === totalPages}
          onClick={() => {
            if (page < totalPages) {
              onNext();
            }
          }}
        >
          Next
        </AppButton>
      </div>
    </div>
  );
};

export default TableFooterCustom;
