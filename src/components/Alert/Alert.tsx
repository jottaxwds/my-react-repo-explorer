import { Alert, AlertTitle } from '@mui/material'

const AlertError = ({ title = 'Error', message = '' }) => (
  <Alert severity="error">
    <AlertTitle>{title}</AlertTitle>
    {message}
  </Alert>
)

export default AlertError
