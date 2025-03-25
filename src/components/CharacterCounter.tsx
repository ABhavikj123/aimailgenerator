interface CharacterCounterProps {
  current: number
  limit: number
}

export function CharacterCounter({ current, limit }: CharacterCounterProps) {
  const isNearLimit = current > limit * 0.8
  const isAtLimit = current >= limit

  return (
    <div className={`text-sm text-right mt-1 ${
      isAtLimit ? 'text-red-500' : 
      isNearLimit ? 'text-yellow-500' : 
      'text-muted-foreground'
    }`}>
      {current}/{limit} characters
    </div>
  )
} 