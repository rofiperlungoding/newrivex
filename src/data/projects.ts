import { Student, ChalkboardTeacher, Books, Calculator, CurrencyDollar, Globe, Sigma, Graph, Radical, ChartBar, TrendUp, Database, GraduationCap, VideoCamera, Users, Wallet, CreditCard, ChartPie } from '@phosphor-icons/react';

export const projects = [
    {
        id: "clouddesk",
        title: "CloudDesk EDU",
        subtitle: "Reimagining Classroom Management",
        category: "Educational Platform",
        overview: "CloudDesk EDU is a comprehensive Learning Management System (LMS) designed to bridge the gap between traditional classroom teaching and digital administration. Built with a focus on user experience, it empowers educators to manage resources, track student progress, and facilitate communication effortlessly.",
        features: [
            "Real-time Student Tracking & Analytics",
            "Digital Resource Library & Assignment Management",
            "Automated Grading System with Feedback Loop",
            "Secure Parent-Teacher Communication Portal",
            "Attendance Monitoring with Biometric Integration Support"
        ],
        techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Socket.io", "Tailwind CSS"],
        challenges: [
            {
                title: "Real-time Synchronization",
                description: "Ensuring that grade updates and attendance records were instantly reflected across all connected devices without latency, solved by implementing a custom WebSocket architecture."
            },
            {
                title: "Data Security & Privacy",
                description: "Adhering to strict educational data privacy standards (FERPA compliance) required implementing end-to-end encryption for all student records and communication channels."
            }
        ],
        outcome: "CloudDesk EDU has been adopted by several pilot schools, reducing administrative time by 40% and significantly improving parent engagement through its transparent reporting system.",
        image: "/assets/images/projects/clouddesk.png",
        icons: [Student, ChalkboardTeacher, Books],
        links: {
            demo: "https://cloud-desk.gabrielseto.dev",
            github: "https://github.com/rofiperlungoding/CloudDesk"
        },
        year: "2024"
    },
    {
        id: "sicost",
        title: "SiCost Estimator",
        subtitle: "Transparent Software Costing",
        category: "Web Application",
        overview: "SiCost is an intelligent cost estimation tool tailored for software development agencies and freelancers. It eliminates the ambiguity in project pricing by providing a granular, feature-based calculation engine that generates detailed PDF quotes for clients.",
        features: [
            "Dynamic Feature-based Cost Calculation",
            "Customizable Hourly Rates & Complexity Factors",
            "Instant PDF Proposal Generation",
            "Project Timeline Estimation Engine",
            "Multi-currency Support"
        ],
        techStack: ["React", "Redux Toolkit", "PDF.js", "Chart.js", "Framer Motion"],
        challenges: [
            {
                title: "Complex Calculation Logic",
                description: "Developing a flexible algorithm that could account for varying project complexities and dependencies between features without overwhelming the user interface."
            },
            {
                title: "PDF Generation Performance",
                description: "Generating high-quality, printable PDF proposals client-side without blocking the main thread, achieved using web workers and optimized rendering libraries."
            }
        ],
        outcome: "SiCost has helped freelance developers increase their proposal acceptance rate by 25% by providing professional, transparent, and instant cost breakdowns to potential clients.",
        image: "/assets/images/projects/sicost.png",
        icons: [Calculator, CurrencyDollar, Globe],
        links: {
            demo: "https://sicost.netlify.app/",
            github: "https://github.com/rofiperlungoding/SiCost"
        },
        year: "2024"
    },
    {
        id: "mathlab",
        title: "MathLab Interactive",
        subtitle: "Visualizing Complex Mathematics",
        category: "Learning Platform",
        overview: "MathLab Interactive is an educational platform designed to make complex mathematical concepts accessible through visualization. It moves beyond static text, offering interactive graphs, step-by-step problem solvers, and gamified learning paths.",
        features: [
            "Interactive Graphing Calculator",
            "Step-by-step Equation Solver",
            "Visual Geometry Proofs",
            "Adaptive Learning Quizzes",
            "Progress Tracking Dashboard"
        ],
        techStack: ["React", "D3.js", "MathJax", "Firebase", "Tailwind CSS"],
        challenges: [
            {
                title: "Rendering Mathematical Notation",
                description: "Seamlessly rendering complex LaTeX equations dynamically alongside interactive SVG graphs required a custom integration of MathJax and D3.js."
            },
            {
                title: "Performance Optimization",
                description: "Maintaining 60fps animations while calculating complex functions in real-time on low-end devices was achieved through heavy memoization and WebAssembly modules for core calculations."
            }
        ],
        outcome: "MathLab has been praised for its intuitive approach to calculus and algebra, helping students visualize abstract concepts and improving test scores in pilot user groups.",
        image: "/assets/images/projects/mathlab.png",
        icons: [Sigma, Graph, Radical],
        links: {
            demo: "https://rofimath.netlify.app/",
            github: "https://github.com/rofiperlungoding/mathlabrofi"
        },
        year: "2024"
    },
    {
        id: "statisticlab",
        title: "StatisticLab Pro",
        subtitle: "Data Science Made Accessible",
        category: "Data Science Tool",
        overview: "StatisticLab Pro is a browser-based statistical analysis suite. It brings the power of tools like SPSS or R into a modern, user-friendly web interface, allowing researchers and students to perform complex analyses without installation.",
        features: [
            "Comprehensive Statistical Tests (T-test, ANOVA, Regression)",
            "Drag-and-Drop Data Import (CSV, Excel)",
            "Interactive Data Visualization",
            "Automated Report Generation",
            "Real-time Data Cleaning Tools"
        ],
        techStack: ["TypeScript", "React", "Plotly.js", "Simple-Statistics", "Web Workers"],
        challenges: [
            {
                title: "Large Dataset Handling",
                description: "Processing datasets with thousands of rows in the browser without freezing the UI. Solved by offloading computations to Web Workers and using virtualized lists for data rendering."
            },
            {
                title: "Statistical Accuracy",
                description: "Ensuring all statistical algorithms matched industry standards required rigorous unit testing against established R and Python libraries."
            }
        ],
        outcome: "StatisticLab is currently used by undergraduate students for quick data analysis, removing the barrier to entry for statistical learning.",
        image: "/assets/images/projects/statisticlab.png",
        icons: [ChartBar, TrendUp, Database],
        links: {
            demo: "https://statisticslabrofi.netlify.app/",
            github: "https://github.com/rofiperlungoding/statisticlabrofi"
        },
        year: "2024"
    },
    {
        id: "setutor",
        title: "Setutor Connect",
        subtitle: "Connecting Minds, Empowering Growth",
        category: "EdTech Marketplace",
        overview: "Setutor Connect is a two-sided marketplace connecting students with qualified private tutors. It handles the entire lifecycle of the tutoring relationship, from discovery and booking to video conferencing and payment processing.",
        features: [
            "Smart Tutor Matching Algorithm",
            "Integrated Video Classroom with Whiteboard",
            "Secure Payment Escrow System",
            "Verified Tutor Profiles & Reviews",
            "Calendar & Scheduling Management"
        ],
        techStack: ["TypeScript", "Next.js", "Stripe Connect", "WebRTC", "PostgreSQL"],
        challenges: [
            {
                title: "Real-time Video Quality",
                description: "Building a stable, low-latency video classroom experience within the browser using WebRTC, handling bandwidth fluctuations gracefully."
            },
            {
                title: "Trust & Safety",
                description: "Implementing a robust verification system for tutors and a secure escrow payment flow to build trust between anonymous parties."
            }
        ],
        outcome: "Setutor has successfully facilitated hundreds of tutoring hours, creating a new income stream for educators and personalized learning opportunities for students.",
        image: "/assets/images/projects/setutor.png",
        icons: [GraduationCap, VideoCamera, Users],
        links: {
            demo: null,
            github: "https://github.com/rofiperlungoding/Setutor"
        },
        year: "2024"
    },
    {
        id: "moneytrackr",
        title: "MoneyTrackr",
        subtitle: "Master Your Finances",
        category: "FinTech App",
        overview: "MoneyTrackr is a privacy-focused personal finance application designed to help users take control of their spending. It offers intuitive tracking, smart budgeting, and insightful visualizations without compromising user data.",
        features: [
            "Expense & Income Tracking",
            "Visual Budget Planning",
            "Recurring Transaction Management",
            "Spending Category Analytics",
            "Offline-first PWA Architecture"
        ],
        techStack: ["React", "IndexedDB", "Recharts", "PWA", "LocalFirst"],
        challenges: [
            {
                title: "Offline Synchronization",
                description: "Creating a robust offline-first experience where users can add transactions without internet, syncing seamlessly when connectivity is restored."
            },
            {
                title: "Data Visualization",
                description: "Designing charts that are not just pretty but actionable, helping users understand their spending habits at a glance."
            }
        ],
        outcome: "MoneyTrackr has helped users save an average of 15% on monthly discretionary spending by providing clear visibility into their financial habits.",
        image: "/assets/images/projects/moneytrackr.png",
        icons: [Wallet, CreditCard, ChartPie],
        links: {
            demo: null,
            github: "https://github.com/rofiperlungoding/moneytrackrrofi"
        },
        year: "2024"
    }
];
