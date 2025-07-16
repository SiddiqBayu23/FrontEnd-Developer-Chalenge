'use client';

import { create } from 'zustand';
import { AppState, Class, GradeComponent, Student } from '@/types';

// Mock data for prototype
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Pemrograman Web',
    semester: 'Ganjil 2024/2025',
    studentCount: 20,
    isConfigured: true,
    completionStatus: 75,
    students: [
      {
        id: '1',
        name: 'Ahmad Fauzi',
        nim: '22101001',
        grades: {
          tugas: { bab1: 85, bab2: 90, bab3: 80, bab4: 88, bab5: 85 },
          uts: { bab1: 80, bab2: 85, bab3: 90, bab4: 88, bab5: 85 },
          uas: { bab1: 90, bab2: 88, bab3: 85, bab4: 92, bab5: 88 },
          proyek: { bab1: 95, bab2: 90, bab3: 92, bab4: 88, bab5: 90 },
          kuis: { bab1: 85, bab2: 80, bab3: 88, bab4: 85, bab5: 90 }
        }
      },
      {
        id: '2',
        name: 'Siti Rahayu',
        nim: '22101002',
        grades: {
          tugas: { bab1: 90, bab2: 85, bab3: 88, bab4: 90, bab5: 92 },
          uts: { bab1: 85, bab2: 88, bab3: 85, bab4: 90, bab5: 88 },
          uas: { bab1: 88, bab2: 92, bab3: 90, bab4: 85, bab5: 90 },
          proyek: { bab1: 92, bab2: 88, bab3: 90, bab4: 92, bab5: 95 },
          kuis: { bab1: 90, bab2: 85, bab3: 90, bab4: 88, bab5: 85 }
        }
      },
      {
        id: '3',
        name: 'Budi Santoso',
        nim: '22101003',
        grades: {
          tugas: { bab1: 75, bab2: 80, bab3: 85, bab4: 78, bab5: 82 },
          uts: { bab1: 78, bab2: 75, bab3: 80, bab4: 85, bab5: 80 },
          uas: { bab1: 85, bab2: 88, bab3: 82, bab4: 80, bab5: 85 },
          proyek: { bab1: 88, bab2: 85, bab3: 85, bab4: 90, bab5: 88 },
          kuis: { bab1: 80, bab2: 78, bab3: 85, bab4: 82, bab5: 85 }
        }
      }
    ],
    gradeComponents: [
      {
        id: 'tugas',
        name: 'Tugas',
        percentage: 25,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'uts',
        name: 'UTS',
        percentage: 20,
        babContributions: { bab1: 30, bab2: 25, bab3: 20, bab4: 15, bab5: 10 }
      },
      {
        id: 'uas',
        name: 'UAS',
        percentage: 30,
        babContributions: { bab1: 15, bab2: 20, bab3: 25, bab4: 20, bab5: 20 }
      },
      {
        id: 'proyek',
        name: 'Proyek',
        percentage: 20,
        babContributions: { bab1: 10, bab2: 15, bab3: 20, bab4: 25, bab5: 30 }
      },
      {
        id: 'kuis',
        name: 'Kuis',
        percentage: 5,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      }
    ],
    babs: [
      { id: 'bab1', name: 'Bab 1', description: 'Pengenalan HTML & CSS' },
      { id: 'bab2', name: 'Bab 2', description: 'JavaScript Fundamentals' },
      { id: 'bab3', name: 'Bab 3', description: 'React Basics' },
      { id: 'bab4', name: 'Bab 4', description: 'State Management' },
      { id: 'bab5', name: 'Bab 5', description: 'API Integration' }
    ]
  },
  {
    id: '2',
    name: 'Basis Data',
    semester: 'Ganjil 2024/2025',
    studentCount: 18,
    isConfigured: false,
    completionStatus: 30,
    students: [],
    gradeComponents: [
      {
        id: 'tugas',
        name: 'Tugas',
        percentage: 20,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'uts',
        name: 'UTS',
        percentage: 25,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'uas',
        name: 'UAS',
        percentage: 35,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'proyek',
        name: 'Proyek',
        percentage: 15,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'kuis',
        name: 'Kuis',
        percentage: 5,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      }
    ],
    babs: [
      { id: 'bab1', name: 'Bab 1', description: 'Konsep Basis Data' },
      { id: 'bab2', name: 'Bab 2', description: 'Model Data Relasional' },
      { id: 'bab3', name: 'Bab 3', description: 'SQL Query' },
      { id: 'bab4', name: 'Bab 4', description: 'Normalisasi' },
      { id: 'bab5', name: 'Bab 5', description: 'Transaksi & Concurrency' }
    ]
  },
  {
    id: '3',
    name: 'Algoritma & Struktur Data',
    semester: 'Ganjil 2024/2025',
    studentCount: 22,
    isConfigured: true,
    completionStatus: 90,
    students: [],
    gradeComponents: [
      {
        id: 'tugas',
        name: 'Tugas',
        percentage: 30,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'uts',
        name: 'UTS',
        percentage: 25,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'uas',
        name: 'UAS',
        percentage: 25,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'proyek',
        name: 'Proyek',
        percentage: 15,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      },
      {
        id: 'kuis',
        name: 'Kuis',
        percentage: 5,
        babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
      }
    ],
    babs: [
      { id: 'bab1', name: 'Bab 1', description: 'Kompleksitas Algoritma' },
      { id: 'bab2', name: 'Bab 2', description: 'Array & Linked List' },
      { id: 'bab3', name: 'Bab 3', description: 'Stack & Queue' },
      { id: 'bab4', name: 'Bab 4', description: 'Tree & Graph' },
      { id: 'bab5', name: 'Bab 5', description: 'Sorting & Searching' }
    ]
  }
];

const calculateLetterGrade = (score: number): string => {
  if (score >= 85) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'B-';
  if (score >= 60) return 'C+';
  if (score >= 55) return 'C';
  if (score >= 50) return 'C-';
  if (score >= 45) return 'D+';
  if (score >= 40) return 'D';
  return 'E';
};

export const useAppStore = create<AppState>((set, get) => ({
  classes: mockClasses,
  selectedClass: null,
  
  setSelectedClass: (classData) => set({ selectedClass: classData }),
  
  addClass: (newClassData) => {
    const newClass: Class = {
      id: Date.now().toString(),
      name: newClassData.name,
      semester: newClassData.semester,
      studentCount: newClassData.studentCount,
      description: newClassData.description,
      isConfigured: false,
      completionStatus: 0,
      students: [],
      gradeComponents: [
        {
          id: 'tugas',
          name: 'Tugas',
          percentage: 25,
          babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
        },
        {
          id: 'uts',
          name: 'UTS',
          percentage: 20,
          babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
        },
        {
          id: 'uas',
          name: 'UAS',
          percentage: 30,
          babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
        },
        {
          id: 'proyek',
          name: 'Proyek',
          percentage: 20,
          babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
        },
        {
          id: 'kuis',
          name: 'Kuis',
          percentage: 5,
          babContributions: { bab1: 20, bab2: 20, bab3: 20, bab4: 20, bab5: 20 }
        }
      ],
      babs: [
        { id: 'bab1', name: 'Bab 1', description: 'Materi Bab 1' },
        { id: 'bab2', name: 'Bab 2', description: 'Materi Bab 2' },
        { id: 'bab3', name: 'Bab 3', description: 'Materi Bab 3' },
        { id: 'bab4', name: 'Bab 4', description: 'Materi Bab 4' },
        { id: 'bab5', name: 'Bab 5', description: 'Materi Bab 5' }
      ]
    };

    set((state) => ({
      classes: [...state.classes, newClass]
    }));
  },

  updateClass: (classId, updatedClass) => {
    set((state) => ({
      classes: state.classes.map(cls =>
        cls.id === classId ? updatedClass : cls
      )
    }));
  },

  deleteClass: (classId) => {
    set((state) => ({
      classes: state.classes.filter(cls => cls.id !== classId),
      selectedClass: state.selectedClass?.id === classId ? null : state.selectedClass
    }));
  },
  
  updateClassConfiguration: (classId, components) => {
    set((state) => ({
      classes: state.classes.map(cls =>
        cls.id === classId
          ? { ...cls, gradeComponents: components, isConfigured: true }
          : cls
      )
    }));
  },
  
  updateStudentGrade: (studentId, componentId, babId, grade) => {
    const { selectedClass } = get();
    if (!selectedClass) return;

    set((state) => ({
      classes: state.classes.map(cls =>
        cls.id === selectedClass.id
          ? {
              ...cls,
              students: cls.students.map(student =>
                student.id === studentId
                  ? {
                      ...student,
                      grades: {
                        ...student.grades,
                        [componentId]: {
                          ...student.grades[componentId],
                          [babId]: grade
                        }
                      }
                    }
                  : student
              )
            }
          : cls
      )
    }));

    // Update selected class as well
    const updatedClass = get().classes.find(cls => cls.id === selectedClass.id);
    if (updatedClass) {
      set({ selectedClass: updatedClass });
    }
  },
  
  calculateFinalGrades: (classId) => {
    const state = get();
    const classData = state.classes.find(cls => cls.id === classId);
    if (!classData) return;

    const updatedStudents = classData.students.map(student => {
      let finalGrade = 0;
      
      classData.gradeComponents.forEach(component => {
        let componentScore = 0;
        let totalBabContribution = 0;
        
        classData.babs.forEach(bab => {
          const babContribution = component.babContributions[bab.id] || 0;
          const babGrade = student.grades[component.id]?.[bab.id] || 0;
          
          componentScore += (babGrade * babContribution) / 100;
          totalBabContribution += babContribution;
        });
        
        if (totalBabContribution > 0) {
          finalGrade += (componentScore * component.percentage) / 100;
        }
      });
      
      return {
        ...student,
        finalGrade: Math.round(finalGrade * 100) / 100,
        letterGrade: calculateLetterGrade(finalGrade)
      };
    });

    set((state) => ({
      classes: state.classes.map(cls =>
        cls.id === classId
          ? { ...cls, students: updatedStudents }
          : cls
      )
    }));
  }
}));