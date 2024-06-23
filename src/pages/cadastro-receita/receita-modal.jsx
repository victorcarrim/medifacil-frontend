import { Alert, Autocomplete, Box, IconButton, ImageList, ImageListItem, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import { CadastroRemedioForm } from "./cadastro-receita.style"
import { Button } from "../../components/button/button"
import { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useFetchMedicine } from "../../hooks/useFetchMedicine.js";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 900,
    bgcolor: 'var(--white)',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    borderRadius: 'var(--border-radius)',
}

export const RenderModal = ({ handleClose, open, setRemedio }) => {
    const [formData, setFormData] = useState({
        dosage: '',
        usage_interval: '',
        usage_duration: '',
        quantity: ''
    });
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState('');
    const [imageLinks, setImageLinks] = useState([]);
    const [imagem, setImagem] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [erroForm, setErroForm] = useState('');

    const { medicine, fetchMedicine } = useFetchMedicine('/api/medicine/get-medicines-by-name');

    const verificaCampos = useCallback(() => {
        const formCamposPreenchidos = Object.values(formData).every(value => value.trim() !== '');
        const medicinesCamposPreenchidos = Object.values(value).every(value => value !== '');
        if (formCamposPreenchidos && medicinesCamposPreenchidos && imagem !== '') {
            setIsFormComplete(true);
            setErroForm('');
            return true
        } else {
            setIsFormComplete(false);
            setErroForm('Preencha todos os campos!');
            return false
        }
    }, [formData, value, imagem, setErroForm, setIsFormComplete])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        verificaCampos();
    }, [formData, value, imagem, verificaCampos])

    const handleInputChange = (event, newInputValue) => setInputValue(newInputValue);

    const handleSearchClick = async () => {
        inputValue.replace(' ', '%');
        await fetchMedicine(`nome_produto=${inputValue}`);
    };

    const handleAddMedicine = (e) => {
        e.preventDefault();
        const formattedRemedio = {
            medicine: value._id,
            name: value.nome_produto,
            usage_duration: parseInt(formData.usage_duration),
            usage_interval: `${formData.usage_interval} hours`,
            treatment_start: new Date().toISOString().split('T')[0],
            link_photo: imagem,
            quantity: `${formData.dosage} mg | ${formData.quantity} comprimidos`
        };
        setRemedio(prevState => [...prevState, formattedRemedio]);
        handleClose();

    }

    const getImage = async () => {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: 'AIzaSyBl_t_8322eAhMntYmlQvpYFElrL9lbvxA',
                cx: '31135ccc7bb374f3a',
                q: `${value.nome_produto} remédo`,
                sort: 'date:r:relevance',
                searchType: 'image',
            },
        });
        setImageLinks(response.data.items.map(item => item.link));
    }

    const handleOnChange = async (event, newValue) => {
        setValue(newValue);
        setTimeout(() => getImage(), 1000);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box
                sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Adicionar Medicamento
                </Typography>

                <Autocomplete
                    sx={{ width: '100%', backgroundColor: 'var(--blueish-gray)', borderRadius: 'var(--border-radius)' }}
                    onInputChange={handleInputChange}
                    autoHighlight
                    options={medicine}
                    onChange={handleOnChange}
                    getOptionLabel={(option) => option.nome_produto}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderOption={(props, option) => (
                        <Box component="li" key={option._id}{...props}>
                            {`${option.nome_produto} | ${option.empresa_detentora_registro}`}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Escolha um medicamento"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSearchClick}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />

                <Typography id="modal-modal-title" variant="h6" component="h2" sx={'text-decoration: underline'}>
                    Informações adicionais
                </Typography>

                <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <img id="medicine-information-photo" src={imagem} alt="Imagem do medicamento" />
                    <Typography>
                        <p>Nome do medicamento: {value.nome_produto}</p>
                        <p>Princípio ativo: {value.principio_ativo}</p>
                        <p>Classe: {value.classe_terapeutica}</p>
                        <p>Fabricante: {value.empresa_detentora_registro}</p>
                        <p>Categoria: {value.categoria_regulatoria}</p>
                    </Typography>
                </Box>

                <CadastroRemedioForm>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Box>
                            <TextField required
                                label='Dose'
                                type="number"
                                name="dosage"
                                onChange={handleChange}
                                InputProps={{ endAdornment: <InputAdornment position="end">mg</InputAdornment> }}
                                sx={'width: 30%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'} />
                            <TextField required
                                label='Periodicidade do medicamento'
                                type="number"
                                name="usage_interval"
                                onChange={handleChange}
                                InputProps={{ endAdornment: <InputAdornment position="end">horas</InputAdornment> }}
                                sx={'width: 30%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'} />
                        </Box>
                        <Box>
                            <TextField required
                                label='Duração de tratamento'
                                type="number"
                                name="usage_duration"
                                onChange={handleChange}
                                InputProps={{ endAdornment: <InputAdornment position="end">dias</InputAdornment> }}
                                sx={'width: 30%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'} />
                            <TextField required
                                label='Comprimidos'
                                type="number"
                                name="quantity"
                                onChange={handleChange}
                                InputProps={{ endAdornment: <InputAdornment position="end">und</InputAdornment> }}
                                sx={'width: 30%; background-color: var(--blueish-gray); border-radius: var(--border-radius)'} />
                        </Box>
                    </Box>

                    <Typography variant="p">
                        Escolha uma foto para o medicamento
                    </Typography>

                    <ImageList sx={'width: 100%'} cols={imageLinks.length} rowHeight={150}>
                        {imageLinks.map((link, index) => (
                            <ImageListItem key={index} sx={{ width: 100, height: 100 }}>
                                <img id="box-images-google-photos" onClick={() => setImagem(link)} src={link} alt="Imagem do medicamento" />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    {erroForm && <Alert severity='warning'>{erroForm}</Alert>}
                    <Button
                        type="submit"
                        text='Adicionar à Receita'
                        onClick={handleAddMedicine}
                        disabled={!isFormComplete}
                        color={'var(--black)'}
                        bgColor={'var(--turquoise)'} />

                </CadastroRemedioForm>
            </Box>
        </Modal>
    )
}


RenderModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setRemedio: PropTypes.func.isRequired,
}