import { useState, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

// contexts
import { useDialog } from "./DialogContext";

function DialogPortal({ children }) {
  const { dialogState } = useDialog();

  const [visible, setVisible] = useState(false);

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") setVisible(false);
    },
    [setVisible]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  const printDialogs = useMemo(() => {
    return dialogState.dialogs.map((dialog) =>
      createPortal(
        <div className="w-full h-screen backdrop-blur-xl fixed top-0 left-0">
          {dialog.type === "note" ? <NoteForm id={dialog.note} /> : null}
        </div>,
        document.body
      )
    );
  }, [dialogState]);

  return <>{printDialogs}</>;
}

DialogPortal.propTypes = {
  children: PropTypes.node,
};

export default DialogPortal;
