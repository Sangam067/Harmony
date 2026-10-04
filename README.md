# 🪡 Harmony Home Textiles — AI-Powered Artisan Catalog

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2024-orange?style=for-the-badge&logo=hacktoberfest)](https://hacktoberfest.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-Mistral--7B-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3)

> **Hacktoberfest Open-Source AI Challenge Entry**  
> A zero-overhead, hardware-agnostic e-commerce and artisan textiles consultant blending centuries of Himalayan weaving traditions with state-of-the-art open-source generative AI.

---

## 🏛️ About Harmony Home Textiles

**Harmony Home Textiles** is a premier heritage textile storefront rooted in Kathmandu, specializing in hand-woven bed linens, pure Pashmina throws, jacquard curtains, raw silk cushions, and artisanal upholstery.

- **Physical Storefront:** China Town Shopping Complex, Shop No: 141, Sundhara, Kathmandu, Nepal
- **Proprietor & Master Curator:** Shyam Mudbhari
- **Contact:** [shyammudbhari2151@gmail.com](mailto:shyammudbhari2151@gmail.com) | 📞 +977 01-5312761
- **Heritage:** Traditional craftsmanship combined with contemporary crystal glassmorphic aesthetics.

---

## 🧠 Open-Source AI Architecture: Mistral-7B-Instruct-v0.3

For the **Hacktoberfest Open-Source AI Challenge**, Harmony implements an intelligent **Textile & Material Matchmaker** powered by:

- **Model:** [`mistralai/Mistral-7B-Instruct-v0.3`](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3) — open-weight instruction-tuned 7-billion parameter language model.
- **Provider:** Hugging Face Serverless Inference API.
- **Zero-Overhead & Hardware-Agnostic:** Runs completely client-side in the browser without requiring local GPUs, dedicated Python microservices, or costly cloud instances.
- **Prompt Engineering:** Tailored domain prompts evaluate customer budget, room ambient lighting, aesthetic preferences (e.g., Newari, Himalayan Bohemian, Modern Minimalist), and material durability to formulate bespoke fabric specifications and weave recommendations.

---

## ✨ Key Features

1. **AI Material Matchmaker (`AiMaterialStudio`)**  
   Interactive consultation studio where users select fabric types (Silk, Wool, Jacquard, Cotton), set budget tiers, and receive immediate AI-tailored architectural textile recommendations.

2. **Crystallized Glassmorphism UI**  
   Custom dark-mode glass styling with low-opacity crystalline panels, warm saffron/burgundy ambient lighting, and traditional auspicious motifs.

3. **Complete Artisan Goods Catalog (`AllGoodsPage`)**  
   Comprehensive product showcase featuring high-res imagery, price ranges, weaving lead times, and direct reservations via email/WhatsApp.

4. **Hardware-Agnostic Performance**  
   Lightning-fast load times with Vite bundling and optimized responsive layouts for mobile and desktop screens.

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- **Node.js** (v18.0.0 or later recommended)
- **npm** (comes with Node.js)
- A free **Hugging Face Account** with an Access Token (`read` permission)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sangam067/Harmony.git
   cd Harmony
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root:
   ```bash
   touch .env.local
   ```
   Add your Hugging Face API Token:
   ```env
   VITE_HF_TOKEN=your_hugging_face_token_here
   ```
   *(Note: `.env.local` is listed in `.gitignore` and will never be pushed to version control, keeping your secret token safe.)*

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Tech Stack

- **Frontend:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with custom backdrop-blur and glassmorphism utilities
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI Backend:** [Hugging Face Serverless Inference API](https://huggingface.co/docs/api-inference) (`Mistral-7B-Instruct-v0.3`)

---

## 📁 Project Structure

```
Harmony/
├── index.html               # Main HTML entry point
├── package.json             # Dependencies and build scripts
├── postcss.config.js        # PostCSS configuration for Tailwind
├── tailwind.config.js       # Custom design system colors & animations
├── vite.config.js           # Vite build pipeline
├── .gitignore               # Strict exclusion for .env, node_modules, dist
├── .env.local               # Private local environment variables (HF token)
├── src/
│   ├── main.jsx             # React DOM root
│   ├── App.jsx              # Main application router and state
│   ├── index.css            # Crystallized glass styling & custom classes
│   └── components/
│       ├── AiMaterialStudio.jsx      # Hugging Face AI recommendation engine
│       ├── AllGoodsPage.jsx          # Goods collection and catalog showcase
│       ├── BackgroundCrystallized.jsx # Ambient crystal lighting effects
│       ├── HeroSection.jsx           # Hero with traditional motifs
│       ├── IndianMotifs.jsx          # Cultural SVG decorative motifs
│       ├── ResnHeader.jsx            # Sleek floating navigation bar
│       ├── SpecModal.jsx             # Fabric details and specifications modal
│       └── StoreFootprint.jsx        # Kathmandu Chinatown storefront details
```

---

## 🤝 Contributing

Contributions are welcome! If you are participating in **Hacktoberfest**:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/CreativeFeature`)
3. Commit your Changes (`git commit -m 'Add CreativeFeature'`)
4. Push to the Branch (`git push origin feature/CreativeFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📍 Contact & Visits

**Harmony Home Textiles**  
China Town Shopping Complex, Shop No: 141,  
Sundhara, Kathmandu, Nepal  
- 👤 **Contact:** Shyam Mudbhari  
- ✉️ **Email:** [shyammudbhari2151@gmail.com](mailto:shyammudbhari2151@gmail.com)  
- 📞 **Phone:** 01-5312761  
