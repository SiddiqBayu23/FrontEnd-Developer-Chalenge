export interface Student {
  id: string;
  name: string;
  nim: string;
  grades: {
    [componentId: string]: {
      [babId: string]: number | null;
    };
  };
  finalGrade?: number;
  letterGrade?: string;
}

export interface GradeComponent {
  id: string;
  name: string;
  percentage: number;
  babContributions: {
    [babId: string]: number;
  };
}

export interface Bab {
  id: string;
  name: string;
  description: string;
}

export interface Class {
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

export interface AppState {
  classes: Class[];
  selectedClass: Class | null;
  setSelectedClass: (classData: Class | null) => void;
  addClass: (newClassData: { name: string; semester: string; studentCount: number; description?: string }) => void;
  updateClass: (classId: string, updatedClass: Class) => void;
  deleteClass: (classId: string) => void;
  updateClassConfiguration: (classId: string, components: GradeComponent[]) => void;
  updateStudentGrade: (studentId: string, componentId: string, babId: string, grade: number) => void;
  calculateFinalGrades: (classId: string) => void;
}

export interface NavigationItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  active?: boolean;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    label: string;
  };
}

export interface ClassCardProps {
  classData: Class;
  onConfigure: () => void;
  onViewGrades: () => void;
}

export interface ComponentConfigurationProps {
  classData: Class;
  onSave: (components: GradeComponent[]) => void;
}

export interface GradeInputTableProps {
  classData: Class;
  onGradeUpdate: (studentId: string, componentId: string, babId: string, grade: number) => void;
  onCalculate: () => void;
}

export interface GradeCalculationDisplayProps {
  classData: Class;
}

// Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'dosen' | 'admin';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}