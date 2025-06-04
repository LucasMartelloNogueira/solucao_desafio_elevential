import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import PokemonsPage from "../pages/PokemonsPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";
import TiposPage from "../pages/TiposPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <PokemonsPage /> },
            { path: "pokemonDetails", element: <PokemonDetailsPage /> },
            { path: "Tipos", element: <TiposPage /> },
        ]
    }
]);