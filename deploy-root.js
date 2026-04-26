#!/usr/bin/env node

import { execSync } from 'child_process'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

console.log('🔨 Building all projects...')
try {
  execSync('node build-all.js', { cwd: __dirname, stdio: 'inherit' })
} catch (e) {
  console.error('❌ Build failed')
  process.exit(1)
}

console.log('\n🚀 Deploying to gh-pages branch...')
try {
  execSync('npx gh-pages -d dist', { cwd: __dirname, stdio: 'inherit' })
} catch (e) {
  console.error('❌ Deploy failed')
  process.exit(1)
}

console.log('\n✅ Deployed successfully!')
console.log('   https://pavly111.github.io/Web-React.js/')