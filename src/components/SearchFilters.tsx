import React, { useState } from 'react';
import { FilterOptions, SortOption } from '../types';
import { useJobStore } from '../store/jobStore';

// Convert salary in rupees to LPA
const convertToLPA = (salaryInRupees: number): number => {
  return Math.round((salaryInRupees / 100000) * 100) / 100;
};

export const SearchFilters: React.FC = () => {
  const { filterOptions, setFilterOptions, sortOption, setSortOption } = useJobStore();
  const [salaryInput, setSalaryInput] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'minSalary') {
      setSalaryInput(value);
      if (value) {
        const salaryInRupees = Number(value);
        const salaryInLPA = convertToLPA(salaryInRupees);
        setFilterOptions({
          ...filterOptions,
          minSalary: salaryInLPA,
        });
      } else {
        setFilterOptions({
          ...filterOptions,
          minSalary: 0,
        });
      }
    } else {
      setFilterOptions({
        ...filterOptions,
        [name]: value,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={filterOptions.location}
            onChange={handleFilterChange}
            placeholder="Enter location"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min Salary
            <span className="text-xs text-gray-500 ml-1">(in Rupees)</span>
          </label>
          <input
            type="number"
            name="minSalary"
            value={salaryInput}
            onChange={handleFilterChange}
            placeholder="e.g., 2000000 for 20 LPA"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            name="industry"
            value={filterOptions.industry}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="Product Management">Product Management</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="salary">Highest Salary</option>
          </select>
        </div>
      </div>
    </div>
  );
};