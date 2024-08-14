import React from 'react'

function ChartBtns() {
  return (
      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          24 Hours
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          30 Days
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          3 Months
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          1 Year
        </button>
      </div>
  );
}

export default ChartBtns;