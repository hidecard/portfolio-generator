function TemplateSelector({ templates, selectedTemplate, setSelectedTemplate, customTheme, setCustomTheme, darkMode, setDarkMode }) {
  const handleCustomThemeChange = (e) => {
    const { name, value } = e.target;
    setCustomTheme({ ...customTheme, [name]: value });
    if (selectedTemplate.id === 'custom') {
      setSelectedTemplate({
        ...selectedTemplate,
        [name]: value,
      });
    }
  };

  const handleIconChange = (e) => {
    const { name, value } = e.target;
    const updatedIcons = { ...selectedTemplate.icons, [name]: value };
    setSelectedTemplate({
      ...selectedTemplate,
      icons: updatedIcons,
    });
    if (selectedTemplate.id === 'custom') {
      setCustomTheme({ ...customTheme, icons: updatedIcons });
    }
  };

  const handleChatToggle = () => {
    setSelectedTemplate({
      ...selectedTemplate,
      enableChat: !selectedTemplate.enableChat,
    });
    if (selectedTemplate.id === 'custom') {
      setCustomTheme({ ...customTheme, enableChat: !customTheme.enableChat });
    }
  };

  const iconOptions = [
    'UserIcon',
    'BriefcaseIcon',
    'LightBulbIcon',
    'EnvelopeIcon',
    'StarIcon',
    'BoltIcon',
  ];

  const fontOptions = [
    'Arial, sans-serif',
    'Roboto, sans-serif',
    'Open Sans, sans-serif',
    'Lora, serif',
  ];

  const borderOptions = ['rounded', 'sharp', 'extra-rounded'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className={`p-4 rounded-lg ${template.bgColor} ${template.textColor} ${
              selectedTemplate.id === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {template.name}
          </button>
        ))}
        <button
          onClick={() =>
            setSelectedTemplate({
              id: 'custom',
              name: 'Custom',
              bgColor: customTheme.bgColor,
              textColor: customTheme.textColor,
              accentColor: customTheme.accentColor,
              fontFamily: customTheme.fontFamily,
              borderStyle: customTheme.borderStyle,
              icons: customTheme.icons,
              enableChat: customTheme.enableChat,
            })
          }
          className={`p-4 rounded-lg ${customTheme.bgColor} ${customTheme.textColor} ${
            selectedTemplate.id === 'custom' ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          Custom
        </button>
      </div>

      {/* Theme Customization */}
      <h3 className="text-lg font-medium mb-2">Customize Theme</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Background Color</label>
          <input
            type="color"
            name="bgColor"
            value={customTheme.bgColor}
            onChange={handleCustomThemeChange}
            className="w-full h-10 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Text Color</label>
          <input
            type="color"
            name="textColor"
            value={customTheme.textColor}
            onChange={handleCustomThemeChange}
            className="w-full h-10 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Accent Color</label>
          <input
            type="color"
            name="accentColor"
            value={customTheme.accentColor}
            onChange={handleCustomThemeChange}
            className="w-full h-10 rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Font Family</label>
          <select
            name="fontFamily"
            value={customTheme.fontFamily}
            onChange={handleCustomThemeChange}
            className="p-2 border rounded w-full"
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font.split(',')[0]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Border Style</label>
          <select
            name="borderStyle"
            value={customTheme.borderStyle}
            onChange={handleCustomThemeChange}
            className="p-2 border rounded w-full"
          >
            {borderOptions.map((style) => (
              <option key={style} value={style}>
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Icon Customization */}
      <h3 className="text-lg font-medium mb-2">Section Icons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {['about', 'experience', 'skills', 'contact'].map((section) => (
          <div key={section}>
            <label className="block text-sm font-medium">
              {section.charAt(0).toUpperCase() + section.slice(1)} Icon
            </label>
            <select
              name={section}
              value={selectedTemplate.icons[section]}
              onChange={handleIconChange}
              className="p-2 border rounded w-full"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon.replace('Icon', '')}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Live Chat and Dark Mode Toggles */}
      <div className="flex gap-4">
        <label className="flex items-center text-sm font-medium">
          <input
            type="checkbox"
            checked={selectedTemplate.enableChat}
            onChange={handleChatToggle}
            className="mr-2"
          />
          Enable Live Chat
        </label>
        <label className="flex items-center text-sm font-medium">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="mr-2"
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
}

export default TemplateSelector;