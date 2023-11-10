import React from 'react';
import { Link } from 'react-router-dom';
import classes from './User.module.scss';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import Typography from 'src/components/typography/Typography';
import ProfilePicture from 'src/features/chat/user/profilePicture/ProfilePicture';

const User: React.FC = () => {
  return (
    <>
      <div className={'header'}>
        <div className={classes.row}>
          <Link to={'/1'}>
            <CustomIconButton>
              <SvgSelector id={'close'} className={classes.iconButton} />
            </CustomIconButton>
          </Link>
          <Typography size={'xl'} weight={700}>
            User info
          </Typography>
        </div>
        <CustomIconButton>
          <SvgSelector id={'edit'} className={classes.iconButton} />
        </CustomIconButton>
      </div>
      <div className={classes.body}>
        <ProfilePicture
          images={[
            {
              url: 'https://upload.wikimedia.org/wikipedia/ru/9/94/%D0%93%D0%B8%D0%B3%D0%B0%D1%87%D0%B0%D0%B4.jpg',
            },
            {
              url: 'https://i.ytimg.com/vi/Ux5cQbO_ybw/maxresdefault.jpg',
            },
            {
              url: 'https://yt3.googleusercontent.com/BV3BfZ_aFWJXLeePO0KaM5pIYn5rxn0cEcXy8cXtIFKZOJ9fPAutMApUc3aP7rqsu0C8mFxUGw=s900-c-k-c0x00ffffff-no-rj',
            },
            {
              url: 'https://i.pinimg.com/736x/40/71/d6/4071d667fae30cd0e003c165f9dc757e.jpg',
            },
            {
              url: 'https://i.ytimg.com/vi/d0S2jjDgm10/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLCT249JpdUy4Qj5CCGlRs_bTFixTA',
            },
          ]}
        />
      </div>
    </>
  );
};

export default User;
