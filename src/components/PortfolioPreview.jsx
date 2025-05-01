import { useState } from 'react';
import jsPDF from 'jspdf';
import * as HeroIcons from '@heroicons/react/24/outline';

function PortfolioPreview({ formData, selectedTemplate, portfolioUrl, darkMode }) {
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
    doc.text(`Skills: ${formData.skills.map(s => s.name).join(', ') || 'Your skills'}`, 10, 60);
    let y = 80;
    formData.experiences.forEach((exp, index) => {
      doc.text(`Experience ${index + 1}: ${exp.company} - ${exp.role}`, 10, y);
      doc.text(`${exp.dates}`, 10, y + 10);
      doc.text(`${exp.description}`, 10, y + 20, { maxWidth: 180 });
      y += 40;
    });
    doc.text(`Contact: ${formData.contact || 'Your contact info'}`, 10, y);
    doc.text(`Social Media: ${Object.values(formData.socialMedia).filter(Boolean).join(', ') || 'No links provided'}`, 10, y + 10);
    doc.save('portfolio.pdf');
  };

  const handleDownloadHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${formData.name || 'Portfolio'}</title>
        <style>
          body { font-family: ${selectedTemplate.fontFamily}; background: ${darkMode ? '#1f2937' : '#f9fafb'}; padding: 20px; }
          .container { max-width: 800px; margin: 0 auto; background: ${selectedTemplate.bgColor}; color: ${selectedTemplate.textColor}; padding: 20px; border-radius: ${selectedTemplate.borderStyle === 'rounded' ? '0.5rem' : selectedTemplate.borderStyle === 'sharp' ? '0' : '1rem'}; }
          .section { margin-bottom: 20px; }
          .profile-img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
          .social-links { display: flex; gap: 10px; }
          .social-links a { color: ${selectedTemplate.textColor}; }
          .timeline { border-left: 2px solid ${selectedTemplate.accentColor}; padding-left: 20px; }
          .timeline-item { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="section">
            <h2>About</h2>
            ${formData.profilePicture ? `<img src="${formData.profilePicture}" alt="Profile" class="profile-img">` : ''}
            <p>${formData.name || 'Your Name'}</p>
            <p>${formData.jobTitle || 'Job Title'}</p>
            <p>${formData.bio || 'Your bio goes here...'}</p>
          </div>
          <div class="section">
            <h2>Experience</h2>
            <div class="timeline">
              ${formData.experiences.map(exp => `
                <div class="timeline-item">
                  <h3>${exp.company} - ${exp.role}</h3>
                  <p>${exp.dates}</p>
                  <p>${exp.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="section">
            <h2>Skills</h2>
            <ul>
              ${formData.skills.map(skill => `<li>${skill.name}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <h2>Contact</h2>
            <p>${formData.contact || 'Your contact info'}</p>
            <div class="social-links">
              ${Object.entries(formData.socialMedia).map(([platform, url]) => url ? `<a href="${url}" target="_blank">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>` : '').join('')}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Dynamically load section icons
  const AboutIcon = HeroIcons[selectedTemplate.icons.about] || HeroIcons.UserIcon;
  const ExperienceIcon = HeroIcons[selectedTemplate.icons.experience] || HeroIcons.BriefcaseIcon;
  const SkillsIcon = HeroIcons[selectedTemplate.icons.skills] || HeroIcons.LightBulbIcon;
  const ContactIcon = HeroIcons[selectedTemplate.icons.contact] || HeroIcons.EnvelopeIcon;

  // Social media icons
  const socialIcons = {
    linkedin: HeroIcons.LinkedInIcon,
    github: HeroIcons.GitHubIcon,
    twitter: HeroIcons.TwitterIcon,
  };

  // Apply custom theme styles
  const containerStyle = {
    fontFamily: selectedTemplate.fontFamily || 'Arial, sans-serif',
    borderRadius: selectedTemplate.borderStyle === 'rounded' ? '0.5rem' : selectedTemplate.borderStyle === 'sharp' ? '0' : '1rem',
  };

  return (
    <div
      className={`mt-6 p-6 shadow-md ${darkMode ? 'dark:bg-gray-800 dark:text-white' : selectedTemplate.bgColor}`}
      style={containerStyle}
    >
      {/* About Section with Profile Picture */}
      <div className="mb-6">
        <h2 className={`flex items-center text-2xl font-bold ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
          <AboutIcon className="w-6 h-6 mr-2" />
          About
        </h2>
        <div className="flex items-center mt-2">
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
          )}
          <div>
            <p className={`text-lg ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
              {formData.name || 'Your Name'}
            </p>
            <p className={`text-md ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
              {formData.jobTitle || 'Job Title'}
            </p>
          </div>
        </div>
        <p className={`mt-2 ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
          {formData.bio || 'Your bio goes here...'}
        </p>
      </div>

      {/* Experience Section with Timeline */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
          <ExperienceIcon className="w-6 h-6 mr-2" />
          Experience
        </h2>
        <div className={`mt-2 border-l-2 ${darkMode ? 'border-gray-600' : `border-${selectedTemplate.accentColor}`}`}>
          {formData.experiences.length > 0 ? (
            formData.experiences.map((exp, index) => (
              <div key={index} className="ml-4 mb-4">
                <h3 className={`font-medium ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
                  {exp.company} - {exp.role}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.dates}
                </p>
                <p className={`${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
                  {exp.description}
                </p>
              </div>
            ))
          ) : (
            <p className={`${darkMode ? 'text-white' : selectedTemplate.textColor}`}>Your experience</p>
          )}
        </div>
      </div>

      {/* Skills Section (Collapsible on Mobile) */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
          <SkillsIcon className="w-6 h-6 mr-2" />
          Skills
        </h2>
        <div className="mt-2">
          <ul
            className={`${
              isSkillsExpanded ? 'block' : 'max-h-20 overflow-hidden'
            } transition-all duration-300 md:max-h-none md:block`}
          >
            {formData.skills.length > 0 ? (
              formData.skills.map((skill, index) => {
                const SkillIcon = HeroIcons[skill.icon] || HeroIcons.CheckCircleIcon;
                return (
                  <li
                    key={index}
                    className={`flex items-center ${darkMode ? 'text-white' : selectedTemplate.textColor}`}
                  >
                    <SkillIcon className="w-5 h-5 mr-2" />
                    {skill.name}
                  </li>
                );
              })
            ) : (
              <p className={darkMode ? 'text-white' : selectedTemplate.textColor}>Your skills</p>
            )}
          </ul>
          {formData.skills.length > 3 && (
            <button
              onClick={() => setIsSkillsExpanded(!isSkillsExpanded)}
              className={`mt-2 text-sm ${darkMode ? 'bg-gray-600 text-white' : `${selectedTemplate.accentColor} text-white`} px-3 py-1 rounded md:hidden`}
            >
              {isSkillsExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>

      {/* Contact Section with Social Media Links */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
          <ContactIcon className="w-6 h-6 mr-2" />
          Contact
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-white' : selectedTemplate.textColor}`}>
          {formData.contact || 'Your contact info'}
        </p>
        <div className="flex gap-4 mt-2">
          {Object.entries(formData.socialMedia).map(([platform, url]) => {
            if (!url) return null;
            const SocialIcon = socialIcons[platform] || HeroIcons.LinkIcon;
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${darkMode ? 'text-white' : `text-${selectedTemplate.textColor}`} hover:opacity-80`}
              >
                <SocialIcon className="w-6 h-6" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href={portfolioUrl}
          download="portfolio.json"
          className={`inline-flex items-center p-2 ${darkMode ? 'bg-gray-600 text-white' : `${selectedTemplate.accentColor} text-white`} rounded hover:opacity-90`}
        >
          <HeroIcons.ArrowDownTrayIcon className=" enlistw-5 h-5 mr-1" />
          Download as JSON
        </a>
        <button
          onClick={handleShare}
          className={`inline-flex items-center p-2 ${darkMode ? 'bg-gray-600 text-white' : `${selectedTemplate.accentColor} text-white`} rounded hover:opacity-90`}
        >
          <HeroIcons.ShareIcon className="w-5 h-5 mr-1" />
          Copy Shareable Link
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`inline-flex items-center p-2 ${darkMode ? 'bg-gray-600 text-white' : `${selectedTemplate.accentColor} text-white`} rounded hover:opacity-90`}
        >
          <HeroIcons.DocumentArrowDownIcon className="w-5 h-5 mr-1" />
          Download as PDF
        </button>
        <button
          onClick={handleDownloadHTML}
          className={`inline-flex items-center p-2 ${darkMode ? 'bg-gray-600 text-white' : `${selectedTemplate.accentColor} text-white`} rounded hover:opacity-90`}
        >
          <HeroIcons.DocumentTextIcon className="w-5 h-5 mr-1" />
          Download as HTML
        </button>
      </div>

      {/* Live Chat Widget (Tawk.to) */}
      {selectedTemplate.enableChat && (
        <div className="fixed bottom-4 right-4">
          <div id="tawkto-widget"></div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPreview;