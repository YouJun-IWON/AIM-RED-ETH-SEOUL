"use client";

import ChatMessages from "~~/components/accordian-stage/LLMs/components/ChatMessages";

const page = () => {
  return (
    <div className="flex flex-1 items-center justify-center mt-30 bg-black">
      <div className="w-full grid grid-cols-2 items-center justify-center">
        <div>
          <ChatMessages className="px-2 py-3 flex-1" />
        </div>

        <div className="max-w-2xl"></div>
      </div>
    </div>
  );
};

export default page;
