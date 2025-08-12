# AL Mock Exam Marketing Site

A comprehensive React-based marketing website for AL Mock Examinations with integrated candidate management and admin panel features.

## 🚀 Project Overview

This is a full-featured marketing site built with React that includes:
- **Marketing Landing Page** - Exam information, statistics, timetables, and registration
- **Candidate Portal** - Student login and profile management
- **Admin Dashboard** - Administrative panel for exam management with candidate assignment features

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM v6
- **Styling**: CSS3 with component-specific stylesheets
- **Analytics**: Vercel Analytics & Speed Insights
- **HTTP Client**: Axios
- **Build Tool**: React Scripts with webpack 5
- **Backend API**: Node.js/Express (Heroku hosted)

## 📁 Project Structure

```
src/
├── App.js                 # Main app with routing configuration
├── App.css                # Global app styles
├── components/            # Marketing site components
│   ├── HeroSection.jsx    # Main hero section with CTA
│   ├── ExamInfo.jsx       # Exam details and information
│   ├── ExamTimetable.jsx  # Exam schedule display
│   └── ...
├── components_mysme/      # Admin and candidate management components
│   ├── AdminDashboard.js  # Admin dashboard for candidate management
│   ├── CandidateCard.js   # Card component for displaying candidate details
│   └── ...
```

## ⚙️ Recent Updates

- **Fixed Participation Confirmation UI**: Replaced checkboxes with radio buttons in CandidateCard.js to properly handle participation confirmation states (true/false/null)
- **Page Reload After Update**: Added functionality to reload the dashboard after successful candidate updates

## 🚨 Known Issues

- **Webpack 5 Polyfill Warnings**: When running in development mode, you might see warnings about missing Node.js core modules like zlib, path, crypto, etc. These are warnings from webpack 5, which no longer includes polyfills for these modules by default.

## 💡 Solutions for Webpack 5 Polyfill Warnings

To resolve the webpack 5 polyfill warnings, you can use one of these approaches:

1. **Ignore the warnings** - These warnings do not affect the functionality of the application.

2. **Install and configure polyfills** - If you need to use these Node.js modules:
   ```bash
   npm install --save-dev buffer crypto-browserify stream-browserify path-browserify querystring-es3 url browserify-zlib stream-http process
   ```
   
   Then create a `webpack.config.js` file in the root directory:
   ```javascript
   module.exports = {
     resolve: {
       fallback: {
         "zlib": require.resolve("browserify-zlib"),
         "querystring": require.resolve("querystring-es3"),
         "path": require.resolve("path-browserify"),
         "crypto": require.resolve("crypto-browserify"),
         "stream": require.resolve("stream-browserify"),
         "http": require.resolve("stream-http"),
         "url": require.resolve("url"),
         "util": require.resolve("util"),
         "buffer": require.resolve("buffer")
       }
     }
   };
   ```

3. **Use empty modules** - If you don't need these Node.js modules:
   ```javascript
   module.exports = {
     resolve: {
       fallback: {
         "zlib": false,
         "querystring": false,
         "path": false,
         "crypto": false,
         "stream": false,
         "http": false,
         "url": false,
         "util": false,
         "buffer": false
       }
     }
   };
   ```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```
