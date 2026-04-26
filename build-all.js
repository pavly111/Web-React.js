#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const distDir = path.resolve(__dirname, 'dist')
const stagingDir = path.resolve(__dirname, '.sub-dists')

const projects = [
  'calculator-app',
  'counter-app',
  'movie-app',
  'notes-app',
  'quiz-app',
  'todo-app',
  'weather-app',
]

console.log('🧹 Cleaning previous builds...')
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true })
if (fs.existsSync(stagingDir)) fs.rmSync(stagingDir, { recursive: true })
fs.mkdirSync(stagingDir, { recursive: true })

for (const project of projects) {
  const projectPath = path.join(__dirname, project)

  if (!fs.existsSync(projectPath)) {
    console.warn(`⚠️  Skipping ${project} — folder not found`)
    continue
  }

  console.log(`\n🔨 Building ${project}...`)

  try {
    execSync('npm install --silent', { cwd: projectPath, stdio: 'inherit' })
    execSync('npm run build', { cwd: projectPath, stdio: 'inherit' })
  } catch (e) {
    console.error(`❌ Failed to build ${project}`)
    process.exit(1)
  }

  const projectDist = path.join(projectPath, 'dist')
  const stagedDist = path.join(stagingDir, project)

  if (fs.existsSync(projectDist)) {
    fs.mkdirSync(stagedDist, { recursive: true })
    copyDir(projectDist, stagedDist)
    console.log(`✅ ${project} staged`)
  } else {
    console.warn(`⚠️  No dist/ found for ${project} after build`)
  }
}

console.log('\n🔨 Building portal app...')
execSync('npm run build', { cwd: __dirname, stdio: 'inherit' })

console.log('\n📦 Merging sub-projects into dist/...')
for (const project of projects) {
  const stagedDist = path.join(stagingDir, project)
  const targetDist = path.join(distDir, project)

  if (fs.existsSync(stagedDist)) {
    fs.mkdirSync(targetDist, { recursive: true })
    copyDir(stagedDist, targetDist)
    console.log(`  ✅ dist/${project}`)
  }
}

fs.rmSync(stagingDir, { recursive: true })

console.log('\n✅ All builds complete!')
console.log(`📁 Output: ${distDir}`)
console.log('\nNow run:  npm run deploy')

function copyDir(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
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