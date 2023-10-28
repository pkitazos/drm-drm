import { StarOff, Star } from "lucide-react";

export const Loyalty = ({ level }: { level: number }) => {
  return (
    <div className="flex flex-row justify-center">
      {level === 0 ? (
        <StarOff />
      ) : (
        Array.from({ length: level }, (_, i) => (
          <Star key={i} className="text-yellow-400" />
        ))
      )}
    </div>
  );
};
