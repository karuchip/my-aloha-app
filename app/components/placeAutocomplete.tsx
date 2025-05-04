"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script" // ← 追加！

type Props = {
  onSelectPlace: (lat: number, lng: number, placeName: string) => void,
  defaultPlace: string | null
}

const PlaceAutocomplete = ({ onSelectPlace, defaultPlace }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [place, setPlace] = useState<string | null>("")

  useEffect(() => {
    if (!window.google || !loaded) return
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!, {
        types: ["geocode"],
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        if (place.geometry) {
          const lat = place.geometry.location.lat()
          const lng = place.geometry.location.lng()
          const name = place.formatted_address || place.name || ""
          onSelectPlace(lat, lng, name)
          setPlace(name)
        } else if (inputRef.current) {
          const name = inputRef.current.value
          onSelectPlace(NaN, NaN, name)
          setPlace(name)

        }
      })
    }
  }, [loaded])

  useEffect(() => {
    setPlace(defaultPlace)
  }, [defaultPlace])

  return (
    <>
      {/* Google Maps APIのスクリプトをここで読み込む */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="場所を検索"
          style={{width: "500px", height: "30px"}}
          value={place ?? ""}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
    </>
  )
}

export default PlaceAutocomplete
