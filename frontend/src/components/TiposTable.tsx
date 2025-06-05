import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import type { Tipo } from "../../types/Tipo"
import TiposTableRow from "./TiposTableRow"

type props = {
    tipos: Tipo[]
    deleteTipo: (codigo: number) => void
    selectTipo: (tipo: Tipo) => void
}

export default function TiposTable({tipos, deleteTipo, selectTipo}: props) {
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

                    </TableRow>
                </TableHead>
                <TableBody>
                    {tipos.map((tipo, index) => {
                        return <TiposTableRow key={tipo.codigo} tipo={tipo} rowNum={index} deleteTipo={deleteTipo} selectTipo={selectTipo}/>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}