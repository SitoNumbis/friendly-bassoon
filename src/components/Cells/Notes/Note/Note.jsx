import { Link } from "react-router-dom";

import { memo } from "react";

import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../../../contexts/LanguageProvider";

function Note({ id, title, body, onDelete }) {
  const { languageState } = useLanguage();

  return (
    <div id={id} className="flex items-center justify-between w-full">
      <div>
        <h3>{title ? title.length : languageState.texts.notes.empty}</h3>
        <p>{body}</p>
      </div>
      <div className="flex gap-2">
        <Link to={`/edit?id=${id}`} className="transition hover:text-primary">
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <button
          className="transition hover:text-primary"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

const NoteMemo = memo((props) => <Note {...props} />, arePropsEqual);

NoteMemo.displayName = "Note";

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.id === newProps.id &&
    oldProps.body === newProps.body &&
    oldProps.title === newProps.title &&
    oldProps.onClick === newProps.onClick &&
    oldProps.onDelete === newProps.onDelete
  );
}

export default Note;
