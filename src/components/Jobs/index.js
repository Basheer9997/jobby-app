import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsDetailsList: [],
    jobsApiStatus: apiStatusConstants.initial,
    activeEmploymentId: [],
    activeSalaryRangeId: '',
    searchInput: '',
    activeLocationsIds: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  updateActiveEmployment = employmentId => {
    const {activeEmploymentId} = this.state
    let updateEmploymentList = activeEmploymentId
    if (activeEmploymentId.includes(employmentId)) {
      updateEmploymentList = activeEmploymentId.filter(
        eachId => eachId !== employmentId,
      )
    } else {
      updateEmploymentList = [...updateEmploymentList, employmentId]
    }
    this.setState(
      {activeEmploymentId: updateEmploymentList},
      this.getJobDetails,
    )
  }

  updateActiveLocation = locationId => {
    const {activeLocationsIds} = this.state
    let updateLocationsIds = activeLocationsIds
    if (activeLocationsIds.includes(locationId)) {
      updateLocationsIds = activeLocationsIds.filter(
        eachLocationId => eachLocationId !== locationId,
      )
    } else {
      updateLocationsIds = [...activeLocationsIds, locationId]
    }
    this.setState({activeLocationsIds: updateLocationsIds})
  }

  updateActiveSalaryRange = salaryId => {
    this.setState({activeSalaryRangeId: salaryId}, this.getJobDetails)
  }

  getJobDetails = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const token = Cookies.get('jwt_token')
    const {activeEmploymentId, activeSalaryRangeId, searchInput} = this.state
    const activeEmploymentIds = activeEmploymentId.join(',')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIds}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsDetailsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const profileDetails = fetchedData.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderSearchBar = searchBarId => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container" id={searchBarId}>
        <input
          type="search"
          placeholder="Search"
          className="search-bar"
          value={searchInput}
          onChange={event => this.setState({searchInput: event.target.value})}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              this.getJobDetails()
            }
          }}
        />
        <button
          className="search-button"
          type="button"
          data-testid="searchButton"
          onClick={this.getJobDetails}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {
      profileDetails,
      profileApiStatus,
      activeEmploymentId,
      activeSalaryRangeId,
      activeLocationsIds,
    } = this.state
    return (
      <div className="profile-FiltersGroup-container">
        <ProfileDetails
          profileDetails={profileDetails}
          profileApiStatus={profileApiStatus}
          getProfileDetails={this.getProfileDetails}
        />
        <hr className="hr-line" />
        <FiltersGroup
          updateActiveEmployment={this.updateActiveEmployment}
          updateActiveSalaryRange={this.updateActiveSalaryRange}
          updateActiveLocation={this.updateActiveLocation}
          activeEmploymentId={activeEmploymentId}
          activeSalaryRangeId={activeSalaryRangeId}
          activeLocationsIds={activeLocationsIds}
        />
      </div>
    )
  }

  renderJobsLoadingView = () => (
    <div className="loading-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="jobs-no-data-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsDetailsList, activeLocationsIds} = this.state
    const updatedJobsDetailsList =
      activeLocationsIds.length === 0
        ? jobsDetailsList
        : jobsDetailsList.filter(eachJob =>
            activeLocationsIds.some(
              loc => loc.toLowerCase() === eachJob.location.toLowerCase(),
            ),
          )

    console.log(updatedJobsDetailsList)

    return (
      <>
        {updatedJobsDetailsList.length > 0 ? (
          <ul className="jobs-details-list-container">
            {updatedJobsDetailsList.map(eachJob => (
              <JobCard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="api-failure-heading">Oops! Something Went Wrong</h1>
      <p className="api-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getJobDetails}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobsDetails = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-content-container">
          {this.renderSearchBar('smallSearchBar')}
          {this.renderProfileDetails()}
          <div className="job-details-container">
            {this.renderSearchBar('largeSearchBar')}
            {this.renderJobsDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
