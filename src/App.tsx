import { useMovies } from "./context/MovieContext";

function App() {
  const { movies, addMovie, deleteMovie } = useMovies();

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold text-cinema-gold mb-6">
        🎬 İzledim — {movies.length} kayıt
      </h1>

      <button
        onClick={() =>
          addMovie({
            title: "Test Filmi",
            year: 2026,
            type: "film",
            genre: "Dram",
            status: "izlenecek",
            rating: 0,
            posterUrl: "",
            note: "",
          })
        }
        className="bg-cinema-gold text-black px-4 py-2 rounded-lg font-semibold mb-6"
      >
        Test kaydı ekle
      </button>

      <ul className="space-y-2">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-cinema-card border border-cinema-border rounded-lg p-3 flex justify-between items-center"
          >
            <span>
              {movie.title} ({movie.year}) — {movie.status}
            </span>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="text-red-400 text-sm"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;