export const renderColorByName = (name: string) => {
  const num = name
    .split("")
    .map((char) => char.charCodeAt(0))
    .reduce((current, previous) => previous + current)
  return `#${(num * 2).toString(16)}`
}
