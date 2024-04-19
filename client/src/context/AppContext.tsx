import { createContext, useContext } from "react";

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
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          console.log(toastMessage);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
