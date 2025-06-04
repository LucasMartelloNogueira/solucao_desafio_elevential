import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { Pokemon } from "../../types/Pokemon"
import PokemonTableRow from "./PokemonTableRow"

type props = {
    pokemons: Pokemon[]
}

export default function PokemonTable({ pokemons }: props) {


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
                        return <PokemonTableRow rowNum={index} pokemon={pokemon} deletePokemon={() => alert("TODO criar contexto de funcao que deleta pokemon")} />
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}