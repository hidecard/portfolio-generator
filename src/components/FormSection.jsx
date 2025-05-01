function FormSection({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      newSkill: { ...formData.newSkill, [name]: value },
    });
  };

  const handleAddSkill = () => {
    if (formData.newSkill.name && !formData.skills.some((s) => s.name === formData.newSkill.name)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill],
        newSkill: { name: '', icon: 'CheckCircleIcon' },
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s.name !== skillToRemove),
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: { ...formData.socialMedia, [name]: value },
    });
  };

  const iconOptions = [
    'CheckCircleIcon',
    'StarIcon',
    'BoltIcon',
    'FireIcon',
    'RocketIcon',
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <div className="col-span-2">
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="p-2 border rounded w-full col-span-2"
          rows="4"
        />
        <div className="col-span-2">
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Add a skill"
              value={formData.newSkill?.name || ''}
              onChange={handleSkillChange}
              className="p-2 border rounded w-full"
            />
            <select
              name="icon"
              value={formData.newSkill?.icon || 'CheckCircleIcon'}
              onChange={handleSkillChange}
              className="p-2 border rounded"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon.replace('Icon', '')}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddSkill}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {formData.skills.length > 0 && (
            <ul className="mt-2">
              {formData.skills.map((skill, index) => (
                <li key={index} className="flex items-center justify-between p-1">
                  <span>
                    {skill.icon.replace('Icon', '')}: {skill.name}
                  </span>
                  <button
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 5 years)"
          value={formData.experience}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact (e.g., email)"
          value={formData.contact}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <div className="col-span-2">
          <h3 className="text-lg font-medium mb-2">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.socialMedia.linkedin}
              onChange={handleSocialMediaChange}
              className="p-2 border rounded w-full"
            />
            <input
              type="url"
              name="github"
              placeholder="GitHub URL"
              value={formData.socialMedia.github}
              onChange={handleSocialMediaChange}
              className="p-2 border rounded w-full"
            />
            <input
              type="url"
              name="twitter"
              placeholder="Twitter URL"
              value={formData.socialMedia.twitter}
              onChange={handleSocialMediaChange}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormSection;