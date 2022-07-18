import React from "react"
import { connect } from "react-redux"
import Profile from "./Profile"
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile-reducer"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { compose } from "redux"

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }
  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    // если нужного юзера не выбрано, получаем свой id
    // if (!userId) userId = this.props.userIdMe
    if (!userId) userId = this.props.userIdMe
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile}
        status={this.props.status} updateStatus={this.props.updateStatus} />
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  userIdMe: state.auth.userId,
  status: state.profilePage.status
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)
