import { useParams, useNavigate, Link } from "react-router-dom";
import type { MovieFormData } from "../interfaces";
import { useMovies } from "../context/MovieContext";
import MovieForm from "../components/MovieForm";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMovieById, updateMovie } = useMovies();

  const movie = id ? getMovieById(id) : undefined;

  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-400 mb-4">Düzenlenecek kayıt bulunamadı.</p>
        <Link to="/" className="text-cinema-gold underline">
          Arşive dön
        </Link>
      </div>
    );
  }

  const { id: _id, createdAt: _createdAt, ...formData } = movie;

  const handleSubmit = (data: MovieFormData) => {
    updateMovie(movie.id, data);
    navigate(`/film/${movie.id}`);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Kaydı Düzenle</h1>
      <p className="text-sm text-zinc-500 mb-6">{movie.title}</p>

      <MovieForm
        initialData={formData}
        onSubmit={handleSubmit}
        submitLabel="Değişiklikleri kaydet"
      />
    </div>
  );
}
