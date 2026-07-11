# QueueSmart – Front End (Assignment 2)

COSC 4353 Group 8

Front-end implementation of the QueueSmart smart queue management app. This assignment is UI/UX only — there is no backend. All data is mocked and stored in the browser's localStorage so the app feels interactive between pages.

## How to run

No build step needed. Either:

1. Open `index.html` directly in a browser (opening in edge should mainly work) , or
2. Run a simple local server from the project folder:
   ```
   python -m http.server 8000
   ```
   then go to http://localhost:8000

## Demo accounts

| Role  | Email          | Password  |
|-------|----------------|-----------|
| User  | user@demo.com  | user1234  |
| Admin | admin@demo.com | admin1234 |

You can also register a new account (registered accounts are user-role and stored in localStorage).

## Pages

| File                  | Screen                                    |
|-----------------------|-------------------------------------------|
| index.html            | Login                                     |
| register.html         | Registration                              |
| dashboard.html        | User dashboard                            |
| join-queue.html       | Join queue                                |
| queue-status.html     | Queue status (position, wait, updates)    |
| history.html          | Past queues                               |
| admin-dashboard.html  | Admin dashboard (open/close queues)       |
| admin-services.html   | Service management (create/edit)          |
| admin-queues.html     | Queue management (reorder/remove/serve)   |

## Notes

- Client-side validation on login, registration, and the service form (required fields, email format, max lengths, number ranges).
- In-app notifications live under the bell icon in the navbar.
- The "Simulate update" button on the queue status page stands in for real-time backend updates coming in Assignment 3.
- To reset all mock data, clear the site's localStorage in your browser dev tools.
