import { Star } from "lucide-react";

interface StarRatingProps{
    value: number;
    onChange?: (value: number) => void;
    size?: number;
}

export default function StarRating({ value, onChange, size = 16 }: StarRatingProps) {
  const isInteractive = typeof onChange === "function";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!isInteractive}
          onClick={() => onChange?.(star === value ? 0 : star)}
          className={isInteractive ? "cursor-pointer hover:scale-110 transition" : "cursor-default"}
          aria-label={`${star} yıldız`}
        >
          <Star
            size={size}
            className={
              star <= value
                ? "fill-cinema-gold text-cinema-gold"
                : "text-zinc-600"
            }
          />
        </button>
      ))}
    </div>
  );
}