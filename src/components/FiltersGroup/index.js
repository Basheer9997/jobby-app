import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobLocationsList = [
  {
    locationId: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    locationId: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    locationId: 'CHENNAI',
    label: 'Chennai',
  },
  {
    locationId: 'DELHI',
    label: 'Delhi',
  },
  {
    locationId: 'MUMBAI',
    label: 'Mumbai',
  },
]

const FiltersGroup = props => {
  const {
    updateActiveEmployment,
    updateActiveSalaryRange,
    updateActiveLocation,
    activeEmploymentId,
    activeSalaryRangeId,
    activeLocationsIds,
  } = props

  const handleEmploymentChange = event => {
    updateActiveEmployment(event.target.id)
  }

  const handleSalaryChange = event => {
    updateActiveSalaryRange(event.target.id)
  }

  const handleLocationChange = event => {
    console.log(event.target.value)
    updateActiveLocation(event.target.id)
  }

  const renderEmploymentTypesList = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list-container">
        {employmentTypesList.map(eachEmploymentType => (
          <li
            className="filter-list-item"
            key={eachEmploymentType.employmentTypeId}
          >
            <input
              type="checkbox"
              id={eachEmploymentType.employmentTypeId}
              className="filter-input"
              onChange={handleEmploymentChange}
              checked={activeEmploymentId.includes(
                eachEmploymentType.employmentTypeId,
              )}
            />
            <label
              className="filter-label"
              htmlFor={eachEmploymentType.employmentTypeId}
            >
              {eachEmploymentType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalaryRangesList = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list-container">
        {salaryRangesList.map(eachSalaryRange => (
          <li className="filter-list-item" key={eachSalaryRange.salaryRangeId}>
            <input
              type="radio"
              id={eachSalaryRange.salaryRangeId}
              className="filter-input"
              onChange={handleSalaryChange}
              checked={activeSalaryRangeId === eachSalaryRange.salaryRangeId}
            />
            <label
              className="filter-label"
              htmlFor={eachSalaryRange.salaryRangeId}
            >
              {eachSalaryRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderJobLocationsList = () => (
    <>
      <h1 className="filter-heading">Locations</h1>
      <ul className="filter-list-container">
        {jobLocationsList.map(eachLocation => (
          <li className="filter-list-item" key={eachLocation.locationId}>
            <input
              type="checkbox"
              id={eachLocation.locationId}
              value={eachLocation.label}
              className="filter-input"
              onChange={handleLocationChange}
              checked={activeLocationsIds.includes(eachLocation.locationId)}
            />
            <label className="filter-label" htmlFor={eachLocation.locationId}>
              {eachLocation.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filters-container">
      {renderEmploymentTypesList()}
      <hr className="hr-line" />
      {renderSalaryRangesList()}
      <hr className="hr-line" />
      {renderJobLocationsList()}
    </div>
  )
}

export default FiltersGroup
