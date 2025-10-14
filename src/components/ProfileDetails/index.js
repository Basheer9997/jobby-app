import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const ProfileDetails = props => {
  const renderSuccessView = () => {
    const {profileDetails} = props
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileDetails-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">Basheer Sheik</h1>
        <p className="profile-bio">Software Developer</p>
      </div>
    )
  }

  const renderFailureView = () => {
    const {getProfileDetails} = props
    return (
      <div className="failure-view-container">
        <button
          type="button"
          onClick={getProfileDetails}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="loading-view-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {profileApiStatus} = props

  switch (profileApiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView()
    case apiStatusConstants.failure:
      return renderFailureView()
    case apiStatusConstants.success:
      return renderSuccessView()
    default:
      return null
  }
}

export default ProfileDetails
