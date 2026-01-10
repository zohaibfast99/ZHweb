# Email Setup Instructions

## Important: Stop the Old Server First!

**You MUST stop the old `http-server` (running on port 3000) before starting the new Express server.**

Press `Ctrl+C` in the terminal where `http-server` is running, then follow the steps below.

## For Gmail (zh2technologies@gmail.com)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "ZH2 Website" as the name
   - Copy the generated 16-character password

3. **Set Email Password** - Choose one method:

   **Option A - Direct edit (Quickest):**
   - Edit `server.js` line 21
   - Replace `process.env.EMAIL_PASS || ''` with `'your_16_character_app_password'` (with quotes)

   **Option B - Environment variable (More secure):**
   - Create a `.env` file in the root directory
   - Add:
     ```
     EMAIL_USER=zh2technologies@gmail.com
     EMAIL_PASS=your_16_character_app_password
     ```

## Running the Server

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the Express server**:
   ```bash
   npm start
   ```

3. The server will run on port 3000
4. Open your website at http://localhost:3000

## Testing

Submit the contact form and check `zohaibrashid999@gmail.com` for the email.

