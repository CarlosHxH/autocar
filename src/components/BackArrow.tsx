import { IconButton } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function BackArrow() {
  const router = useRouter()
  const pathname = usePathname()

  if(['/','/dashboard'].includes(pathname)) return null;

  return (
    <IconButton type="button" size={'small'} onClick={router.back}>
      <ArrowBackIosIcon />
    </IconButton>
  )
}