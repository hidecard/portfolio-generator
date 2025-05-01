import { useState } from 'react';
import Header from './components/Header';
import FormSection from './components/FormSection';
import TemplateSelector from './components/TemplateSelector';
import PortfolioPreview from './components/PortfolioPreview';

const templates = [
  {
    id: 1,
    name: 'Professional',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    accentColor: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Creative',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-900',
    accentColor: 'bg-pink-500',
  },
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    bio: '',
    skills: '',
    experience: '',
    contact: '',
  });
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [portfolioUrl, setPortfolioUrl] = useState(null);

  const handleGenerate = () => {
    const portfolioData = { ...formData, template: selectedTemplate };
    const portfolioBlob = new Blob([JSON.stringify(portfolioData)], { type: 'application/json' });
    const url = URL.createObjectURL(portfolioBlob);
    setPortfolioUrl(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        <FormSection formData={formData} setFormData={setFormData} />
        <TemplateSelector templates={templates} selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 mt-6"
        >
          Generate Portfolio
        </button>
        {portfolioUrl && <PortfolioPreview formData={formData} selectedTemplate={selectedTemplate} portfolioUrl={portfolioUrl} />}
      </div>
    </div>
  );
}

export default App;