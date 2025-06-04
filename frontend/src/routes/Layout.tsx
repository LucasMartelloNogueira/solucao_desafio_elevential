import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <Box component="div">
            <Outlet />
        </Box>
    )
}