import { useCallback, useMemo, useReducer } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";

// components
import Note from "./Note/Note";

// styles
import styles from "./styles.module.css";

function Notes() {
  const { languageState } = useLanguage();

  const notesReducer = useCallback(
    (oldNotes, action) => {
      const { type } = action;
      switch (type) {
        case "add": {
          const newNotes = { ...oldNotes };
          const thisDate = new Date().getTime();
          newNotes[thisDate] = {
            id: thisDate,
            title: languageState.texts.notes.newOne,
            body: "",
          };
          return newNotes;
        }
        case "select": {
          /* const { id } = action; */
          return { ...oldNotes };
        }
        case "delete": {
          const { id } = action;
          console.log(id, oldNotes);
          delete oldNotes[id];
          return { ...oldNotes };
        }
        default:
          return oldNotes;
      }
    },
    [languageState]
  );

  const [notes, setNotes] = useReducer(notesReducer, {});

  const editNote = useCallback(
    (toEdit) => {
      setNotes({ type: "select", id: toEdit });
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (toDelete) => {
      setNotes({ type: "delete", id: toDelete });
    },
    [setNotes]
  );

  const printNotes = useMemo(() => {
    return Object.values(notes).map((note) => (
      <Note key={note.id} onClick={editNote} onDelete={deleteNote} {...note} />
    ));
  }, [notes, deleteNote, editNote]);

  function addNote() {
    setNotes({ type: "add" });
  }

  return (
    <article id="notes" className={`cell ${styles.main}`}>
      <div className="flex w-full items-center justify-between">
        <h2>{languageState.texts.notes.title}</h2>
        <button className="transition hover:text-primary" onClick={addNote}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </div>
      <div className="flex flex-col h-full w-full overflow-auto gap-2">
        {printNotes}
      </div>
    </article>
  );
}

export default Notes;
