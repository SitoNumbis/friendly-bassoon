/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useReducer } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const DialogContext = createContext();

const dialogReducer = (dialogState, action) => {
  switch (action.type) {
    case "editing-note": {
      const { note } = action;
      const newDialogs = { ...dialogState };
      newDialogs.push({ type: "note", note });
      return {
        newDialogs,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useReducer(dialogReducer, {
    dialogs: [],
  });

  const value = { dialogState, setDialogState };
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useDialog = () => {
  const context = useContext(DialogContext);
  if (context === undefined)
    throw new Error("dialogContext must be used within a Provider");
  return context;
};

export { DialogProvider, useDialog };
