# Portfolio Backend API

Backend server for the React Portfolio application, built with Express.js.

## Features

- ✅ Contact form submission endpoint
- ✅ Message storage (JSON file-based)
- ✅ Optional email notifications
- ✅ CORS enabled for frontend integration
- ✅ Input validation
- ✅ Error handling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development

# Optional: Email Configuration
EMAIL_ENABLED=false
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

### Running the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` (or the PORT specified in your `.env` file).

## API Endpoints

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect!"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### GET /api/contact
Get all contact messages (for admin purposes).

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello!",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /api/health
Health check endpoint.

**Response (200):**
```json
{
  "status": "OK",
  "message": "Backend server is running"
}
```

## Email Configuration (Optional)

To enable email notifications:

1. Set `EMAIL_ENABLED=true` in your `.env` file
2. Configure your email service:
   - **Gmail**: Use an App Password (not your regular password)
     - Go to Google Account → Security → 2-Step Verification → App passwords
   - **Other services**: Update `EMAIL_SERVICE` and credentials accordingly
3. Set `RECIPIENT_EMAIL` to the email where you want to receive notifications

The backend will send:
- A notification email to you when someone submits the contact form
- (Optional) An auto-reply to the person who submitted the form

## Project Structure

```
backend/
├── controllers/        # Request handlers
│   └── contactController.js
├── models/            # Data models
│   └── Contact.js
├── routes/            # API routes
│   └── contact.js
├── services/          # Business logic services
│   └── emailService.js
├── data/              # JSON file storage (auto-created)
│   └── contacts.json
├── server.js          # Main server file
├── package.json       # Dependencies
└── .env               # Environment variables (create from .env.example)
```

## Data Storage

Currently, contact messages are stored in a JSON file (`data/contacts.json`). This is suitable for development and small-scale deployments.

For production, consider migrating to a proper database:
- MongoDB
- PostgreSQL
- MySQL
- SQLite

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `EMAIL_ENABLED` | Enable email notifications | false | No |
| `EMAIL_SERVICE` | Email service provider | gmail | No* |
| `EMAIL_USER` | Email account username | - | No* |
| `EMAIL_PASSWORD` | Email account password/app password | - | No* |
| `RECIPIENT_EMAIL` | Email to receive notifications | EMAIL_USER | No* |

*Required if `EMAIL_ENABLED=true`

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:3000` (default React dev server)
- Any origin (configured in `server.js`)

For production, update the CORS configuration to only allow your frontend domain.

## Error Handling

The backend includes comprehensive error handling:
- Input validation
- Email validation
- Server error handling
- Graceful error responses

## Development Tips

1. Use `npm run dev` during development for auto-reload
2. Check the console for detailed error messages
3. Contact messages are stored in `backend/data/contacts.json`
4. To view messages, use the GET endpoint or check the JSON file directly

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, change the `PORT` in your `.env` file.

### Email Not Sending
- Verify `EMAIL_ENABLED=true`
- Check email credentials are correct
- For Gmail, ensure you're using an App Password, not your regular password
- Check console logs for specific error messages

### CORS Errors
- Ensure the backend is running
- Check the API URL in your frontend `.env` file matches the backend port
- Verify CORS is enabled in `server.js`

## License

This project is private and for personal use.
