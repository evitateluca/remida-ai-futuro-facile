
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-remida-gray p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-remida-teal">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Oops! Pagina non trovata</p>
        <p className="text-gray-500 mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button className="bg-remida-orange hover:bg-remida-orange/90" asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home size={18} />
            Torna alla Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
