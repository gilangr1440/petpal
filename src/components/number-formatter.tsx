import React from "react";

export interface NumberFormatterProps {
  value: number | any;
}

const NumberFormatter: React.FC<NumberFormatterProps> = ({ value }) => {
  const formattedNumber = new Intl.NumberFormat().format(value);
  return (
    <span id="formattedNumber" className="font-thin text-slate-500 font-sans">
      Rp. {formattedNumber}
    </span>
  );
};

export default NumberFormatter;
