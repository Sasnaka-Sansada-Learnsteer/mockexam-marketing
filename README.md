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
- **Build Tool**: CRACO (Create React App Configuration Override)
- **Backend API**: Node.js/Express (Heroku hosted)

## 📁 Project Structure

```
src/
├── App.js                 # Main app with routing configuration
├── App.css               # Global app styles
├── components/           # Marketing site components
│   ├── HeroSection.jsx   # Main hero section with CTA
│   ├── ExamInfo.jsx      # Exam details and information
│   ├── ExamTimetable.jsx # Exam schedule display
│   ├── Stats.jsx         # Live statistics
│   ├── ExamCenter.jsx    # Exam center information
│   ├── RemainingSeats.jsx # Available seats counter
│   ├── CountdownRegister.jsx # Registration countdown
│   ├── MyExamInfoEntry.jsx # Candidate info entry
│   ├── NavBar.jsx        # Navigation component
│   ├── Footer.jsx        # Site footer
│   ├── PopupNotification.jsx # System notifications
│   └── FloatingWhatsApp.jsx # WhatsApp integration
├── components_mysme/     # User management components
│   ├── Login.js          # Candidate login system
│   ├── Profile.js        # Candidate profile management
│   ├── AdminLogin.js     # Admin authentication
│   ├── AdminDashboard.js # Admin panel with candidate management
│   └── CandidateCard.js  # Candidate information display
├── config/
│   └── api.js           # API configuration and endpoints
└── styles/
    ├── admin.css        # Admin panel styles
    └── CandidateCard.css # Candidate card styling
```

## 🔗 Routes

### Public Routes
- `/` - Main marketing landing page
- `/login` - Candidate login portal
- `/profile` - Candidate profile (protected)

### Admin Routes
- `/admin` - Redirects to admin login
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin panel with candidate management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd almockexam-marketing-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=https://sme-api-04db435264b2.herokuapp.com
REACT_APP_WHATSAPP_NUMBER=94703445342
```

### API Configuration
The app connects to a backend API hosted on Heroku. Key endpoints:
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Admin dashboard data
- `POST /api/candidates/login` - Candidate authentication
- `GET /api/candidates/profile` - Candidate profile data

## 🎨 Features

### Marketing Site
- **Responsive Design** - Mobile-first approach
- **Live Statistics** - Real-time exam registration counts
- **Countdown Timer** - Registration deadline tracking
- **Exam Information** - Comprehensive exam details
- **Center Locations** - Interactive exam center display
- **WhatsApp Integration** - Direct communication channel

### Admin Panel
- **Secure Authentication** - Panel ID-based login system
- **Candidate Management** - View assigned candidates
- **Real-time Data** - Live candidate information updates
- **Responsive Dashboard** - Mobile-friendly admin interface

### Candidate Portal
- **Profile Management** - Personal information updates
- **Exam Details** - Personalized exam information
- **Secure Access** - Authentication-protected areas

## 🛠️ Technical Details

### Webpack 5 Compatibility
The project uses CRACO to handle Node.js polyfills required for webpack 5:
- Buffer, crypto, stream, path, and other Node.js modules
- Proper fallback configuration for browser compatibility

### State Management
- React Hooks (useState, useEffect)
- Local storage for authentication tokens
- Context-free architecture for simplicity

### Styling Architecture
- Component-scoped CSS files
- Responsive design patterns
- CSS Grid and Flexbox layouts

## 🔍 Troubleshooting

### Common Issues

1. **Webpack Module Resolution Errors**
   - Ensure CRACO is properly configured
   - Check that all polyfill packages are installed
   - Verify craco.config.js settings

2. **API Connection Issues**
   - Check backend server status
   - Verify API endpoints in network tab
   - Ensure CORS is properly configured

3. **Authentication Problems**
   - Clear browser local storage
   - Check token expiration
   - Verify API responses in console

### Build Issues
If you encounter build problems:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building with verbose output
npm run build --verbose
```

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Vercel Deployment
The site is configured for Vercel deployment with:
- Automatic builds from main branch
- Environment variable configuration
- Analytics integration

### Manual Deployment
```bash
npm run build
# Deploy build/ directory to your hosting service
```

## 📝 API Integration

### Admin Dashboard Data Flow
1. Admin logs in with Panel ID
2. Token stored in localStorage
3. Dashboard fetches assigned candidates
4. Real-time updates via API calls

### Error Handling
- Network error recovery
- Token refresh mechanisms
- User-friendly error messages
- Console logging for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or questions:
- WhatsApp: +94 70 344 5342
- Email: Contact through the website

---

**Last Updated**: August 2025
