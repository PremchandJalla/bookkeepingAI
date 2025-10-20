# 🤖 AI Bookkeeping Dashboard

> A modern, intelligent bookkeeping dashboard powered by React and AI-driven categorization

[![Deploy to GitHub Pages](https://github.com/PremchandJalla/bookkeepingAI/actions/workflows/deploy.yml/badge.svg)](https://github.com/PremchandJalla/bookkeepingAI/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://premchandjalla.github.io/bookkeepingAI/)

## ✨ Features

- 🎨 **Modern Dark Theme UI** - Beautiful, responsive design with smooth animations
- 🤖 **AI Transaction Categorization** - Smart categorization with confidence scoring
- 📊 **Real-time Analytics** - Interactive charts showing cash flow and expense breakdowns
- 💰 **Financial Metrics** - Key performance indicators including runway and cash flow
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🚀 Live Demo

**[View Live Demo →](https://premchandjalla.github.io/bookkeepingAI/)**

## 🏗️ Architecture

This project follows a clean, modular architecture for maximum maintainability and scalability:

```
src/
├── 📄 App.jsx                 # Main application entry
├── 📁 components/            # Reusable UI components
│   ├── layout/              # Layout components (Sidebar, Navbar)
│   ├── dashboard/           # Dashboard widgets and charts
│   └── transactions/        # Transaction-related components
├── 📁 pages/               # Page-level components
├── 📁 data/               # Mock data and API interfaces
└── 📁 utils/              # Helper functions and calculations
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/PremchandJalla/bookkeepingAI.git
cd bookkeepingAI

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your application running.

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment

This project automatically deploys to GitHub Pages when you push to the main branch. The deployment is handled by GitHub Actions.

### Manual Deployment Setup

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Push to main branch** - the workflow will automatically build and deploy

## 📊 Dashboard Features

### Key Metrics
- **Net Cash Flow** - Real-time cash flow tracking
- **Current Balance** - Live balance updates
- **Runway** - Calculate how long your cash will last
- **AI Accuracy** - Monitor AI categorization performance

### Interactive Charts
- **Cash Flow Trend** - Monthly incoming vs outgoing analysis
- **Expense Breakdown** - Pie chart of expense categories
- **Transaction Confidence** - AI categorization confidence levels

### Smart Categorization
- **Auto-categorized** (90%+ confidence) - Fully automated
- **Needs Review** (60-89% confidence) - Human verification recommended  
- **Manual Required** (<60% confidence) - Human categorization needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with using React and modern web technologies
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**[Live Demo](https://premchandjalla.github.io/bookkeepingAI/)** | **[Report Bug](https://github.com/PremchandJalla/bookkeepingAI/issues)** | **[Request Feature](https://github.com/PremchandJalla/bookkeepingAI/issues)**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
