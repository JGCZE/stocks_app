import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import React, { useState } from 'react'

const yearsToSelect = ["1y", "2y", "3y", "4y", "5y", "10y", "All"]

interface IProps {
  handleSelectedTimeRange: (args: string) => void;
}

const SelectTimeRange = ({ handleSelectedTimeRange }: IProps) => {
  const [selectedYear, setSelectedYear] = useState<string>("5y")

  return (
    <div>
      SelectTimeRange
      <div className="border border-gray-300 rounded-md p-2">
        {yearsToSelect.map((year) => (
          <Button
            key={year}
            value={year}
            className={clsx(selectedYear === year ? "bg-green-500" : "mr-1")}
            onClick={() =>{
              handleSelectedTimeRange(year)
              setSelectedYear(year)}}
            >
            {year}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SelectTimeRange
