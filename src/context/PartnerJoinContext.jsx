import { createContext, useContext, useMemo, useState } from "react";
import JoinPartnerModal from "../components/partnerPage/JoinPartnerModal";

const PartnerJoinContext = createContext(null);

export function PartnerJoinProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      openJoinModal: () => setOpen(true),
      closeJoinModal: () => setOpen(false),
    }),
    [],
  );

  return (
    <PartnerJoinContext.Provider value={value}>
      {children}
      <JoinPartnerModal isOpen={open} onClose={() => setOpen(false)} />
    </PartnerJoinContext.Provider>
  );
}

export function usePartnerJoin() {
  const ctx = useContext(PartnerJoinContext);
  if (!ctx) {
    throw new Error("usePartnerJoin must be used within PartnerJoinProvider");
  }
  return ctx;
}
