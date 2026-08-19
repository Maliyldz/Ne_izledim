import { useNavigate } from "react-router-dom";
import type { MovieFormData } from "../interfaces";
import { useMovies } from "../context/MovieContext";
import MovieForm from "../components/MovieForm";

export default function AddPage() {
  const { addMovie } = useMovies();
  const navigate = useNavigate();

  const handleSubmit = (data: MovieFormData) => {
    addMovie(data);
    navigate("/");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Yeni Kayıt</h1>
      <p className="text-sm text-zinc-500 mb-6">
        Arşivine yeni bir film veya dizi ekle.
      </p>

      <MovieForm onSubmit={handleSubmit} submitLabel="Kaydet" />
    </div>
  );
}
