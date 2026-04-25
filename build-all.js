#!/usr/bin/env node
/**
 * Build orchestrator for Web-React.js portal + all sub-projects
 * Usage: node build-all.js
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const projectsDir = __dirname
const portalDir = __dirname
const distDir = path.resolve(portalDir, 'dist')
const stagingDir = path.resolve(portalDir, '.sub-dists')

const projects = [
  'calculator-app',
  'counter-app',
  'movie-app',
  'notes-app',
  'quiz-app',
  'todo-app',
  'weather-app',
]

// 1. Clean previous builds
console.log('🧹 Cleaning previous builds...')
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true })
}
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true })
}
fs.mkdirSync(stagingDir, { recursive: true })

// 2. Build each sub-project with correct base path, stage them
for (const project of projects) {
  const projectPath = path.join(projectsDir, project)
const basePath = `/Web-React.js/${project}/`

  console.log(`\n🔨 Building ${project} with base="${basePath}"...`)

  // Temporarily override vite.config.js base
  const viteConfigPath = path.join(projectPath, 'vite.config.js')
  const originalConfig = fs.readFileSync(viteConfigPath, 'utf8')

  const configWithBase = originalConfig.replace(
    /export\s+default\s+defineConfig\(\{/,
    `export default defineConfig({\n  base: '${basePath}',`
  )

  fs.writeFileSync(viteConfigPath, configWithBase)

  try {
    execSync('npm run build', { cwd: projectPath, stdio: 'inherit' })
  } catch (e) {
    console.error(`❌ Failed to build ${project}`)
    fs.writeFileSync(viteConfigPath, originalConfig)
    process.exit(1)
  }

  // Restore original config
  fs.writeFileSync(viteConfigPath, originalConfig)

  // Stage the build
  const projectDist = path.join(projectPath, 'dist')
  const stagedDist = path.join(stagingDir, project)

  if (fs.existsSync(projectDist)) {
    fs.mkdirSync(stagedDist, { recursive: true })
    copyDir(projectDist, stagedDist)
    console.log(`✅ ${project} staged`)
  } else {
    console.warn(`⚠️  No dist folder found for ${project}`)
  }
}

// 3. Build the portal app (this creates the dist/ folder)
console.log('\n🔨 Building portal app...')
execSync('npm run build', { cwd: portalDir, stdio: 'inherit' })

// 4. Copy staged sub-projects INTO portal's dist/
console.log('\n📦 Merging sub-projects into dist...')
for (const project of projects) {
  const stagedDist = path.join(stagingDir, project)
  const targetDist = path.join(distDir, project)

  if (fs.existsSync(stagedDist)) {
    fs.mkdirSync(targetDist, { recursive: true })
    copyDir(stagedDist, targetDist)
    console.log(`✅ ${project} → dist/${project}`)
  }
}

// 5. Clean up staging
fs.rmSync(stagingDir, { recursive: true })

console.log('\n✅ All builds complete!')
console.log(`📁 Output: ${distDir}`)
console.log('\nNext steps:')
console.log('  1. cd Web-React.js')
console.log('  2. npm run deploy')

// Helper: recursive copy
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
