import { Box, CircularProgress, Typography } from '@mui/material'

interface InlineLoaderProps {
  label?: string
}

export const InlineLoader = ({ label }: InlineLoaderProps) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <CircularProgress size={18} />
      {label ? (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      ) : null}
    </Box>
  )
}
