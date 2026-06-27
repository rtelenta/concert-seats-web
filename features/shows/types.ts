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
