import React, { useState, useEffect } from 'react';
import candidatesData from '../../candidates.json';
import "../pages/Employer.css"

function EmployerSearch() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [results, setResults] = useState([]);
  const [availableTechnologies, setAvailableTechnologies] = useState([]);

  useEffect(() => {
    setPeople(candidatesData);
    setResults(candidatesData); // Initially, show all results

    // Get available technologies
    const technologies = candidatesData.reduce((acc, person) => {
      person.technology.forEach(tech => {
        if (!acc.includes(tech)) {
          acc.push(tech);
        }
      });
      return acc;
    }, []);

    setAvailableTechnologies(technologies);
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleTechnologyChange = (event) => {
    const technology = event.target.value;
    if (event.target.checked) {
      setFilteredTechnologies([...filteredTechnologies, technology]);
    } else {
      setFilteredTechnologies(filteredTechnologies.filter(item => item !== technology));
    }
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    if (event.target.checked) {
      setFilteredCities([city]);
    } else {
      setFilteredCities([]);
    }
  };

  const handleExperienceChange = (event) => {
    const experience = event.target.value;
    if (event.target.checked) {
      setFilteredExperiences([experience]);
    } else {
      setFilteredExperiences([]);
    }
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    if (event.target.checked) {
      setFilteredRoles([role]);
    } else {
      setFilteredRoles([]);
    }
  };

  useEffect(() => {
    const filteredResults = people.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase()) &&
      (filteredTechnologies.length === 0 || filteredTechnologies.includes(person.technology[0])) &&
      (filteredCities.length === 0 || filteredCities.includes(person.city)) &&
      (filteredExperiences.length === 0 || filteredExperiences.includes(person.experience)) &&
      (filteredRoles.length === 0 || filteredRoles.includes(person.role))
    );
    setResults(filteredResults);
  }, [search, people, filteredTechnologies, filteredCities, filteredExperiences, filteredRoles]);

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <div className="">
          <h1 className="text-3xl font-bold mb-4">People Search</h1>
          <div className="bg-neutral-200 ">
            <h1 className='italic font-bold text-2xl '>Filter By: </h1>
            <div className='bg-neutral-300 '>
              <h2 className='italic font-bold '>Technology:</h2>
              {availableTechnologies.map((technology, index) => (
                <div key={index} className="inline-grid px-1 text-sm  ">
                  <input
                    type="checkbox"
                    id={`technology-${index}`}
                    value={technology}
                    onChange={handleTechnologyChange}
                    className="mr-2"
                  />
                  <label htmlFor={`technology-${index}`}>{technology}</label>
                </div>
              ))}
            </div>
            <div className='bg-neutral-300'>
              <h2 className='italic font-bold '>City:</h2>
              {Array.from(new Set(people.map((person) => person.city))).map((city, index) => (
                <div key={index} className="mb-1 inline-grid px-1">
                  <input
                    type="checkbox"
                    id={`city-${index}`}
                    value={city}
                    onChange={handleCityChange}
                    className="mr-2"
                  />
                  <label htmlFor={`city-${index}`}>{city}</label>
                </div>
              ))}
            </div>
            <div className='bg-neutral-300'>
              <h2 className='italic font-bold '>Experience:</h2>
              <div className="flex justify-center">
                {Array.from(new Set(people.map((person) => person.experience))).map((experience, index) => (
                  <div key={index} className="px-2 rounded">
                    <input
                      type="checkbox"
                      id={`experience-${index}`}
                      value={experience}
                      onChange={handleExperienceChange}
                      className="mr-2"
                    />
                    <label htmlFor={`experience-${index}`}>{experience}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-neutral-300'>
              <h2 className='italic font-bold'>Role:</h2>
              <div className="flex flex-wrap">
                {Array.from(new Set(people.map((person) => person.role))).map((role, index) => (
                  <div key={index} className="flex justify-center px-2">
                    <input
                      type="checkbox"
                      id={`role-${index}`}
                      value={role}
                      onChange={handleRoleChange}
                      className="mr-2"
                    />
                    <label htmlFor={`role-${index}`}>{role}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Results */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Results</h1>
          <div className="grid grid-cols-2 gap-4">
            {results.map((person) => (
              <div key={person.id} className="border p-4 rounded bg-neutral-300">
                <strong>Name:</strong> {person.name}<br />
                <strong>Email:</strong> {person.email}<br />
                <strong>Age:</strong> {person.age}<br />
                <strong>City:</strong> {person.city}<br />
                <strong>Experience:</strong> {person.experience}<br />
                <strong>Technology:</strong> {person.technology.join(', ')}<br />
                <strong>Role:</strong> {person.role}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerSearch;
