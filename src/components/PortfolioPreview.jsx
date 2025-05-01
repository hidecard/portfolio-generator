import { useState } from 'react';
import jsPDF from 'jspdf';
import {
  UserIcon,
  BriefcaseIcon,
  LightBulbIcon,
  EnvelopeIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

function PortfolioPreview({ formData, selectedTemplate, portfolioUrl }) {
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);

  const handleShare = () => {
    const shareableLink = `${window.location.href}#${btoa(JSON.stringify(formData))}`;
    navigator.clipboard.writeText(shareableLink);
    alert('Shareable link copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Portfolio', 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name || 'Your Name'}`, 10, 20);
    doc.text(`Job Title: ${formData.jobTitle || 'Job Title'}`, 10, 30);
    doc.text(`Bio: ${formData.bio || 'Your bio'}`, 10, 40, { maxWidth: 180 });
    doc.text(`Skills: ${formData.skills.join(', ') || 'Your skills'}`, 10, 60);
    doc.text(`Experience: ${formData.experience || 'Your experience'}`, 10, 80);
    doc.text(`Contact: ${formData.contact || 'Your contact info'}`, 10, 90);
    doc.save('portfolio.pdf');
  };

  return (
    <div className={`mt-6 p-6 rounded-lg shadow-md ${selectedTemplate.bgColor}`}>
      {/* About Section */}
      <div className="mb-6">
        <h2 className={`flex items-center text-2xl font-bold ${selectedTemplate.textColor}`}>
          <UserIcon className="w-6 h-6 mr-2" />
          About
        </h2>
        <p className={`mt-2 text-lg ${selectedTemplate.textColor}`}>
          {formData.name || 'Your Name'}
        </p>
        <p className={`text-md ${selectedTemplate.textColor}`}>
          {formData.jobTitle || 'Job Title'}
        </p>
        <p className={`mt-2 ${selectedTemplate.textColor}`}>
          {formData.bio || 'Your bio goes here...'}
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${selectedTemplate.textColor}`}>
          <BriefcaseIcon className="w-6 h-6 mr-2" />
          Experience
        </h2>
        <p className={`mt-2 ${selectedTemplate.textColor}`}>
          {formData.experience || 'Your experience'}
        </p>
      </div>

      {/* Skills Section (Collapsible on Mobile) */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${selectedTemplate.textColor}`}>
          <LightBulbIcon className="w-6 h-6 mr-2" />
          Skills
        </h2>
        <div className="mt-2">
          <ul
            className={`${
              isSkillsExpanded ? 'block' : 'max-h-20 overflow-hidden'
            } transition-all duration-300 md:max-h-none md:block`}
          >
            {formData.skills.length > 0 ? (
              formData.skills.map((skill, index) => (
                <li
                  key={index}
                  className={`flex items-center ${selectedTemplate.textColor}`}
                >
                  <span className="mr-2">✅</span> {skill}
                </li>
              ))
            ) : (
              <p className={selectedTemplate.textColor}>Your skills</p>
            )}
          </ul>
          {formData.skills.length > 3 && (
            <button
              onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
              className={`mt-2 text-sm ${selectedTemplate.accentColor} text-white px-3 py-1 rounded md:hidden`}
            >
              {isSkillsExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${selectedTemplate.textColor}`}>
          <EnvelopeIcon className="w-6 h-6 mr-2" />
          Contact
        </h2>
        <p className={`mt-2 ${selectedTemplate.textColor}`}>
          {formData.contact || 'Your contact info'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href={portfolioUrl}
          download="portfolio.json"
          className={`inline-flex items-center p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          <ArrowDownTrayIcon className="w-5 h-5 mr-1" />
          Download as JSON
        </a>
        <button
          onClick={handleShare}
          className={`inline-flex items-center p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          <ShareIcon className="w-5 h-5 mr-1" />
          Copy Shareable Link
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`inline-flex items-center p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default PortfolioPreview;