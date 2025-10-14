import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-item">
      <div className="similar-job-container">
        <div className="job-logo-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobsCard
