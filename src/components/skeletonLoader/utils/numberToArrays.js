function numberToArrays(rows) {
  return Array.from({ length: rows }, (_, i) => i + 1)
}

export { numberToArrays }
