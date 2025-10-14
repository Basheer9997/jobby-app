import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="jobItemDetails-link">
        <div className="job-item-container">
          <div className="job-logo-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="fill-star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-internship-package-container">
            <div className="location-internship-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="internship-container">
                <BsFillBriefcaseFill className="briefcase-icon" />
                <p className="internship-text">{employmentType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>
          <hr className="hr-line" />
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
