
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import PasswordGenerator from "@/components/PasswordGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#1A1F2C] to-[#121419] p-4">
      <div className="w-full max-w-3xl">
        <PasswordGenerator />
      </div>
    </div>
  );
};

export default Index;
