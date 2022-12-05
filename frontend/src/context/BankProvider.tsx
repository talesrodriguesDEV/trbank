import { useState } from "react";
import BankContext from "./BankContext";

export default function BankProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState('');

  const objectValue = {
    token,
    setToken,
  };

  return (
    <BankContext.Provider value={objectValue}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-900 border">
        {children}
      </div>
    </BankContext.Provider>
  );
}
