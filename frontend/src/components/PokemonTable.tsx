import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { Pokemon } from "../../types/Pokemon"
import PokemonTableRow from "./PokemonTableRow"

type props = {
    pokemons: Pokemon[];
    deletePokemon: (codigo: number) => void
}

export default function PokemonTable({ pokemons, deletePokemon }: props) {


    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography>
                                <strong>Codigo</strong>
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>
                                <strong>Nome</strong>
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>
                                <strong>Tipo Primário</strong>
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>
                                <strong>Tipo Secundário</strong>
                            </Typography>
                        </TableCell>

                        <TableCell>
                            <Typography>
                                <strong>Ações</strong>
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemons.map((pokemon, index) => {
                        return <PokemonTableRow key={pokemon.codigo} rowNum={index} pokemon={pokemon} deletePokemon={deletePokemon} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}