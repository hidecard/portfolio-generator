import { useState } from 'react';
import jsPDF from 'jspdf';
import * as HeroIcons from '@heroicons/react/24/outline';

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
    doc.text(`Skills: ${formData.skills.map(s => s.name).join(', ') || 'Your skills'}`, 10, 60);
    doc.text(`Experience: ${formData.experience || 'Your experience'}`, 10, 80);
    doc.text(`Contact: ${formData.contact || 'Your contact info'}`, 10, 90);
    doc.text(`Social Media: ${Object.values(formData.socialMedia).filter(Boolean).join(', ') || 'No links provided'}`, 10, 100);
    doc.save('portfolio.pdf');
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
      className={`mt-6 p-6 shadow-md ${selectedTemplate.bgColor}`}
      style={containerStyle}
    >
      {/* About Section with Profile Picture */}
      <div className="mb-6">
        <h2 className={`flex items-center text-2xl font-bold ${selectedTemplate.textColor}`}>
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
            <p className={`text-lg ${selectedTemplate.textColor}`}>
              {formData.name || 'Your Name'}
            </p>
            <p className={`text-md ${selectedTemplate.textColor}`}>
              {formData.jobTitle || 'Job Title'}
            </p>
          </div>
        </div>
        <p className={`mt-2 ${selectedTemplate.textColor}`}>
          {formData.bio || 'Your bio goes here...'}
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${selectedTemplate.textColor}`}>
          <ExperienceIcon className="w-6 h-6 mr-2" />
          Experience
        </h2>
        <p className={`mt-2 ${selectedTemplate.textColor}`}>
          {formData.experience || 'Your experience'}
        </p>
      </div>

      {/* Skills Section (Collapsible on Mobile) */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${selectedTemplate.textColor}`}>
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
                    className={`flex items-center ${selectedTemplate.textColor}`}
                  >
                    <SkillIcon className="w-5 h-5 mr-2" />
                    {skill.name}
                  </li>
                );
              })
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

      {/* Contact Section with Social Media Links */}
      <div className="mb-6">
        <h2 className={`flex items-center text-xl font-semibold ${selectedTemplate.textColor}`}>
          <ContactIcon className="w-6 h-6 mr-2" />
          Contact
        </h2>
        <p className={`mt-2 ${selectedTemplate.textColor}`}>
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
                className={`text-${selectedTemplate.textColor} hover:opacity-80`}
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
          className={`inline-flex items-center p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          <HeroIcons.ArrowDownTrayIcon className="w-5 h-5 mr-1" />
          Download as JSON
        </a>
        <button
          onClick={handleShare}
          className={`inline-flex items-center p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          <HeroIcons.ShareIcon className="w-5 h-5 mr-1" />
          Copy Shareable Link
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`inline-flex items-center p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          <HeroIcons.DocumentArrowDownIcon className="w-5 h-5 mr-1" />
          Download as PDF
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