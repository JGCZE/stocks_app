import { DEFAULT_COLUMN_LABELS } from "@/lib/constants";
import clsx from "clsx";
import React from "react";

interface IProps {
  data: Array<string>;
}

const TableDescription = ({ data }: IProps) => {
  return (
    <div className="grid grid-cols-9 mt-8 mb-1 font-bold pl-2">
      {data.map((desc, index) => (
        <div
          key={index}
          className={clsx(desc === "longName" ? "col-span-2" : "col-span-1")}
        >
          {DEFAULT_COLUMN_LABELS[desc] ?? desc}
        </div>
      ))}
    </div>
  );
};

export default TableDescription;
