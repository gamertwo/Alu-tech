'use client';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-blue-300 opacity-30"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading services...</p>
      </div>
    </div>
  );
};

export default Loading;