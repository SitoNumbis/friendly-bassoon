// components
import Notes from "../../components/Cells/Notes/Notes";

// contexts
import { NoteProvider } from "../../components/Cells/Notes/NotesProvider";

// styles
import "./styles.css";

function Home() {
  return (
    <section className="w-full h-screen">
      <div className={"main-grid h-full w-full"}>
        <NoteProvider>
          <Notes />
        </NoteProvider>
        <div className="cell"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

export default Home;
