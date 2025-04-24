
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchTeachersProps {
  onSearch: (filters: any) => void;
}

const subjects = [
  "Mathematics",
  "English Language",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Geography",
  "Literature",
  "Government",
  "Computer Science",
  "History",
  "Yoruba",
  "Igbo",
  "Hausa",
  "French",
];

const levels = [
  "Primary",
  "Junior Secondary",
  "Senior Secondary",
  "University",
  "Professional",
];

const SearchTeachers = ({ onSearch }: SearchTeachersProps) => {
  const [filters, setFilters] = useState({
    query: "",
    subject: "",
    level: "",
    availableNow: false,
  });

  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const toggleAvailableNow = () => {
    setFilters((prev) => ({
      ...prev,
      availableNow: !prev.availableNow,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search teachers by name, specialization..."
                className="pl-10"
                value={filters.query}
                onChange={(e) => handleChange("query", e.target.value)}
              />
            </div>
          </div>

          {/* Subject Select */}
          <Select
            value={filters.subject}
            onValueChange={(value) => handleChange("subject", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Level Select */}
          <Select
            value={filters.level}
            onValueChange={(value) => handleChange("level", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Education Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="availableNow"
              checked={filters.availableNow}
              onChange={toggleAvailableNow}
              className="mr-2 h-4 w-4 text-learn9ja-green focus:ring-learn9ja-green rounded border-gray-300"
            />
            <label htmlFor="availableNow" className="text-sm text-gray-700">
              Available for instant classes now
            </label>
          </div>

          <Button
            type="submit"
            className="bg-learn9ja-green hover:bg-learn9ja-green/90"
          >
            Search Teachers
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchTeachers;
