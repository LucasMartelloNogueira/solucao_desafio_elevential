import { Box, Button, FormControl, InputLabel, TextField, Typography } from "@mui/material";
import type { ITiposPageController } from "../interfaces/ITiposPageController";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import TiposTable from "../components/TiposTable";
import { useEffect, useState } from "react";
import type { Tipo } from "../../types/Tipo";
import type { TipoCreate } from "../../types/TipoCreate";

type props = {
    controller: ITiposPageController
}

export default function TiposPage({ controller }: props) {

    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tipos, setTipos] = useState<Tipo[]>([])
    const [filteredTipos, setFilteredTipos] = useState<Tipo[]>([])
    const [nome, setNome] = useState<string>("")


    const deleteTipo = async (codigo: number) => {

        setIsLoading(true)

        const delTipo = async (codigo: number) => {
            const deletedTipo = await controller.deleteTipo(codigo)

            if (deletedTipo !== null) {
                setTipos((currentTipos) => {
                    return currentTipos.filter((tipo) => tipo.codigo !== codigo)
                })
            } else {
                console.log("erro ao deletar tipo")
            }

            setIsLoading(false)
        }

        delTipo(codigo)
    }


    useEffect(() => {
        setIsLoading(true)

        const getTipos = async () => {
            const tipos: Tipo[] | null = await controller.getAllTipos();

            if (tipos !== null) {
                setTipos(tipos)
            }

            setIsLoading(false)
        };

        getTipos();
    }, [])


    useEffect(() => {
        const filtered = tipos.filter((tipo) => {
            if (searchQuery === "") return true;
            return tipo.nome.includes(searchQuery);
        });

        setFilteredTipos(filtered);
    }, [searchQuery, tipos]);


    if (isLoading) {
        return (

            <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h1">Loading...</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h1"> Pagina de tipos</Typography>

            <Box sx={{ marginY: "20px", display: "flex", justifyContent: "center" }}>
                <Button sx={{}} variant="outlined" onClick={() => navigate("/pokemonCreate")}>Cadastrar tipo</Button>
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={() => navigate("/")}>Ver pokemons</Button>
            </Box>

            <Box sx={{ marginY: "20px", display: "flex", justifyContent: "center" }}>
                <TextField
                    sx={{ marginTop: "8px", width: "50%" }}
                    id="nomeNovoTipo"
                    name="nomeNovoTipo"
                    label="nome"
                    defaultValue={nome}
                    onChange={(e) => {
                        setNome(e.target.value)
                    }}
                />
                <Button sx={{ marginLeft: "5px" }} variant="outlined" onClick={() => {
                    
                    setIsLoading(true)

                    const createNovoTipo = async () => {

                        const tipoCreate: TipoCreate = {
                            nome: nome
                        }
    
                        const novoTipo = await controller.createTipo(tipoCreate)
                        if (novoTipo !== null) {
                            setNome("")
                            setTipos((currentTipos) => [...currentTipos, novoTipo])
                        } else {
                            console.log("erro ao criar novo tipo")
                        }

                        setIsLoading(false)
                    }

                    createNovoTipo()

                }}>Criar tipo</Button>
            </Box>


            <Box sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="buscar por nome"
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />

            </Box>
            <TiposTable tipos={filteredTipos} deleteTipo={deleteTipo} />
        </Box>
    )
}