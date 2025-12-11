# MICM Learning Management System

A comprehensive Learning Management System (LMS) built for the Morris Isaacson Centre for Music (MICM), an after-school program in Soweto, South Africa, serving 340 students aged 4-18.

## 🎵 Features

### Core Functionality
- **User Management**: Role-based access control (Students, Teachers, Admins, Parents)
- **Course Management**: Create and manage courses for instruments, theory, and ensembles
- **Assessment System**: Quizzes, audio/video submissions, and rubric-based grading
- **Inventory Management**: Track and manage musical instrument borrowing
- **Communication**: Messaging, announcements, and forums
- **Analytics & Reporting**: Progress tracking, attendance, and resource usage analytics
- **Practice Tracker**: Timer-based practice session tracking with goals
- **Sheet Music Library**: Searchable repository of sheet music

### Music-Specific Features
- Audio/video upload and assessment
- Sheet music viewer and download
- Instrument inventory with borrowing system
- Practice logs and progress tracking
- Ensemble scheduling
- Student portfolios

### Design & Accessibility
- Modern, minimalist UI with musical design elements
- Responsive design for mobile, tablet, and desktop
- WCAG 2.1 accessibility compliance
- Screen reader support
- Keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MICM
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Demo Accounts

For testing the UI, you can use these mock accounts:

- **Teacher**: `teacher@micm.co.za` / `password`
- **Student**: `student@micm.co.za` / `password`
- **Admin**: `admin@micm.co.za` / `password`

## 📁 Project Structure

```
MICM/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Layout/         # Layout components (Header, Sidebar)
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── pages/              # Page components
│   │   ├── Auth/          # Authentication pages
│   │   ├── Dashboard/     # Dashboard pages (role-based)
│   │   ├── Courses/       # Course management
│   │   ├── Inventory/     # Instrument inventory
│   │   ├── Assessments/   # Assessment management
│   │   ├── Communication/ # Messaging and forums
│   │   ├── Analytics/     # Analytics and reports
│   │   ├── PracticeTracker/ # Practice session tracking
│   │   ├── SheetMusic/    # Sheet music library
│   │   └── Profile/       # User profile
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md             # This file
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## 🔐 Authentication (Current State)

Currently, the app uses mock authentication for UI testing. The authentication context is set up to easily integrate with Firebase Authentication when you're ready to connect the backend.

### Firebase Integration (Future)

To integrate Firebase:

1. Install Firebase SDK:
   ```bash
   npm install firebase
   ```

2. Create a Firebase project and add your config to `src/config/firebase.ts`

3. Update `src/contexts/AuthContext.tsx` to use Firebase Auth instead of mock authentication

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Screen reader compatible
- WCAG 2.1 AA compliance

## 🎨 Design System

### Colors
- **Primary**: Blue (#0073e6) - Main actions and branding
- **Secondary**: Teal (#00a68c) - Accent elements
- **Accent**: Orange (#ffa41a) - Highlights and alerts

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

## 🚧 Future Backend Integration

This frontend is prepared for Firebase backend integration:

1. **Firebase Authentication**: User login and registration
2. **Firestore Database**: Store courses, users, assessments, etc.
3. **Firebase Storage**: Upload audio/video files and sheet music
4. **Cloud Functions**: Server-side logic for complex operations

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Testing the UI

1. Start the development server
2. Navigate to the login page
3. Use one of the demo accounts to log in
4. Explore different features based on your role:
   - **Students**: Dashboard, Courses, Practice Tracker, Assessments
   - **Teachers**: All student features + Analytics, Course Creation
   - **Admins**: Full access to all features

## 📄 License

This project is proprietary software for the Morris Isaacson Centre for Music.

## 🤝 Contributing

This is a private project. For contributions, please contact the project maintainers.

## 📞 Support

For issues or questions, please contact the development team.

---

**Note**: This is the frontend-only version. Backend integration with Firebase will be added in a future phase.

