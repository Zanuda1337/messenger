import React, { useEffect, useRef, useState } from 'react';
import classes from './Auth.module.scss';
import Logo from 'src/assets/images/logo.png';
import Typography from 'src/components/typography/Typography';
import Scroll from 'src/components/scroll/Scroll';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Scrollbars from 'react-custom-scrollbars-2';
import RegistrationForm from 'src/features/auth/RegistrationForm';
import EmailForm, { EmailFields } from 'src/features/auth/EmailForm';
import { useNavigate } from 'react-router-dom';
import LoginForm from 'src/features/auth/LoginForm';

const checkEmail = async (): Promise<{ isUserExist: boolean }> =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isUserExist: true });
    }, 500);
  });

const registration = async (): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 500);
  });
};

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('');
  const [authType, setAuthType] = useState<'email' | 'login' | 'registration'>(
    'email'
  );
  const [fetching, setFetching] = useState(false);
  const scrollRef = useRef<Scrollbars>(null);
  useEffect(() => {
    if (scrollRef.current === null) return;
    setTimeout(() => {
      scrollRef.current?.scrollToBottom();
    }, 300);
  }, [scrollRef, authType]);

  const handleSubmitEmail = async (data: EmailFields): Promise<void> => {
    setRememberMe(data.rememberMe);
    setEmail(data.email);
    console.log('submit');
    setFetching(true);
    const { isUserExist } = await checkEmail();
    setFetching(false);
    setAuthType(isUserExist ? 'login' : 'registration');
  };
  const handleRegistration = async (): Promise<void> => {
    setFetching(true);
    await registration();
    setFetching(false);
    navigate('/');
  };
  const handleLogin = async (): Promise<void> => {
    setFetching(true);
    await registration();
    setFetching(false);
    navigate('/');
  };

  const forms = {
    email: (
      <EmailForm
        fetching={fetching}
        initialValues={{ email, rememberMe }}
        onSubmit={(data) => {
          void handleSubmitEmail(data);
        }}
      />
    ),
    registration: (
      <RegistrationForm
        fetching={fetching}
        initialValues={{
          password: '',
          confirmPassword: '',
          username: '',
          email,
          rememberMe,
        }}
        onSubmit={() => {
          void handleRegistration();
        }}
        onCancel={() => {
          setAuthType('email');
        }}
      />
    ),
    login: (
      <LoginForm
        fetching={fetching}
        initialValues={{ password: '', email, rememberMe }}
        onSubmit={() => {
          void handleLogin();
        }}
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
