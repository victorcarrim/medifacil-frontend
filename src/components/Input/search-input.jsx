import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";


export const SearchInput = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
    });
    const search = searchParams.get('search');

    return (
        <TextField
            label='Pesquisar paciente'
            size='small'
            sx={'width: 100%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'}
            value={search}
            onChange={e =>  setSearchParams({ search: e.target.value }, { replace: true })}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
            }} />
    )
}
