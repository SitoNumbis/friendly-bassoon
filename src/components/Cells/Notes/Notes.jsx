import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { parseQueries } from "some-javascript-utils/browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";
import { useNote } from "./NotesProvider";

// components
import NoteForm from "./Note/NoteForm";
import Note from "./Note/Note";

// styles
import styles from "./styles.module.css";

function Notes() {
  const { languageState } = useLanguage();

  const { noteState, setNoteState } = useNote();

  const printNotes = useMemo(() => {
    return Object.values(noteState.notes).map((note) => (
      <Note key={note.id} {...note} />
    ));
  }, [noteState]);

  function addNote() {
    setNoteState({ type: "add" });
  }

  const location = useLocation();

  useEffect(() => {
    const { search, pathname } = location;

    const queries = parseQueries(search);
    if (queries.id !== undefined && pathname === "/edit") {
      // editing note
      setNoteState({ type: "to-edit", id: queries.id });
    } else setNoteState({ type: "to-edit", id: "" });
  }, [location]);

  return (
    <article id="notes" className={`cell ${styles.main}`}>
      <NoteForm />
      <div
        className={`p-4 gap-2 flex flex-col items-start justify-start w-full min-w-[100%] transition ease-in duration-500  ${
          noteState.editing.length ? "translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <h2>{languageState.texts.notes.title}</h2>
          <button className="transition hover:text-primary" onClick={addNote}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
        <div className="flex flex-col h-full w-full overflow-auto gap-2">
          {printNotes}
        </div>
      </div>
    </article>
  );
}

export default Notes;
