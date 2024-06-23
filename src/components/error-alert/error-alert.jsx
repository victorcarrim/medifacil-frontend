import { Alert } from "@mui/material"
import PropTypes from 'prop-types';

export const ErrorAlert = ({ error }) => {
    return (
        error ?
            <Alert severity="error">
                {error}
            </Alert>
            : null
    )
}

ErrorAlert.propTypes = {
    error: PropTypes.string
}

