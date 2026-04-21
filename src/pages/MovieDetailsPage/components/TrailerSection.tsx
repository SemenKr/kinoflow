import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, ButtonBase, Skeleton, Typography } from '@mui/material'
import { useCallback, useMemo, useRef, useState } from 'react'

import {
  sectionTitleSx,
  trailerContainerSx,
  trailerFrameWrapSx,
  trailerIframeSx,
  trailerPlayBadgeSx,
  trailerPreviewButtonSx,
  trailerPreviewImageSx,
  trailerPreviewOverlaySx,
} from '../MovieDetailsPage.styles'

const YOUTUBE_PLAY_RETRY_MS = 180
const YOUTUBE_PLAY_COMMAND = JSON.stringify({
  event: 'command',
  func: 'playVideo',
  args: [],
})

const createTrailerEmbedUrl = (trailerKey: string) => {
  const origin =
    typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : ''

  return `https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0&playsinline=1&enablejsapi=1${origin}`
}

const postYouTubePlayCommand = (iframeWindow: WindowProxy | null) => {
  if (!iframeWindow) return
  iframeWindow.postMessage(YOUTUBE_PLAY_COMMAND, '*')
}

interface TrailerSectionProps {
  isLoading: boolean
  trailer: { key: string; name: string } | null
  title: string
  playLabel: string
}

export const TrailerSection = ({ isLoading, trailer, title, playLabel }: TrailerSectionProps) => {
  const trailerIframeRef = useRef<HTMLIFrameElement | null>(null)
  const [activatedTrailerKey, setActivatedTrailerKey] = useState<string | null>(null)

  const shouldShowSection = isLoading || Boolean(trailer)
  const shouldShowTrailerIframe =
    !isLoading && Boolean(trailer) && activatedTrailerKey === trailer?.key
  const trailerEmbedUrl = useMemo(() => {
    if (!trailer) return ''
    return createTrailerEmbedUrl(trailer.key)
  }, [trailer])
  const handleTrailerIframeLoad = useCallback(() => {
    const iframeWindow = trailerIframeRef.current?.contentWindow ?? null
    postYouTubePlayCommand(iframeWindow)
    window.setTimeout(() => {
      postYouTubePlayCommand(iframeWindow)
    }, YOUTUBE_PLAY_RETRY_MS)
  }, [])

  if (!shouldShowSection) return null

  return (
    <Box sx={trailerContainerSx}>
      <Typography variant="h6" sx={sectionTitleSx}>
        {title}
      </Typography>
      <Box sx={trailerFrameWrapSx}>
        {isLoading && <Skeleton variant="rectangular" width="100%" height="100%" />}
        {!isLoading && trailer && !shouldShowTrailerIframe && (
          <ButtonBase
            onClick={() => setActivatedTrailerKey(trailer.key)}
            aria-label={playLabel}
            sx={trailerPreviewButtonSx}
          >
            <Box
              component="img"
              src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
              alt={trailer.name || title}
              loading="lazy"
              sx={trailerPreviewImageSx}
            />
            <Box sx={trailerPreviewOverlaySx}>
              <Box sx={trailerPlayBadgeSx}>
                <PlayArrowRoundedIcon />
              </Box>
            </Box>
          </ButtonBase>
        )}
        {shouldShowTrailerIframe && trailer && (
          <Box
            component="iframe"
            ref={trailerIframeRef}
            src={trailerEmbedUrl}
            onLoad={handleTrailerIframeLoad}
            title={trailer.name || title}
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sx={trailerIframeSx}
          />
        )}
      </Box>
    </Box>
  )
}
