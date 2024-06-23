import { ArrowBack } from "@mui/icons-material";
import { Fab } from "@mui/material";


export const BackArrow = () => {
    return (
        <Fab sx={'transform: translate(57px, -239px);'}
            onClick={() => window.history.back()}>
            <ArrowBack />
        </Fab>
    )
}
