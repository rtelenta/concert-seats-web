## MODIFIED Requirements

### Requirement: Selected seats summary is displayed
The page SHALL display a persistent summary bar showing the count of selected seats, the total price, and a "Hold Seats" button. The button SHALL be disabled when no seats are selected or when a hold request is in progress. When the hold mutation succeeds or fails, the summary bar SHALL reflect the resulting state.

#### Scenario: Summary updates on selection
- **WHEN** the user selects or deselects seats
- **THEN** the summary shows the correct count and total (sum of `price` for each selected seat)

#### Scenario: No seats selected
- **WHEN** no seats are selected
- **THEN** the summary shows 0 seats and $0 total, and the "Hold Seats" button is disabled

#### Scenario: Hold request in progress
- **WHEN** the user clicks "Hold Seats" and the request is in flight
- **THEN** the "Hold Seats" button shows a loading indicator and is disabled

#### Scenario: Hold request fails
- **WHEN** the backend returns an error for the hold request
- **THEN** an error message is shown in the summary bar and the button returns to its clickable state
