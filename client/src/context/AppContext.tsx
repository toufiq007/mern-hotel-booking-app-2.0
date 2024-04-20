import { createContext, useContext, useState } from "react";
import Toast from "../components/toast/Toast";

type ToastOptionType = {
  message: string;
  type: "ERROR" | "SUCCESS";
};

type AppContextType = {
  showToast: (toastOption: ToastOptionType) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastOptionType | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
      }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
