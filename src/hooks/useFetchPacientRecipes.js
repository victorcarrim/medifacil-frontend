import { useState, useEffect } from 'react';
import { GenericService } from '../assets/api/service/GenericService';

export function useFetchPacientRecipes(url, id) {
    const [recipePacient, setRecipePacient] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchClientRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await GenericService.findAllListById(url, id);
                if (!response.data) {
                    throw new Error('Não foi possível buscar os dados');
                }
                setRecipePacient(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientRecipes();
    }, [url, id]);

    return { recipePacient, isLoading, error };
}