import { useState } from "react"
import { GenericService } from "../assets/api/service/GenericService"

export const useFetchMedicine = (route) => {
    const [medicine, setMedicine] = useState([]);
    const [error, setError] = useState(null);

    const fetchMedicine = async (params) => {
        try {
            const response = await GenericService.findAll(route, params)
            if (!response.data) {
                throw new Error('Não foi possível buscar os dados')
            }
            setMedicine(response.data)
        } catch (error) {
            setError(error.message);
        }
    }

    return { medicine, error, fetchMedicine }
}
