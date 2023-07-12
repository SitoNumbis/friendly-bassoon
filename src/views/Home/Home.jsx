// components
import Weather from "../../components/Cells/Weather/Weather";
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
        <Weather />
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
