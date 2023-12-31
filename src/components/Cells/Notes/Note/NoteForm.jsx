import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../../../contexts/LanguageProvider";
import { useNote } from "../NotesProvider";

// components
import SimpleInput from "../../../SimpleInput/SimpleInput";
import { useCallback } from "react";
import { css } from "@emotion/css";

function NoteForm() {
  const { languageState } = useLanguage();

  const { noteState, setNoteState } = useNote();

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentBody, setCurrentBody] = useState("");

  const onLocalSave = useCallback(() => {
    setNoteState({
      type: "save",
      id: noteState.editing,
      newTitle: currentTitle,
      newBody: currentBody,
    });
  }, [setNoteState, currentBody, currentTitle, noteState]);

  useEffect(() => {
    if (noteState.editing.length) {
      setCurrentTitle(noteState.notes[noteState.editing].title);
      setCurrentBody(noteState.notes[noteState.editing].body);
      document.getElementById("note-title")?.focus();
    }
  }, [noteState]);

  return (
    <div
      className={`transition ease-in duration-500 w-full min-w-[100%] ${css({
        height: "calc(100% - 36px)",
      })} ${
        noteState.editing.length ? "translate-x-0" : "-translate-x-[100%]"
      }`}
    >
      <div className="w-full py-1 px-4 gap-2 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link to="/" className="transition hover:text-primary">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h3 className="text-xl">{languageState.texts.notes.editing}</h3>
        </div>
        <button onClick={onLocalSave} className="button">
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>
      <div
        className={`w-full p-4 gap-2 flex flex-col items-start justify-start ${css(
          {
            height: "calc(100% - 36px)",
          }
        )}`}
      >
        <SimpleInput
          className="w-full"
          label={languageState.texts.notes.titleLabel}
          inputProps={{
            id: "note-title",
            value: currentTitle,
            onChange: (e) => setCurrentTitle(e.target.value),
            className: "!pl-3",
            type: "text",
          }}
        />
        <SimpleInput
          className={`w-full h-full ${css({
            div: {
              height: "100%",
            },
          })}`}
          label={languageState.texts.notes.bodyLabel}
          inputProps={{
            value: currentBody,
            onChange: (e) => setCurrentBody(e.target.value),
            className: "h-full !pl-3 !pt-3",
            type: "textarea",
          }}
        />
      </div>
    </div>
  );
}

export default NoteForm;
