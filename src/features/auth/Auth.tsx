import React, { useEffect, useRef, useState } from 'react';
import classes from './Auth.module.scss';
import Logo from 'src/assets/images/logo.png';
import Typography from 'src/components/typography/Typography';
import Scroll from 'src/components/scroll/Scroll';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Scrollbars from 'react-custom-scrollbars-2';
import RegistrationForm, {
  RegistrationFields,
} from 'src/features/auth/RegistrationForm';
import EmailForm, { EmailFields } from 'src/features/auth/EmailForm';
import { useNavigate } from 'react-router-dom';
import LoginForm, { LoginFields } from 'src/features/auth/LoginForm';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import {
  registrationAsync,
  checkEmailAsync,
  loginAsync,
} from 'src/app/app.slice';

const Auth: React.FC = () => {
  const boundActions = useBoundActions({
    registrationAsync,
    checkEmailAsync,
    loginAsync,
  });
  const status = useAppSelector((state) => state.app.status);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [authType, setAuthType] = useState<'email' | 'login' | 'registration'>(
    'email'
  );
  const scrollRef = useRef<Scrollbars>(null);
  useEffect(() => {
    if (scrollRef.current === null) return;
    setTimeout(() => {
      scrollRef.current?.scrollToBottom();
    }, 300);
  }, [scrollRef, authType]);

  const handleSubmitEmail = async (data: EmailFields): Promise<void> => {
    setEmail(data.email);
    const {
      data: { isExist },
    } = await boundActions.checkEmailAsync(data.email).unwrap();
    setAuthType((isExist as boolean) ? 'login' : 'registration');
  };
  const handleRegistration = async (
    data: RegistrationFields
  ): Promise<void> => {
    await boundActions.registrationAsync(data);
    navigate('/');
  };
  const handleLogin = (data: LoginFields): void => {
    void boundActions.loginAsync(data);
  };

  const forms = {
    email: (
      <EmailForm
        fetching={status === 'loading'}
        initialValues={{ email }}
        onSubmit={(data) => {
          void handleSubmitEmail(data);
        }}
      />
    ),
    registration: (
      <RegistrationForm
        fetching={status === 'loading'}
        initialValues={{
          password: '',
          confirmPassword: '',
          username: '',
          email,
        }}
        onSubmit={(data) => {
          void handleRegistration(data);
        }}
        onCancel={() => {
          setAuthType('email');
        }}
      />
    ),
    login: (
      <LoginForm
        fetching={status === 'loading'}
        initialValues={{ password: '', email }}
        onSubmit={handleLogin}
        onCancel={() => {
          setAuthType('email');
        }}
      />
    ),
  };

  return (
    <div className={classes.wrapper}>
      <Scroll ref={scrollRef}>
        <div className={classes.container}>
          <div className={classes.inner}>
            <div className={classes.logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={classes.textContainer}>
              <Typography size={'xxxxl'} weight={700}>
                Cheburnet
              </Typography>
              <SwitchTransition>
                <CSSTransition
                  timeout={{ enter: 300, exit: 200 }}
                  classNames={{
                    enter:
                      authType === 'email'
                        ? classes.enterReverse
                        : classes.enter,
                    enterActive: classes.enterActive,
                    exit: classes.exit,
                    exitActive: classes.exitActive,
                  }}
                  key={authType}
                >
                  <div className={classes.transition}>
                    <Typography weight={600} size={'m'} color={'secondary'}>
                      {authType === 'email'
                        ? 'Enter your email'
                        : 'Enter your data'}
                    </Typography>
                  </div>
                </CSSTransition>
              </SwitchTransition>
            </div>
            <SwitchTransition>
              <CSSTransition
                timeout={{ enter: 300, exit: 200 }}
                classNames={{
                  enter:
                    authType === 'email' ? classes.enter : classes.enterReverse,
                  enterActive: classes.enterActive,
                  exit: classes.exit,
                  exitActive: classes.exitActive,
                }}
                key={authType}
              >
                <div className={classes.transition}>{forms[authType]}</div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </Scroll>
    </div>
  );
};

export default Auth;
