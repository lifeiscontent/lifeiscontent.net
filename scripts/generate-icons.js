#!/usr/bin/env node

import sharp from 'sharp'
import { chromium } from 'playwright'
import { spawn } from 'child_process'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDir = join(__dirname, '..', 'public')

// Ensure public directory exists
try {
  mkdirSync(publicDir, { recursive: true })
} catch (err) {
  // Directory already exists
}

const primaryColor = '#290070'

// SVG template for the logo icons
const createLogoSVG = (size, backgroundColor = 'transparent', borderRadius = 0) => {
  const logoSize = Math.floor(size * 0.75)
  const logoX = (size - logoSize) / 2
  const logoY = (size - logoSize) / 2

  // Use primary color logo on white background, white logo on colored background
  const logoColor = backgroundColor === '#ffffff' ? primaryColor : '#ffffff'

  let backgroundElement = ''
  if (backgroundColor !== 'transparent') {
    if (borderRadius > 0) {
      backgroundElement = `<rect width="${size}" height="${size}" rx="${borderRadius}" ry="${borderRadius}" fill="${backgroundColor}"/>`
    } else {
      backgroundElement = `<rect width="${size}" height="${size}" fill="${backgroundColor}"/>`
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      ${backgroundElement}
      <g transform="translate(${logoX}, ${logoY}) scale(${logoSize / 400})">
        <path d="M60 400V0L340 400H60ZM80 380H304L80 60V160L228 380H198L80 200V380Z" fill="${logoColor}"/>
      </g>
    </svg>
  `
}

async function generateIcon(size, filename, backgroundColor = 'transparent', borderRadius = 0) {
  const svg = createLogoSVG(size, backgroundColor, borderRadius)
  const buffer = await sharp(Buffer.from(svg)).png().toBuffer()

  writeFileSync(join(publicDir, filename), buffer)
  console.log(`Generated: ${filename} (${size}x${size})`)
}

function startServer() {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn('pnpm', ['serve'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      cwd: join(__dirname, '..'),
    })

    let serverUrl = null

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString()

      // More flexible regex to match the serve output
      const match = output.match(/Local:\s+([^\s]+)/) || output.match(/(http:\/\/localhost:\d+)/)
      if (match) {
        serverUrl = match[1]
        console.log(`Server started at ${serverUrl}`)
        resolve({ process: serverProcess, url: serverUrl })
      }
    })

    serverProcess.stderr.on('data', (data) => {
      console.error('Server error:', data.toString())
    })

    setTimeout(() => {
      if (!serverUrl) {
        serverProcess.kill()
        reject(new Error('Server failed to start within 10 seconds'))
      }
    }, 10000)
  })
}

async function takeScreenshots(serverUrl) {
  const browser = await chromium.launch()

  try {
    // Desktop screenshot
    const desktopPage = await browser.newPage({
      viewport: { width: 1280, height: 720 },
    })
    await desktopPage.goto(serverUrl)
    await desktopPage.waitForLoadState('networkidle')

    const desktopScreenshot = await desktopPage.screenshot({
      fullPage: false,
      type: 'png',
    })
    writeFileSync(join(publicDir, 'screenshot-desktop.png'), desktopScreenshot)
    console.log('Generated: screenshot-desktop.png (1280x720)')

    // Mobile screenshot
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
    })
    await mobilePage.goto(serverUrl)
    await mobilePage.waitForLoadState('networkidle')

    const mobileScreenshot = await mobilePage.screenshot({
      fullPage: false,
      type: 'png',
    })
    writeFileSync(join(publicDir, 'screenshot-mobile.png'), mobileScreenshot)
    console.log('Generated: screenshot-mobile.png (390x844)')
  } finally {
    await browser.close()
  }
}

// Generate all required icons and screenshots
async function main() {
  console.log('Generating PWA icons and screenshots...')

  try {
    // Generate icons first
    await generateIcon(144, 'icon-144.png', '#ffffff', 24)
    await generateIcon(192, 'icon-192.png', '#ffffff', 32)
    await generateIcon(512, 'icon-512.png', '#ffffff', 80)

    // Start server and take real screenshots
    console.log('Starting server for screenshots...')
    const server = await startServer()

    try {
      // Wait a bit for server to be fully ready
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('Taking real screenshots...')
      await takeScreenshots(server.url)
    } finally {
      // Stop server
      console.log('Stopping server...')
      server.process.kill()
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    console.log('✅ All PWA assets generated successfully!')
  } catch (error) {
    console.error('❌ Error generating assets:', error)
    process.exit(1)
  }
}

main()
