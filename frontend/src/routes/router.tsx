import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "../pages/ErrorPage";
import PokemonsPage from "../pages/PokemonsPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";
import TiposPage from "../pages/TiposPage";
import {pokemonPageController} from "../controllers/PokemonPageController";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <PokemonsPage controller={pokemonPageController} /> },
            { path: "pokemonDetails", element: <PokemonDetailsPage /> },
            { path: "Tipos", element: <TiposPage /> },
        ]
    }
]);