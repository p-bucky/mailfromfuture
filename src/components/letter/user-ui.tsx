import React, { useState } from 'react'
import { useLetterProgram } from './letter-data-access'

export const UserList = () => {
  const { users } = useLetterProgram()
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 ml-5">
      <div className="space-y-4">
        {users?.data?.map((user) => (
          <div key={user.account.name} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.account.name}`}
              alt={`${user.account.name}'s avatar`}
              className="w-12 h-12 rounded-full flex-shrink-0 bg-gray-200"
            />
            <div className="flex-1">
              <h2 className="text-base font-medium text-gray-900">{user.account.name}</h2>
              <p className="text-sm text-gray-500 ">{user.account.bio || 'No status'}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="fixed bottom-6 right-6 bg-white rounded-full p-3 shadow-lg">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
    </div>
  )
}

export const CreateUser = () => {
  const { createUser } = useLetterProgram()

  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    bio: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUser.mutateAsync(formData)
      console.log('User created successfully:', formData)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Create User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 text-start">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={20}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                text-white placeholder-gray-400"
            required
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-300 mb-2 text-start">
            Sex
          </label>
          <input
            type="text"
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            maxLength={1}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                text-white placeholder-gray-400"
            required
            placeholder="M/F"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2 text-start">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength={50}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                text-white placeholder-gray-400 h-32 resize-none"
            required
            placeholder="Tell us about yourself..."
          />
          <p className="mt-1 text-sm text-gray-400">{formData.bio.length}/50 characters</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium 
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Create Profile
        </button>
      </form>
    </div>
  )
}
