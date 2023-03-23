import React, { ReactNode, useContext, useState } from "react";
export type AuthState = "login" | "register";
export interface UiProviderProps {
  children?: ReactNode;
}

export interface UiContextModel {
  dialog: boolean;
  authPage: AuthState;
  handleDialogState: (newState: boolean) => void;
  handleAuthState: (newState: AuthState) => void;
}

export const UiContext = React.createContext<UiContextModel>(
  {} as UiContextModel
);

export const UiProvider = ({ children }: UiProviderProps) => {
  const [dialog, setDialog] = useState(false);
  const [authPage, setAuthPage] = useState<AuthState>("login");

  function handleAuthState(newState: AuthState) {
    setAuthPage(newState);
  }
  function handleDialogState(newState: boolean) {
    setDialog(newState);
  }

  const values = {
    authPage,
    handleAuthState,
    dialog,
    handleDialogState,
  };

  return <UiContext.Provider value={values}>{children}</UiContext.Provider>;
};

export function useUiContext() {
  return useContext(UiContext);
}
