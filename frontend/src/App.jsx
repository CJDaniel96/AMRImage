// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DownloadImages } from './components/Download';
import ShowImages from './components/ShowImages';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // 引入 Footer 元件
import NotFound from './components/NotFound';
import './App.css'; // 如果你有 App.css 或其他全域佈局樣式，確保引入

function App() {
  return (
    // 我們已經在 index.css 的 body 設定了全域背景色
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-layout">
        <Navbar />
        <main className="container main-content mt-5">
          <Routes>
            <Route path="/" element={<ShowImages />} />
            <Route path="/download/download-images" element={<DownloadImages />} />
            <Route path="/show-images" element={<ShowImages />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Not Found route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
