import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CurrencyPairPage } from './pages/CurrencyPairPage';
import { RatesTable } from './pages/RatesTable';
import { About, PrivacyPolicy, Contact } from './pages/StaticPages';
import { Charts } from './pages/Charts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* English Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rates" element={<RatesTable />} />
          <Route path="charts" element={<Charts />} />
          <Route path=":pair" element={<CurrencyPairPage />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Thai Routes */}
        <Route path="/th" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rates" element={<RatesTable />} />
          <Route path="charts" element={<Charts />} />
          <Route path=":pair" element={<CurrencyPairPage />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
