import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthContext from '../context/context';

import { Header } from './HeaderView';
import { Footer } from './FooterView';

const Form = styled.form`
  width: 450px;
`;

const FormTitle = styled.h1`
  color: #fff;
  font-size: 47px;
  letter-spacing: 5px;
`;

const LabelForm = styled.label`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  color: #fff;
  font-size: 20px;
`;

const LabelText = styled.span`
  margin-bottom: 15px;
`;

const FormInput = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: none;
  outline: none;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #fff;
  color: #000046;
  font-weight: 700;
  border: none;
  :hover {
    cursor: pointer;
    background-color: #07306f;
    color: #fff;
  }
`;

const FormButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const FormContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #000046, #1cb5e0);
`;

export const RegisterView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email cannot be empty');
  const [passwordError, setPasswordError] = useState(
    'Password cannot be empty'
  );
  const [nameError, setNameError] = useState('The name cannot be empty');

  const [formValid, setFormValid] = useState(false);
  const { setUser, onLogIn } = useContext(AuthContext);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return nameHandler(value);
      case 'email':
        return emailHandler(value);
      case 'password':
        return passwordHandler(value);
      default:
        return;
    }
  };

  const emailHandler = (value) => {
    setEmail(value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (value) => {
    setPassword(value);
    if (value.length < 7 || value.length > 15) {
      setPasswordError(
        'Password must be longer than 7 and less than 15 characters'
      );
      if (!value) {
        setPasswordError('Password cannot be empty');
      }
    } else {
      setPasswordError('');
    }
  };

  const nameHandler = (value) => {
    setName(value);
    if (value.length < 2) {
      setNameError('The name should not be shorter than 2 characters');
      if (!value) {
        setNameError('The name cannot be empty');
      }
    } else {
      setNameError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'name':
        setNameDirty(true);
        break;
      default:
        setEmailDirty(false) && setPasswordDirty(false) && setNameDirty(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, email, password });
    onLogIn();

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Header />
      <FormContainer>
        <FormTitle>Registration form</FormTitle>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <LabelForm>
            <LabelText>Name</LabelText>
            {nameDirty && nameError && (
              <div style={{ color: 'red' }}>{nameError}</div>
            )}
            <FormInput
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={(e) => blurHandler(e)}
              placeholder="Enter your name..."
            />
          </LabelForm>

          <LabelForm>
            <LabelText>Email</LabelText>
            {emailDirty && emailError && (
              <div style={{ color: 'red' }}>{emailError}</div>
            )}
            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={(e) => blurHandler(e)}
              placeholder="Enter your email..."
            />
          </LabelForm>

          <LabelForm>
            <LabelText>Password</LabelText>
            {passwordDirty && passwordError && (
              <div style={{ color: 'red' }}>{passwordError}</div>
            )}
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={(e) => blurHandler(e)}
              placeholder="Enter your password..."
            />
          </LabelForm>

          <FormButtonContainer>
            <FormButton disabled={!formValid} type="submit">
              Registration
            </FormButton>
          </FormButtonContainer>
        </Form>
      </FormContainer>
      <Footer />
    </>
  );
};
