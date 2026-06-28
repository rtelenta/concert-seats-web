export type Show = {
  id: string
  title: string
  artist: string
  dateTime: string
  status: "PUBLISHED" | "DRAFT"
  venueId: string
  createdAt: string
  updatedAt: string
}

export type Venue = {
  id: string
  name: string
  city: string
  capacity: number
}

export type ShowWithVenue = Show & { venue: Venue | null }

export type Seat = {
  seatId: string
  showId: string
  seatDefinitionId: string
  section: string
  row: string
  number: number
  price: number
  status: "AVAILABLE" | "HELD" | "SOLD"
  heldBy: string | null
  heldUntil: string | null
  version: number
  createdAt: string
}
