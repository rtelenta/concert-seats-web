## Purpose

Defines the seat hold capability, covering how authenticated users submit a hold request for selected seats via the seat selection page.

## Requirements

### Requirement: Authenticated users can hold selected seats
The seat selection page SHALL provide a "Hold Seats" action that sends `POST /shows/:id/seats/hold` with `{ "seatIds": string[] }` to the backend. The request SHALL include an `Authorization: Bearer <token>` header where the token is retrieved from Clerk's `useAuth().getToken()`.

#### Scenario: Successful hold
- **WHEN** the user clicks "Hold Seats" with one or more seats selected
- **THEN** a POST request is sent to `/shows/:id/seats/hold` with the selected seat IDs and a valid Clerk bearer token in the Authorization header

#### Scenario: Hold request in progress
- **WHEN** the hold request is in flight
- **THEN** the "Hold Seats" button shows a loading state and is disabled to prevent duplicate submissions

#### Scenario: Hold request fails
- **WHEN** the backend returns an error response
- **THEN** an error message is displayed in the summary bar and the button returns to its default state

#### Scenario: No seats selected
- **WHEN** the user has no seats selected
- **THEN** the "Hold Seats" button is disabled and no request is sent

#### Scenario: Token retrieval failure
- **WHEN** `getToken()` returns null (user session expired)
- **THEN** the request is not sent and an error message prompts the user to sign in again
