import React, { useState } from 'react';
import Spreadsheet from "react-spreadsheet";

const SpreadSheet = () => {
  const rows = 500;
  const extraColumns = 10; // Adjust the number of extra columns as needed

  const columns = [
    { value: "Product Name" },
    { value: "Cost of Product" },
    { value: "CGST (%)" },
    { value: "SGST (%)" },
    { value: "IGST (%)" },
    { value: "Total Cost" },
    { value: "Tax Amount" },
    ...Array.from({ length: extraColumns }, () => ({ value: "" }))
  ];

  const initialData = [
    columns,
    ...Array.from({ length: rows }, () => Array(columns.length).fill({ value: "" }))
  ];

  const [data, setData] = useState(initialData);

  const handleDataChange = (newData) => {
    const updatedData = newData.map((row, rowIndex) => {
      if (rowIndex === 0) return row; // Skip the header row

      const cost = parseFloat(row[1]?.value) || 0;
      const cgst = parseFloat(row[2]?.value) || 0;
      const sgst = parseFloat(row[3]?.value) || 0;
      const igst = parseFloat(row[4]?.value) || 0;
      const totalTax = (cgst + sgst + igst) / 100 * cost;
      const totalCost = cost + totalTax;
      const taxAmount = totalCost - cost;

      return [
        row[0], // Product Name
        { ...row[1], value: cost ? cost.toFixed(2) : "" },
        { ...row[2], value: cgst ? cgst.toFixed(2) : "" },
        { ...row[3], value: sgst ? sgst.toFixed(2) : "" },
        { ...row[4], value: igst ? igst.toFixed(2) : "" },
        { value: totalCost ? totalCost.toFixed(2) : "" }, // Total Cost
        { value: taxAmount ? taxAmount.toFixed(2) : "" }, // Tax Amount
        ...row.slice(7) // Keep the extra columns unchanged
      ];
    });
    setData(updatedData);
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
      <Spreadsheet data={data} onChange={handleDataChange} />
    </div>
  );
};

export default SpreadSheet;
