export interface Project {
  slug: string; title: string; category: string; summary: string;
  technologies: string[]; highlights: string[]; demo?: string; period?: string;
}

export const projects: Project[] = [
  { slug: 'heart-disease', title: 'Heart Disease Screening System', category: 'Applied machine learning · Full-stack', summary: 'A Flask application connecting a Random Forest risk estimate with validated inputs, email authentication, and deployment on Render.', technologies: ['Python', 'Flask', 'Scikit-learn', 'SMTP', 'Render'], highlights: ['88% accuracy', 'High-recall threshold tuning', 'Email authentication and password reset'], demo: 'https://heart-risk-ai-9fmk.onrender.com/', period: 'Jan 2026–Mar 2026' },
  { slug: 'asl-recognizer', title: 'ASL Alphabet Recognizer', category: 'Computer vision · Real-time recognition', summary: 'A real-time alphabet recognition pipeline using hand landmarks and frame-level prediction smoothing.', technologies: ['Python', 'MediaPipe', 'TensorFlow', 'Mixed precision'], highlights: ['Reported 95% accuracy', '87k-image dataset', 'Reported under 50ms on a T4 GPU'], period: 'Jan — Aug 2025' },
  { slug: 'offline-nlp', title: 'Offline NLP Test-Case Generator', category: 'NLP systems · Offline tooling', summary: 'An air-gapped workflow for turning software requirement documents into test cases without cloud or external calls.', technologies: ['Python', 'Ollama', 'Local models'], highlights: ['200+ SRS documents', 'Sequential execution under memory constraints', '60% reported reduction in manual verification'], period: 'May — Jul 2025' },
];
export default projects;
