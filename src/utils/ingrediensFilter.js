const ingrediensFilter = (cards) => {
  const bun = cards.filter((item) => item.type === 'bun')
  const main = cards.filter((item) => item.type === 'main')
  const sauce = cards.filter((item) => item.type === 'sauce')

  return { bun, main, sauce }
}

export default ingrediensFilter;
