'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { pendingLabel, type StationStatus } from '@/content/site'
import type { PublicStation } from '@/lib/content'
import { track, TrackedLink } from '@/components/Track'

const statusLabel: Record<StationStatus, string> = {
  operational: 'Operating',
  planned: 'Planned',
  'temporarily-unavailable': 'Temporarily unavailable',
}

function directionsFor(station: PublicStation) {
  if (station.status !== 'operational') return null
  if (typeof station.latitude === 'number' && typeof station.longitude === 'number') {
    return `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`
  }
  if (station.address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`
  }
  return null
}

export function StationsBoard({ stations }: { stations: PublicStation[] }) {
  const params = useSearchParams()
  const [status, setStatus] = useState(params.get('status') || 'all')
  const [province, setProvince] = useState(params.get('province') || 'all')
  const [amenity, setAmenity] = useState(params.get('amenity') || 'all')
  const initial = params.get('station')

  const provinces = useMemo(
    () => Array.from(new Set(stations.map((station) => station.province))).sort(),
    [stations],
  )
  const amenities = useMemo(
    () => Array.from(new Set(stations.flatMap((station) => station.amenities))).sort(),
    [stations],
  )

  const filtered = stations.filter((station) => {
    if (status !== 'all' && station.status !== status) return false
    if (province !== 'all' && station.province !== province) return false
    if (amenity === 'any' && station.amenities.length === 0) return false
    if (amenity !== 'all' && amenity !== 'any' && !station.amenities.includes(amenity)) return false
    return true
  })

  const operating = filtered.filter((station) => station.status === 'operational')
  const planned = filtered.filter((station) => station.status === 'planned')
  const paused = filtered.filter((station) => station.status === 'temporarily-unavailable')
  const grouped = status === 'all' && amenity === 'all'

  return (
    <div>
      <form className="filters" onSubmit={(event) => event.preventDefault()}>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="operational">Operating</option>
            <option value="planned">Planned</option>
            <option value="temporarily-unavailable">Temporarily unavailable</option>
          </select>
        </label>
        <label>
          Province
          <select value={province} onChange={(event) => setProvince(event.target.value)}>
            <option value="all">All provinces</option>
            {provinces.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Amenity
          <select value={amenity} onChange={(event) => setAmenity(event.target.value)}>
            <option value="all">All amenities</option>
            <option value="any">Has a confirmed amenity</option>
            {amenities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </form>
      <p className="result-count" aria-live="polite">
        {filtered.length === 0 ? 'No stations match those filters.' : `${filtered.length} location${filtered.length === 1 ? '' : 's'}`}
      </p>
      {grouped ? (
        <>
          <StationGroup id="operating" title="Operating stations" stations={operating} initial={initial} />
          <StationGroup id="planned" title="Planned developments" stations={planned} initial={initial} note="These locations are planned. They are not open, and directions are not offered." />
          {paused.length ? <StationGroup id="paused" title="Temporarily unavailable" stations={paused} initial={initial} /> : null}
        </>
      ) : (
        <StationGroup id="results" title="Matching locations" stations={filtered} initial={initial} />
      )}
    </div>
  )
}

function StationGroup({
  id,
  title,
  stations,
  initial,
  note,
}: {
  id: string
  title: string
  stations: PublicStation[]
  initial: string | null
  note?: string
}) {
  if (!stations.length) return null
  return (
    <section className="station-group" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{title}</h2>
      {note ? <p className="lede">{note}</p> : null}
      <div className="station-list">
        {stations.map((station) => <StationCard key={station.slug} station={station} startOpen={initial === station.slug} />)}
      </div>
    </section>
  )
}

function StationCard({ station, startOpen }: { station: PublicStation; startOpen: boolean }) {
  const directions = directionsFor(station)
  return (
    <article className={`station-card is-${station.status}`} id={`station-${station.slug}`}>
      <details
        open={startOpen || undefined}
        onToggle={(event) => {
          if (event.currentTarget.open) track('station_selected', { station: station.slug })
        }}
      >
        <summary>
          <span>
            <strong>{station.name}</strong>
            <em>{station.province} Province</em>
          </span>
          <span className="station-meta">
            <b className={`status-pill is-${station.status}`}>{statusLabel[station.status]}</b>
            <span className="expand-mark" aria-hidden="true" />
          </span>
        </summary>
        <div className="station-body">
          {station.photo ? <img src={station.photo.url} alt={station.photo.alt} /> : null}
          <p>{station.summary}</p>
          <dl>
            <div>
              <dt>Opened</dt>
              <dd>{station.openedLabel || (station.status === 'planned' ? 'Not operating' : pendingLabel)}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{station.address || pendingLabel}</dd>
            </div>
            <div>
              <dt>Telephone</dt>
              <dd>
                {station.phone ? (
                  <TrackedLink href={`tel:${station.phone.replace(/\s/g, '')}`} event="phone_clicked" params={{ station: station.slug }}>
                    {station.phone}
                  </TrackedLink>
                ) : pendingLabel}
              </dd>
            </div>
            <div>
              <dt>Opening hours</dt>
              <dd>{station.hours || pendingLabel}</dd>
            </div>
            <div>
              <dt>Products at this station</dt>
              <dd>{station.productsNote || pendingLabel}</dd>
            </div>
            <div>
              <dt>Amenities</dt>
              <dd>{station.amenities.length ? station.amenities.join(', ') : pendingLabel}</dd>
            </div>
          </dl>
          {station.status === 'planned' ? (
            <p className="pending-note">This location is planned and is not an operating station. Directions are not available.</p>
          ) : directions ? (
            <TrackedLink className="button forest" href={directions} event="directions_clicked" params={{ station: station.slug }} external>
              Directions
            </TrackedLink>
          ) : (
            <p className="pending-note">Directions will be published once the location is verified.</p>
          )}
          {station.status === 'temporarily-unavailable' ? (
            <p className="pending-note">This station is marked temporarily unavailable.</p>
          ) : null}
        </div>
      </details>
    </article>
  )
}
