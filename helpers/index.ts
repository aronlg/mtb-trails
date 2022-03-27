import { theme } from '@nextui-org/react'

export const colorByDifficulty = (rating: number | undefined) => {
  switch (rating) {
    case 1:
      return theme?.colors.green500.value
    case 2:
      return theme?.colors.blue500.value
    case 3:
      return theme?.colors.red500.value
    case 4:
      return theme?.colors.black.value
    default:
      return theme?.colors.green500.value
  }
}

export const getTextByDifficulty = (rating: number) => {
  switch (rating) {
    case 1:
      'Auðvelt'
    case 2:
      'Þægilegt'
    case 3:
      'Miðlungs'
    case 4:
      'Erfitt'
    default:
      'Auðvelt'
  }
}
