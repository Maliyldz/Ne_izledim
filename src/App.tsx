import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ekle" element={<AddPage />} />
            <Route path="/film/:id" element={<DetailPage />} />
            <Route path="/film/:id/duzenle" element={<EditPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}