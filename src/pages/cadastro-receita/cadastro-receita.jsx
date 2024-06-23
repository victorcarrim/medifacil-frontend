import { Alert, Autocomplete, Box, IconButton, InputAdornment, ListItem, TextField, Typography } from "@mui/material"
import { PrimaryLayout } from "../../components/layout/primary-layout/primary-layout"
import { CadastroReceitaContainer, CadastroReceitaForm } from "./cadastro-receita.style.ts"
import { Button } from "../../components/button/button.jsx"
import { BackArrow } from "../../components/back-arrow/back-arrow.jsx"
import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom"
import { GenericService } from "../../assets/api/service/GenericService.js"
import { RenderModal } from "./receita-modal.jsx"
import { useFetchUsers } from "../../hooks/useFetchUsers.js"


export const CadastroReceita = () => {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState('');
    const [open, setOpen] = useState(false);
    const [remedio, setRemedio] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { users } = useFetchUsers('api/user/');

    const handleRemoveMed = (itemToRemove) => {
        setRemedio(remedio.filter(item => item !== itemToRemove));
    };

    function renderItem({ index, item, handleRemoveMed }) {
        return (
            <ListItem key={index}
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        title="Delete"
                        onClick={() => handleRemoveMed(item)}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <img id="medicine-information-photo" src={item.link_photo} alt="Imagem do medicamento" />
                    <Typography>
                        <p>Nome do medicamento: {item.name}</p>
                        <p>Duração do tratamento: {item.usage_duration} dias</p>
                        <p>Intervalo: {item.usage_interval}</p>
                        <p>Quantidade: {item.quantity}</p>
                        <p>Início do tratamento: {item.treatment_start}</p>
                    </Typography>
                </Box>
            </ListItem>
        );
    }


    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const memoizedUsers = useMemo(() => users, [users]);

    const validateForm = useCallback(() => {
        const { name, pacient, validity } = formData;
        if (name && pacient && validity && remedio.length > 0) {
            setIsFormValid(true);

        } else setIsFormValid(false);
    })

    useEffect(() => validateForm(), [formData, remedio, validateForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const validityDays = parseInt(formData.validity, 10);
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + validityDays);

        const formattedExpirationDate = expirationDate.toISOString().split('T')[0];
        const formattedRecipe = {
            name: formData.name,
            pacient: formData.pacient,
            data_expiration: formattedExpirationDate,
            medicines: remedio
        }

        startTransition(async () => {
            try {
                const newReceita = await GenericService.create('api/recipe/register-recipe', formattedRecipe);
                if (newReceita.status === 201) {
                    if (newReceita && newReceita.data) {
                        setSuccess('Receita criada com sucesso!');
                        setTimeout(() => navigate('/home'), 3000);
                    } else {
                        setError('Falha ao criar a receita. Unexpected response:', newReceita);
                    }
                }
            } catch (error) {
                setError('Erro no cadastro da receita. Por favor, tente novamente.');
            }
        })
    }

    return (
        <PrimaryLayout>
            <CadastroReceitaContainer>
                <BackArrow />
                <CadastroReceitaForm>
                    {success && <Alert variant="filled" severity="success">{success}</Alert>}
                    {error && <Alert variant="filled" severity="error">{error}</Alert>}
                    <h2>Cadastro de Receita</h2>
                    <TextField
                        label='Nome da receita'
                        name="name"
                        onChange={handleChange}
                        sx={'width: 100%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'} />

                    <Autocomplete
                        id="user-select-demo"
                        sx={'width: 100%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'}
                        options={memoizedUsers}
                        onChange={(event, newValue) => {
                            setFormData({ ...formData, pacient: newValue._id });
                        }}
                        autoHighlight
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name ? option.name : option.cpf}
                        renderOption={(props, option) => (
                            <Box component="li" key={option.id} sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name ? option.name : option.cpf}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Escolha um paciente"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password',
                                }}
                            />
                        )}
                    />

                    <TextField required
                        label='Validade da receita'
                        type="number"
                        name="validity"
                        onChange={handleChange}
                        InputProps={{ endAdornment: <InputAdornment position="dias">dias</InputAdornment> }}
                        sx={'width: 100%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'} />

                </CadastroReceitaForm>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '700px', margin: '1rem auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '1rem', width: '100%', margin: '2rem auto' }}>
                        <h2>Medicamentos</h2>

                        <Button
                            text='Adicionar Medicamento'
                            width={'50%'}
                            onClick={handleOpen} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '700px', margin: '1rem auto' }}>
                        {remedio && Object.keys(remedio).length > 0 ?
                            Object.values(remedio).map((item, index) => renderItem({ index, item, handleRemoveMed })) :
                            <p>Nenhum medicamento adicionado</p>
                        }
                    </Box>
                    <Button
                        text='Cadastrar Receita'
                        width={'100%'}
                        disabled={!isFormValid}
                        onClick={handleSubmit} />
                </Box>
                <RenderModal handleClose={handleClose} open={open} setRemedio={setRemedio} />
            </CadastroReceitaContainer>
        </PrimaryLayout>
    )
}

