import { createContext, useContext, useState } from "react";
import Toast from "../components/toast/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient";

type ToastOptionType = {
  message: string;
  type: "ERROR" | "SUCCESS";
};

type AppContextType = {
  showToast: (toastOption: ToastOptionType) => void;
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastOptionType | undefined>(undefined);
  //! checking if there are any errors in our token or not
  const { isError } = useQuery("auth_token", apiClient.validateToken, {
    retry: false,
  });
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
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
