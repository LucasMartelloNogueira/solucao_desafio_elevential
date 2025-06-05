import { Box, Button, FormControl, InputLabel, TextField, Typography } from "@mui/material";
import type { ITiposPageController } from "../interfaces/ITiposPageController";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import TiposTable from "../components/TiposTable";
import { useEffect, useState } from "react";
import type { Tipo } from "../../types/Tipo";
import type { TipoCreate } from "../../types/TipoCreate";
import type { TipoUpdate } from "../../types/TipoUpdate";
import { grey, blue } from "@mui/material/colors"

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
    const [editCodigo, setEditCodigo] = useState<number>(0)
    const [editNome, setEditNome] = useState<string>("")
    const [isTipoSelected, setIsTipoSelected] = useState<boolean>(false)


    const selectTipo = (tipo: Tipo) => {
        setIsTipoSelected(true)
        setEditCodigo(tipo.codigo)
        setEditNome(tipo.nome)
    }


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
                <Button 
                    disabled={nome === ""}
                    sx={{ marginLeft: "5px" }} 
                    variant="outlined" onClick={() => {

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

            <Box sx={{ display: "flex", justifyContent: "center" }}>

                <TextField
                    disabled
                    sx={{ marginTop: "8px", width: "50%" }}
                    id="codigoEditTipo"
                    name="codigoEditTipo"
                    label="codigo"
                    defaultValue={0}
                    value={editCodigo}
                    onChange={(e) => setEditCodigo(Number(e.target.value))}
                />

                <TextField
                    disabled={!isTipoSelected}
                    sx={{marginLeft: "5px", marginTop: "8px", width: "50%" }}
                    id="nomeEditTipo"
                    name="nomeEditTipo"
                    // label="nome"
                    defaultValue={editNome}
                    value={editNome}
                    onChange={(e) => {
                        setEditNome(e.target.value)
                    }}
                />

                <Button
                    disabled={!isTipoSelected}
                    variant={isTipoSelected ? "contained" : "outlined"}
                    sx={{marginLeft: "5px"}}
                    onClick={() => {
                        setIsLoading(true)

                        const updateTipo = async (tipo: TipoUpdate) => {
                            const updatedTipo: Tipo | null = await controller.editTipo(tipo)

                            if (updatedTipo) {
                                setTipos((currentTipos) => {
                                    return currentTipos.map((tipo) => {
                                        if (tipo.codigo === updatedTipo.codigo) {
                                            return updatedTipo
                                        }

                                        return tipo
                                    })
                                })
                            }
                            
                            setIsTipoSelected(false)
                            setIsLoading(false)
                            setEditCodigo(0)
                            setEditNome("")
                        }
                        
                        const tipoToBeUpdated: TipoUpdate = {codigo: editCodigo, nome: editNome}
                        updateTipo(tipoToBeUpdated);
                    }}
                >editar tipo</Button>

            </Box>


            <Box sx={{marginTop: "10px",  display: "flex", alignItems: "center" }}>
                <SearchIcon />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="buscar por nome"
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />

            </Box>
            <TiposTable tipos={filteredTipos} deleteTipo={deleteTipo} selectTipo={selectTipo} />
        </Box>
    )
}