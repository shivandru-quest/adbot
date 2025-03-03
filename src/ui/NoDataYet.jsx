import React from "react";

const NoDataYet = ({ message = "No Ads Yet", onAction, flag = false }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-300 rounded-xl bg-gray-50 p-6">
      <div className="text-5xl">📭</div>
      <h2 className="text-lg font-semibold text-gray-700 mt-4">{message}</h2>
      {flag && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Create Ad
        </button>
      )}
    </div>
  );
};

export default NoDataYet;
