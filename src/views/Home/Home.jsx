// components
import Weather from "../../components/Cells/Weather/Weather";
import Notes from "../../components/Cells/Notes/Notes";

// contexts
import { NoteProvider } from "../../components/Cells/Notes/NotesProvider";

// styles
import "./styles.css";
import MusicPlayer from "../../components/Cells/MusicPlayer/MusicPlayer";

function Home() {
  return (
    <section className="w-full">
      <div className={"main-grid h-full w-full"}>
        <NoteProvider>
          <Notes />
        </NoteProvider>
        <MusicPlayer />
        <Weather />

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
