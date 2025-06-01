"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProfileFormData } from '../types/form';

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    profileImage: null,
    project: '',
    techniques: [],
    tools: [],
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Store the file for later upload
    setFormData(prev => ({
      ...prev,
      profileImage: file
    }));
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>, field: 'techniques' | 'tools') => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError(null)

  try {
    // 1. Upload image if exists
    let imageUrl = formData.imageUrl
    if (formData.profileImage instanceof File) {
      const form = new FormData()
      form.append('file', formData.profileImage)
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: form
      })
      
      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({}))
        throw new Error(err.error || 'Image upload failed')
      }
      
      const uploadData = await uploadRes.json()
      imageUrl = uploadData.filename
    }

    // 2. Prepare profile data
    const profileData = {
      name: formData.name,
      project: formData.project,
      tools: formData.tools,
      imageUrl
    }

    // 3. Save profile
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    })

    const result = await res.json()
    if (!res.ok) throw new Error(result.error || 'Profile save failed')

    alert('Profile saved successfully!')
  } catch (error) {
    console.error('Submission error:', error)
    setError(error instanceof Error ? error.message : 'Unknown error')
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Complete Your Profile</h2>
      
      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gray-700 mb-4 overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
          <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white"
            required
          />
        </div>

        {/* Project */}
        <div>
          <label className="block text-gray-300 mb-2">Current Project</label>
          <textarea
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white min-h-[100px]"
            placeholder="Tell us about your current project..."
          />
        </div>

        {/* Techniques */}
        <div>
          <label className="block text-gray-300 mb-2">Technologies & Techniques</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-white">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL', 'REST API'].map((tech) => (
              <label key={tech} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tech}
                  checked={formData.techniques.includes(tech)}
                  onChange={(e) => handleArrayInput(e, 'techniques')}
                  className="accent-purple-500"
                />
                <span>{tech}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <label className="block text-gray-300 mb-2">Development Tools</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-white">
            {['VS Code', 'Git', 'Docker', 'Figma', 'Postman', 'Prisma'].map((tool) => (
              <label key={tool} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tool}
                  checked={formData.tools.includes(tool)}
                  onChange={(e) => handleArrayInput(e, 'tools')}
                  className="accent-purple-500"
                />
                <span>{tool}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 rounded-md font-medium transition"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}