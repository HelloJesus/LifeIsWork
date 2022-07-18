import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../assets/userPhoto.jpg'
import ProfileStatusWithHooks from './ProfileStatus';

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
      <div>
        <img className={classes.content_img} src="https://kartinkin.net/uploads/posts/2021-07/1627135437_5-kartinkin-com-p-anime-piksel-fon-anime-krasivo-7.png" />
      </div>
      <div className={classes.descriptionBlock}>
        <img className={classes.userPhoto} src={profile.photos.small != null ? profile.photos.small : userPhoto} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
}

export default ProfileInfo;