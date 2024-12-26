# 📝 SnapJournal

## 🌟 Overview
SnapJournal is a web application that enables users to create and manage personal journals with photos. This application covers photo-based records to keep memories and enhances the user experience by utilizing data such as location information.

## 🥅 Goals
- Develop a user-friendly platform where users can easily upload photos, extract metadata, and create personal journals.
- Visualize user-recorded data more meaningfully through emotion tags and statistics.
- Provide a distinctive and creative user experience with the unique Snap Board interface.

## 🔑 Key Features
1. **Photo Upload and Metadata Extraction**  
    - Users can upload photos, and metadata such as GPS coordinates, capture date, and time will be automatically extracted and stored.

2. **Journal Creation and Management**
    - Users can create and manage journals that include a title, content, and photos.
    - Automatically include location information in journals by utilizing photo metadata.

3. **User Authentication and Access Control**
    - *SNS Login*: Allow quick login via Google and Facebook accounts.
    - *Local Login*: Enable sign-up and login using email, password.
    - *Email Verification*: Send an email verification link during local sign-up to activate accounts.

4. **Snap Board**
    - A special Polaroid-style journal writing interface.

5. **Emotion Tags**
    - Add emotion tags while creating journals and provide monthly emotion statistics.
    - Filter journal entries by specific emotions.

6. **Statics and Analysis**
    - Provide user statistics on photos and journal entries.


## ⚒️ Tech Stack
- **Frontend**: Next.js, TailwindCSS
- **Backend**: Express.js, MongoDB
- **Authentication**: JWT, OAuth2 (Google, Facebook)
- **Email Service**: Nodemailer + Gmail API
