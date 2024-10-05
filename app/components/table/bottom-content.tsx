import React from "react";
import { Button, Pagination } from "@nextui-org/react";

const BottomContent = () => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400"></span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={1}
        total={10}
        onChange={() => {}}
        className="z-[0]"
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={true} size="sm" variant="flat" onPress={() => {}}>
          Previous
        </Button>
        <Button isDisabled={true} size="sm" variant="flat" onPress={() => {}}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default BottomContent;
