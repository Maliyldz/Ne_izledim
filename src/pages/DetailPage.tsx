import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  return <h1 className="text-2xl font-bold">Detay: {id}</h1>;
}