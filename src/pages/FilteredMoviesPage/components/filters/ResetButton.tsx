import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import { Button, Divider } from '@mui/material'

interface ResetButtonProps {
  label: string
  disabled: boolean
  onReset: () => void
}

export const ResetButton = ({ label, disabled, onReset }: ResetButtonProps) => {
  return (
    <>
      <Divider sx={{ my: 2 }} />

      <Button
        fullWidth
        variant="outlined"
        startIcon={<RestartAltRoundedIcon />}
        onClick={onReset}
        disabled={disabled}
      >
        {label}
      </Button>
    </>
  )
}
