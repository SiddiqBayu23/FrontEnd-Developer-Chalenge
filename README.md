# OBE Dashboard - Frontend Developer Challenge

Dashboard untuk input nilai OBE (Outcome Based Education) yang dirancang khusus untuk BTIK UDINUS menggunakan Next.js 14+ dengan App Router, TypeScript, dan sistem autentikasi lengkap.

## 🎯 Overview

Aplikasi ini adalah sistem manajemen nilai akademik berbasis Outcome Based Education (OBE) yang dirancang khusus untuk dosen BTIK UDINUS. Sistem ini memungkinkan dosen untuk mengelola nilai mahasiswa dengan pendekatan OBE yang komprehensif, dilengkapi dengan sistem autentikasi lengkap dan antarmuka yang responsif.

## ✨ Core Features

### 1. Landing Page & Authentication System
- **UDINUS Portal Landing**: Halaman utama dengan desain portal UDINUS
- **Single Application Focus**: Hanya menampilkan OBE Dashboard sebagai aplikasi utama
- **Login Page**: Secure login dengan email dan password
- **Register Page**: Pendaftaran akun baru untuk dosen
- **Forgot Password**: Reset password melalui email
- **User Management**: Profile management dan logout functionality
- **Auth Guard**: Protected routes dengan automatic redirection
- **Session Persistence**: Login state tersimpan dengan Zustand persist

### 2. Class Overview Dashboard
- Card-based layout untuk easy scanning
- Quick access ke grade configuration dan student grades
- Summary statistics (total students, completion status)
- Responsive design untuk desktop dan tablet

### 5. Class Management
- **CRUD Operations**: Create, Read, Update, Delete kelas
- **Form Validation**: Input validation dengan error handling
- **Class Statistics**: Overview metrics dan progress tracking
- **Semester Management**: Dropdown selection untuk semester
- **Student Count Management**: Pengaturan jumlah mahasiswa per kelas

### 6. Reports & Analytics
- **Comprehensive Reports**: Overall statistics dan class performance
- **Data Visualization**: Charts untuk grade distribution dan performance
- **Export Functionality**: Download reports dalam format JSON
- **Print Support**: Print-friendly report layouts
- **Filter Options**: Filter berdasarkan kelas atau view all

### 3. Grade Component Configuration
- Setup persentase komponen nilai (Tugas, UTS, UAS, Proyek, Kuis)
- Konfigurasi kontribusi bab per komponen
- Real-time validation (total = 100%)
- Interactive sliders untuk easy adjustment

### 4. Student Grade Input
- Table-based input dengan mahasiswa sebagai rows
- Dynamic columns berdasarkan komponen dan bab
- Real-time grade calculation
- Input validation dan error messaging

### 5. Grade Calculation Display
- Live calculation sebagai user inputs grades
- Visual breakdown (component → bab contribution → final)
- Grade distribution charts
- Export functionality untuk reports

## 🛠 Technology Stack

- **Framework**: Next.js 14+ dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Material UI (MUI)
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Charts**: Recharts
- **Authentication**: Custom auth system dengan Zustand persist
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.0 atau lebih tinggi
- npm atau yarn

## 🚀 Installation & Setup

1. Clone repository
```bash
git clone <repository-url>
cd obe-dashboard-nextjs
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser di `http://localhost:3000/landing` untuk halaman utama
   Atau langsung ke `http://localhost:3000/auth` untuk login

## 🔐 Authentication

### Demo Credentials
Untuk testing aplikasi, gunakan credentials berikut:

**Dosen Account:**
- Email: `dosen@udinus.ac.id`
- Password: `password123`

**Admin Account:**
- Email: `admin@udinus.ac.id`
- Password: `password123`

### Features
- **Secure Login**: Email dan password authentication
- **Registration**: Pendaftaran akun baru dengan validasi
- **Forgot Password**: Reset password functionality (mock implementation)
- **Session Management**: Persistent login dengan automatic logout
- **Protected Routes**: Auth guard untuk semua halaman dashboard
- **User Profile**: Display user information di header

### Navigation Flow
1. **Landing Page** (`/landing`) - Portal UDINUS dengan akses ke OBE Dashboard
2. **Authentication** (`/auth`) - Login, register, atau forgot password
3. **Dashboard** (`/`) - Main dashboard setelah login berhasil

## 🏗 Project Structure

```
grade-management-ui/
├── src/
│   ├── app/                    # App router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── landing/           # Landing page
│   │   ├── classes/           # Class management
│   │   ├── configuration/     # Grade configuration
│   │   ├── grades/           # Grade input
│   │   ├── reports/          # Reports & analytics
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Dashboard page
│   ├── components/             # Reusable UI components
│   │   ├── Auth/             # Authentication components
│   │   ├── Auth/             # Authentication components
│   │   ├── Configuration/    # Configuration components
│   │   ├── Dashboard/        # Dashboard components
│   │   ├── Grades/          # Grade management components
│   │   └── Layout/          # Layout components
│   ├── lib/                    # Utilities and helpers
│   │   ├── store.ts          # Main app store (Zustand)
│   │   └── authStore.ts      # Authentication store
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   └── hooks/                  # Custom React hooks
├── public/                     # Static assets
├── docs/                       # Screenshots and guides
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md                   # Setup instructions & overview
```

### Detailed Structure

```
src/
├── components/
│   ├── Auth/
│   ├── Auth/
│   │   ├── AuthGuard.tsx
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ForgotPasswordForm.tsx
│   ├── Layout/
│   │   ├── AppLayout.tsx
│   │   ├── AppBar.tsx
│   │   └── Sidebar.tsx
│   ├── Dashboard/
│   │   ├── ClassCard.tsx
│   │   └── StatsCard.tsx
│   ├── Configuration/
│   │   └── ComponentConfiguration.tsx
│   └── Grades/
│       ├── GradeInputTable.tsx
│       └── GradeCalculationDisplay.tsx
├── app/
│   ├── layout.tsx
│   ├── landing/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── auth/
│   │   └── page.tsx
│   ├── classes/
│   │   └── page.tsx
│   ├── configuration/
│   │   └── page.tsx
│   ├── grades/
│   │   └── page.tsx
│   ├── classes/
│   └── reports/
│       └── page.tsx
├── lib/
│   ├── store.ts
│   └── authStore.ts
├── types/
│   └── index.ts
└── hooks/
    └── index.ts
```

## 📊 Data Structure

### Class Structure
```typescript
interface Class {
  id: string;
  name: string;
  semester: string;
  studentCount: number;
  description?: string;
  isConfigured: boolean;
  completionStatus: number;
  students: Student[];
  gradeComponents: GradeComponent[];
  babs: Bab[];
}
```

### Authentication Structure
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'dosen' | 'admin';
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}
```

### Grade Components
- **Tugas** (25%)
- **UTS** (20%)
- **UAS** (30%)
- **Proyek** (20%)
- **Kuis** (5%)

### Bab Structure
- 5 bab per mata kuliah
- Kontribusi bab dapat dikonfigurasi per komponen
- Total kontribusi per komponen = 100%

## 🎨 Design System

### Color Palette
- **Primary**: #1976d2 (Blue)
- **Secondary**: #00acc1 (Teal)
- **Success**: #2e7d32 (Green)
- **Warning**: #ed6c02 (Orange)
- **Error**: #d32f2f (Red)

### Typography
- **Font Family**: Inter
- **Headings**: 600 weight
- **Body**: 400 weight
- **Line Height**: 150% for body, 120% for headings

### Spacing
- Menggunakan 8px spacing system
- Consistent margins dan padding

## 🔧 Features Guide

### 0. Authentication Flow
- **Landing Page** (/auth) - Login, register, dan forgot password
- **Protected Routes** - Semua dashboard pages memerlukan authentication
- **Session Management** - Auto-redirect berdasarkan auth status
- **User Profile** - Display user info di header dengan dropdown menu

### 1. Dashboard
- Menampilkan overview semua kelas
- Statistik umum (total kelas, mahasiswa, dll)
- Quick actions untuk konfigurasi dan input nilai

### 2. Configuration
- Setup persentase komponen nilai
- Konfigurasi kontribusi bab
- Validasi real-time
- Preview calculation

### 3. Grade Input
- Table interface untuk input nilai
- Multi-level input (component → bab → student)
- Auto-calculation final grades
- Error handling dan validation

### 5. Class Management
- **Add New Classes**: Form untuk menambah kelas baru
- **Edit Classes**: Modify informasi kelas existing
- **Delete Classes**: Hapus kelas dengan confirmation
- **Statistics Overview**: Metrics real-time semua kelas

### 6. Reports & Analytics
- **Overall Statistics**: System-wide metrics dan performance
- **Visual Charts**: Bar charts dan pie charts untuk analytics
- **Detailed Reports**: Student-level performance data
- **Export/Print**: Professional report generation

### 4. Calculation Display
- Real-time grade calculation
- Visual analytics (charts)
- Grade distribution
- Export capabilities

## 📱 Responsive Design

### Authentication Pages
- **Mobile-First**: Optimized untuk mobile devices
- **Touch-Friendly**: Large buttons dan easy navigation
- **Adaptive Forms**: Responsive form layouts
- **Visual Hierarchy**: Clear information structure

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptations
- Mobile-first approach
- Collapsible sidebar untuk mobile
- Hamburger menu untuk navigation
- Responsive tables dengan horizontal scroll
- Touch-friendly interface
- Adaptive typography dan spacing

## 🧪 Testing

### Authentication Testing
- **Login Flow**: Test dengan demo credentials
- **Registration**: Create new accounts dengan validation
- **Forgot Password**: Test reset password flow
- **Session Persistence**: Test login state across browser refresh
- **Landing Page**: Test navigation dari portal ke authentication
- **Protected Routes**: Verify auth guard functionality

### Landing Page Testing
1. **Portal Access**: Visit `/landing` untuk melihat portal UDINUS
2. **Application Access**: Click "OBE Dashboard" card untuk masuk ke sistem
3. **Navigation Flow**: Test flow dari landing → auth → dashboard

### Sample Data
- 3 kelas dengan konfigurasi berbeda
- 20 mahasiswa per kelas
- 5 bab per mata kuliah
- Semua komponen nilai terimplementasi

### Test Scenarios
1. **Class Management**: Create/view classes
2. **Authentication**: Login/register/logout flows
2. **Configuration**: Set component percentages
3. **Grade Input**: Input student grades
4. **Calculation**: Verify grade calculations
5. **Responsive**: Test pada berbagai screen sizes
6. **Reports**: Generate dan export reports

## 📈 Performance Optimizations

- React.memo untuk expensive components
- Lazy loading untuk large datasets
- Debounced inputs untuk real-time calculations
- Optimized re-renders dengan proper dependencies

### Authentication Optimizations
- **Persistent Storage**: Zustand persist untuk session management
- **Route Guards**: Efficient auth checking dengan minimal re-renders
- **Lazy Loading**: Auth components loaded on demand
- **Memory Management**: Proper cleanup pada logout

## 🔒 Data Validation

### Authentication Validation
- **Email Format**: Proper email validation
- **Password Strength**: Minimum length requirements
- **Form Validation**: Real-time error feedback
- **Security**: Secure password handling (mock implementation)

- Input validation (0-100 range)
- Percentage validation (total = 100%)
- Real-time error feedback
- Form validation dengan React Hook Form

## 🎯 Academic System UX

### Authentication UX
- **Familiar Patterns**: Standard login/register flows
- **Clear Feedback**: Loading states dan error messages
- **Easy Navigation**: Smooth transitions between auth modes
- **Professional Design**: Clean, academic-appropriate interface

- Familiar spreadsheet-like interface
- Clear visual hierarchy
- Error prevention mechanisms
- Progress indicators
- Intuitive navigation flow

## 📚 Development Notes

### Authentication Architecture
- **Zustand Store**: Separate auth store untuk user management
- **Route Protection**: AuthGuard component untuk protected routes
- **Session Management**: Persistent storage dengan automatic cleanup
- **Mock Implementation**: Ready untuk backend integration

### State Management
- Zustand untuk global state
- Separate stores untuk auth dan app data
- Local state untuk form handling
- Immutable updates untuk data integrity

### Component Architecture
- Compound components untuk complex UI
- Custom hooks untuk business logic
- Separation of concerns
- Reusable components

### Performance Considerations
- Memoization untuk expensive operations
- Virtual scrolling untuk large lists
- Optimized bundle size
- Fast initial load

## 🔄 Future Enhancements

### Authentication Enhancements
- **Backend Integration**: Real API endpoints untuk auth
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Different permissions untuk dosen vs admin
- **OAuth Integration**: Social login options
- **Two-Factor Auth**: Enhanced security features

- Real backend integration
- Advanced analytics
- Export functionality
- Bulk import/export
- User management
- Mobile app
- Real-time collaboration
- Advanced reporting features

## 📞 Support

Untuk pertanyaan teknis atau bantuan penggunaan, silakan hubungi tim development.

## 📄 License

This project is created for BTIK UDINUS technical challenge.

## 🚀 Quick Start Guide

1. **Clone & Install**:
   ```bash
   git clone <repository-url>
   cd grade-management-ui
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Application**:
   - Open `http://localhost:3000`
   - Use demo credentials: `dosen@udinus.ac.id` / `password123`

4. **Test Features**:
   - Login dengan demo account
   - Explore dashboard dan class management
   - Test grade configuration dan input
   - Generate reports dan analytics

---

**Note**: Ini adalah prototype UI yang menggunakan mock data dan mock authentication. Untuk implementasi production, diperlukan integrasi dengan backend system yang sesuai untuk authentication dan data management.