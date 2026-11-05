'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules'

// Base Swiper styles. Imported here (not via globals.css) because a bare
// `@import` only works at the very top of a stylesheet — mid-file it is
// invalid and silently dropped, which leaves slides stacked vertically.
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface CarouselSlide {
  _key?: string
  url?: string
  alt?: string
  caption?: string
}

interface Props {
  images: CarouselSlide[]
  caption?: string
}

/**
 * In-article image carousel for blog posts.
 * Base Swiper CSS is imported at the top of this file; the brand-green nav
 * and pagination accents live under `.nh-post-carousel` in globals.css.
 */

// Request a right-sized, modern-format image from the Sanity CDN rather than
// the raw full-res asset. 1400px covers 2x retina for the ~680px display cap;
// auto=format serves WebP/AVIF where supported; fit=max avoids upscaling.
function sized(url?: string): string | undefined {
  if (!url) return url
  if (!url.includes('cdn.sanity.io')) return url
  return `${url}?w=1400&auto=format&fit=max&q=80`
}

export default function PostCarousel({ images, caption }: Props) {
  const slides = (images ?? []).filter((img) => !!img?.url)
  if (slides.length === 0) return null

  return (
    <figure className="nh-post-carousel" style={{ margin: '36px 0' }}>
      <Swiper
        modules={[Navigation, Pagination, Keyboard, A11y]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        spaceBetween={0}
        slidesPerView={1}
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          border: '1.5px solid #c8dfd6',
          background: '#edf5f1',
        }}
      >
        {slides.map((img, i) => (
          <SwiperSlide key={img._key ?? i}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#edf5f1',
                padding: '12px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sized(img.url)}
                alt={img.alt ?? img.caption ?? `Slide ${i + 1}`}
                loading="lazy"
                style={{
                  width: 'auto',
                  maxWidth: '100%',
                  maxHeight: 'min(74vh, 680px)',
                  objectFit: 'contain',
                  borderRadius: 10,
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {caption && (
        <figcaption
          style={{
            fontSize: 13,
            color: '#9ca3af',
            textAlign: 'center',
            marginTop: 12,
            letterSpacing: '-0.1px',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
