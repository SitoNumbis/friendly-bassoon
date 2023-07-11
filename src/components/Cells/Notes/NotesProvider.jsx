/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useReducer } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const NoteContext = createContext();

const noteReducer = (oldNotes, action) => {
  const { type } = action;
  switch (type) {
    case "to-edit": {
      const { id } = action;
      return { ...oldNotes, editing: id };
    }
    case "save": {
      const { id, newTitle, newBody } = action;
      const newNotes = { ...oldNotes };
      newNotes.notes[id].title = newTitle;
      newNotes.notes[id].body = newBody;
      return { ...newNotes };
    }

    case "add": {
      const newNotes = { ...oldNotes };
      const thisDate = String(new Date().getTime());
      newNotes.notes[thisDate] = {
        id: thisDate,
        title: "",
        body: "",
      };
      newNotes.editing = thisDate;
      return newNotes;
    }

    case "delete": {
      const { id } = action;
      delete oldNotes.notes[id];
      return { ...oldNotes };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const NoteProvider = ({ children }) => {
  const [noteState, setNoteState] = useReducer(noteReducer, {
    notes: {},
    editing: "",
  });

  const value = { noteState, setNoteState };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

NoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useNote = () => {
  const context = useContext(NoteContext);
  if (context === undefined)
    throw new Error("noteContext must be used within a Provider");
  return context;
};

export { NoteProvider, useNote };
