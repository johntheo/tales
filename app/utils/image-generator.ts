const colors = [
  ['#2196F3', '#E3F2FD'], // Blue theme
  ['#4CAF50', '#E8F5E9'], // Green theme
  ['#9C27B0', '#F3E5F5'], // Purple theme
  ['#FF9800', '#FFF3E0'], // Orange theme
  ['#F44336', '#FFEBEE'], // Red theme
  ['#607D8B', '#ECEFF1'], // Blue Grey theme
]

export function generatePatternUrl(seed: number): string {
  // Get a consistent color pair based on the seed
  const colorIndex = seed % colors.length
  const [color1, color2] = colors[colorIndex]
  
  // Create a canvas element
  const canvas = document.createElement('canvas')
  canvas.width = 1440
  canvas.height = 900
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return ''
  
  // Create a gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1440, 900)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1440, 900)
  
  // Add some random triangles
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1440
    const y = Math.random() * 900
    const size = Math.random() * 100 + 50
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + size, y)
    ctx.lineTo(x + size/2, y + size)
    ctx.closePath()
    
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`
    ctx.fill()
  }
  
  return canvas.toDataURL()
} 