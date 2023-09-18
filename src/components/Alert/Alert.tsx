import { Alert, AlertTitle } from '@mui/material'

const AlertError = ({ title = 'Error', message = '' }) => (
  <Alert data-testid="alert-error" severity="error">
    <AlertTitle>{title}</AlertTitle>
    {message}
  </Alert>
)

export default AlertError
