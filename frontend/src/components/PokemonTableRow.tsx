import { Button, TableCell, TableRow } from "@mui/material";
import type { Pokemon } from "../../types/Pokemon";
import { useNavigate } from "react-router-dom";
import { indigo } from "@mui/material/colors";

const evenRowBGcolor = indigo[100]
const oddRowBGColor = indigo[50]

type props = {
    rowNum: number
    pokemon: Pokemon
    deletePokemon: (id: number) => void
}

export default function PokemonTableRow({rowNum, pokemon, deletePokemon}: props) {

    const navigate = useNavigate()

    return (
        <TableRow sx={{backgroundColor: rowNum % 2 == 0 ? evenRowBGcolor : oddRowBGColor}}>
            <TableCell>{pokemon.codigo}</TableCell>
            <TableCell>{pokemon.nome}</TableCell>
            <TableCell>{pokemon.tipo_primario.nome}</TableCell>
            <TableCell>{pokemon.tipo_secundario === null ? "-" : pokemon.tipo_secundario.nome}</TableCell>
            <TableCell>
                <Button 
                    variant="contained"
                    onClick={() => navigate("/pokemonDetails", {
                        state: {
                            currPokemon: pokemon
                        }
                    })}
                >Editar
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{marginLeft: 1}}
                    onClick={() => deletePokemon(pokemon.codigo)}
                >
                    deletar
                </Button>
            </TableCell>

        </TableRow>
    )
}