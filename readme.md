# Fun Compatibility Calculator

🎲 A fun web application to calculate a “compatibility” score between two names, with real-time admin analytics and persistent storage using SQLite.

---

## Features

### Client
- Enter two names and calculate a random compatibility percentage (10–95%).  
- Animated loading bar during calculation.  
- Recent history of last 5 results stored per user in browser.  
- Unique user token to identify users across sessions.  
- Beautiful responsive UI with background image.

### Admin
- Real-time analytics of active users and total visitors.  
- Table displaying all results: User ID, Name 1, Name 2, Result, Timestamp.  
- Clickable rows to view details in a modal.  
- Works for multiple users concurrently.  
- Data is persisted in SQLite (`data.db`) across server restarts.  

### Backend
- Node.js + Express server.  
- Socket.IO for real-time updates on the admin dashboard.  
- SQLite database for persistent storage.  
- Automatically fixes old databases by adding missing `userToken` column if necessary.

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/fun-calculator.git
cd fun-calculator
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
node server.js
```

4. **Open in browser:**

- Client: [http://localhost:3000/client.html](http://localhost:3000/client.html)  
- Admin: [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## Folder Structure

```
fun-calculator/
│
├─ public/
│   ├─ client.html
│   ├─ client.css
│   ├─ client.js
│   ├─ admin.html
│   ├─ admin.css
│   └─ admin.js
│
├─ data.db
└─ server.js
```

---

## Usage

1. Open the **client page** and enter two names.  
2. Click **Calculate** and see the animated result.  
3. The calculation and results are saved to the database automatically.  
4. Open the **admin page** to monitor all users and results in real-time.  

---

## Notes

- **Do not open `client.html` or `admin.html` via `file://`**, always access through `http://localhost:3000/...` to avoid fetch/CORS errors.  
- The project generates a **unique `userToken`** for each user to track results.  
- Works for multiple users simultaneously.  

---

## Dependencies

- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [Socket.IO](https://socket.io/)  
- [SQLite3](https://www.npmjs.com/package/sqlite3)

---

## License

This project is open-source under the MIT License.

