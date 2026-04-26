#!/usr/bin/env node
/**
 * Deploy built dist/ contents to repo root on main branch
 * Usage: node deploy-root.js
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const distDir = path.join(__dirname, 'dist')

// 1. Build everything first
console.log('🔨 Building all projects...')
try {
  execSync('node build-all.js', { cwd: __dirname, stdio: 'inherit' })
} catch (e) {
  console.error('❌ Build failed')
  process.exit(1)
}

// 2. Copy dist/ contents to repo root
console.log('\n📦 Copying dist/ contents to repo root...')
const entries = fs.readdirSync(distDir, { withFileTypes: true })

for (const entry of entries) {
  const src = path.join(distDir, entry.name)
  const dest = path.join(__dirname, entry.name)

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true })
  }

  if (entry.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    fs.cpSync(src, dest, { recursive: true, force: true })
  } else {
    fs.copyFileSync(src, dest)
  }
  console.log(`  ✅ ${entry.name}`)
}

// 3. Git commit and push
console.log('\n🚀 Pushing to main branch...')
execSync('git add .', { cwd: __dirname, stdio: 'inherit' })

try {
  execSync('git commit -m "Deploy built site to root"', { cwd: __dirname, stdio: 'inherit' })
} catch (e) {
  // No changes to commit
  console.log('  ⚠️  No changes to commit')
}

execSync('git push origin main', { cwd: __dirname, stdio: 'inherit' })

console.log('\n✅ Deployed successfully!')
console.log('   Wait 1-3 minutes, then visit:')
console.log('   https://YOUR_USERNAME.github.io/Web-React.js/')
