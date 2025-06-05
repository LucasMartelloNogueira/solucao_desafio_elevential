import { Button, TableCell, TableRow } from "@mui/material"
import type { Tipo } from "../../types/Tipo"
import { indigo } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const evenRowBGcolor = indigo[100]
const oddRowBGColor = indigo[50]

type props = {
    tipo: Tipo
    rowNum: number
    deleteTipo: (codigo: number) => void
    selectTipo: (tipo: Tipo) => void
}

export default function TiposTableRow({ tipo, rowNum, deleteTipo, selectTipo }: props) {

    return (
        <TableRow sx={{ backgroundColor: rowNum % 2 == 0 ? evenRowBGcolor : oddRowBGColor }}>
            <TableCell>{tipo.codigo}</TableCell>
            <TableCell>{tipo.nome}</TableCell>

            <TableCell>
                <Button
                    variant="contained"
                    onClick={() => selectTipo(tipo)}
                >Editar
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ marginLeft: 1 }}
                    onClick={() => deleteTipo(tipo.codigo)}
                >
                    deletar
                </Button>
            </TableCell>

        </TableRow>
    )
}