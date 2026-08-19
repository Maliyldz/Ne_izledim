import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import type { MovieFormData, MediaType, WatchStatus } from "../interfaces";
import { GENRES, MEDIA_TYPES, STATUS_OPTIONS } from "../utils/constants";
import StarRating from "./StarRating";

interface MovieFormProps {
  initialData?: MovieFormData;
  onSubmit: (data: MovieFormData) => void;
  submitLabel: string;
}

const emptyForm: MovieFormData = {
  title: "",
  year: new Date().getFullYear(),
  type: "film",
  genre: GENRES[0],
  status: "izlenecek",
  rating: 0,
  posterUrl: "",
  note: "",
};

const inputClass =
  "w-full bg-cinema-bg border border-cinema-border rounded-lg px-3 py-2 text-sm outline-none focus:border-cinema-gold transition";

const labelClass = "block text-sm font-medium text-zinc-300 mb-1.5";

export default function MovieForm({
  initialData,
  onSubmit,
  submitLabel,
}: MovieFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<MovieFormData>(initialData ?? emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const found: Record<string, string> = {};
    const currentYear = new Date().getFullYear();

    if (!form.title.trim()) {
      found.title = "Başlık boş bırakılamaz.";
    }
    if (!form.year || form.year < 1900 || form.year > currentYear + 5) {
      found.year = `Yıl 1900 ile ${currentYear + 5} arasında olmalı.`;
    }
    if (form.posterUrl && !/^https?:\/\//i.test(form.posterUrl)) {
      found.posterUrl = "Bağlantı http:// veya https:// ile başlamalı.";
    }

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({ ...form, title: form.title.trim(), note: form.note.trim() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-[220px_1fr] gap-6"
    >
      {/* SOL: poster önizleme */}
      <div>
        <label className={labelClass}>Poster önizleme</label>
        <div className="aspect-[2/3] bg-cinema-card border border-cinema-border rounded-xl overflow-hidden flex items-center justify-center">
          {form.posterUrl ? (
            <img
              src={form.posterUrl}
              alt="Önizleme"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <ImageIcon size={32} className="text-zinc-600" />
          )}
        </div>
      </div>

      {/* SAĞ: alanlar */}
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Başlık *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Örn. Interstellar"
            className={inputClass}
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Yıl *</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
              className={inputClass}
            />
            {errors.year && (
              <p className="text-red-400 text-xs mt-1">{errors.year}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Tür</label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as MediaType })
              }
              className={inputClass}
            >
              {MEDIA_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Kategori</label>
            <select
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              className={inputClass}
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Durum</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as WatchStatus })
              }
              className={inputClass}
            >
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Puan</label>
          <StarRating
            value={form.rating}
            onChange={(rating) => setForm({ ...form, rating })}
            size={24}
          />
        </div>

        <div>
          <label className={labelClass}>Poster bağlantısı</label>
          <input
            type="text"
            value={form.posterUrl}
            onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
            placeholder="https://..."
            className={inputClass}
          />
          {errors.posterUrl && (
            <p className="text-red-400 text-xs mt-1">{errors.posterUrl}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Notum</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={3}
            placeholder="Aklında kalanlar..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-cinema-gold text-black font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition"
          >
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-cinema-border px-5 py-2.5 rounded-lg text-zinc-300 hover:bg-cinema-card transition"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </form>
  );
}
