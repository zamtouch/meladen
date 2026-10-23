import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

import { company, publicRoutes, stations } from '../src/content/site.ts'

test('company facts stay tied to the profile', () => {
  assert.equal(company.established, 2019)
  assert.equal(company.email, 'meladenenergy21@gmail.com')
  assert.equal(company.phones.length, 3)
  assert.equal(company.logisticsPartner, 'Nurani Transport')
})

test('four operating stations and two planned locations', () => {
  const operational = stations.filter((station) => station.status === 'operational')
  const planned = stations.filter((station) => station.status === 'planned')
  assert.deepEqual(operational.map((station) => station.slug), ['mwense', 'musangu', 'kabompo', 'chienge'])
  assert.deepEqual(planned.map((station) => station.slug), ['sesheke', 'solwezi'])
  const kabompo = stations.find((station) => station.slug === 'kabompo')
  assert.deepEqual(kabompo?.amenities, ['Supermarket', 'Bakery', 'Restaurant'])
  assert.equal(kabompo?.openedLabel, 'December 2025')
})

test('unverified station fields stay empty', () => {
  for (const station of stations) {
    assert.equal(station.address, null)
    assert.equal(station.phone, null)
    assert.equal(station.hours, null)
    assert.equal(station.latitude, null)
    assert.equal(station.longitude, null)
    assert.equal(station.productsNote, null)
  }
})

test('the public site has exactly seven pages', () => {
  const root = path.resolve('src/app/(frontend)')
  const pages: string[] = []
  const walk = (dir: string, prefix: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full, `${prefix}/${entry.name}`)
      if (entry.name === 'page.tsx') pages.push(prefix || '/')
    }
  }
  walk(root, '')
  assert.deepEqual(pages.sort(), [...publicRoutes].sort())
})

test('public copy does not invent hours, prices or a six-station network', () => {
  const files = [
    'src/content/site.ts',
    'src/content/copy.ts',
    'src/app/(frontend)/page.tsx',
    'src/app/(frontend)/about/page.tsx',
    'src/app/(frontend)/solutions/page.tsx',
    'src/app/(frontend)/stations/page.tsx',
    'src/app/(frontend)/responsibility/page.tsx',
  ]
  const banned = ['24/7', 'PACRA', 'TPIN', 'six operational', 'ZMW']
  for (const file of files) {
    const text = fs.readFileSync(path.resolve(file), 'utf8')
    for (const phrase of banned) assert.equal(text.includes(phrase), false, `${file} contains ${phrase}`)
  }
})
