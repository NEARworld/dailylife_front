import { useState } from 'react';
import styled from 'styled-components/macro';

import useForm from '../../hooks/useForm';
import './signUp.scss';
import SignUpInput from './SignUpInput';

import { validate } from 'common/utils';
import SubmitButton from 'components/buttons/SubmitButton';
import AvatarIcon from 'components/Icons/AvatarIcon';

export interface PayloadType {
  username: string;
  email: string;
  userId: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const signUpData = {
    username: '',
    email: '',
    userId: '',
    password: '',
    passwordConfirm: '',
  };

  const [inputValues, setInputValues] = useState(signUpData);
  const activator = () => {
    const firstErrorMsg =
      validate(inputValues.username, 'username').username !== undefined;
    const secondErrorMsg =
      validate(inputValues.email, 'email').email !== undefined;
    const thirdErrorMsg =
      validate(inputValues.userId, 'userId').userId !== undefined;
    const fourthErrorMsg =
      validate(inputValues.password, 'password').password !== undefined;
    const fifthErrorMsg =
      validate(inputValues.passwordConfirm, 'password').password !== undefined;

    if (
      firstErrorMsg ||
      secondErrorMsg ||
      thirdErrorMsg ||
      fourthErrorMsg ||
      fifthErrorMsg
    )
      return false;
    return true;
  };
  const signUpInputData = [
    {
      type: 'text',
      reqId: 'username',
      title: '사용자 이름',
      setText: setInputValues,
      formType: 'username',
      limit: 20,
      placeholder: '사용자 이름',
    },
    {
      type: 'email',
      reqId: 'email',
      title: '이메일',
      setText: setInputValues,
      formType: 'email',
      limit: 30,
      placeholder: '이메일',
    },
    {
      type: 'text',
      reqId: 'userId',
      title: '아이디',
      setText: setInputValues,
      formType: 'userId',
      limit: 30,
      placeholder: '아이디',
    },
    {
      type: 'password',
      reqId: 'password',
      title: '비밀번호',
      setText: setInputValues,
      formType: 'password',
      limit: 15,
      placeholder: '비밀번호',
    },
    {
      type: 'password',
      reqId: 'passwordConfirm',
      title: '비밀번호 확인',
      setText: setInputValues,
      formType: 'password',
      limit: 15,
      placeholder: '비밀번호 확인',
    },
  ];
  const { handleSubmit } = useForm(signUpData);
  const [imageName, setImageName] = useState<string[]>([]);
  const [file, setFile] = useState('');
  const [fileImage, setFileImage] = useState<string>('');

  return (
    <SignUpWrapper>
      <form action="/signin" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className="register-form-wrapper">
          <p className="register-info-title">계정 생성</p>
          <div className="register-avatar-wrapper">
            <label className="register-avatar-lable" htmlFor="selectImg">
              <AvatarIcon width={78} height={78} image={fileImage} />
            </label>
            <input
              style={{ display: 'none' }}
              id="selectImg"
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files !== null) {
                  setFileImage(URL.createObjectURL(e.target.files[0]));
                  for (let i = 0; i < e.target.files.length; i += 1)
                    setFile(`${file} ${e.target.files[i].name}`);
                  setImageName([...imageName]);
                }
              }}
            />
          </div>
          <div className="register-input-container">
            {signUpInputData.map((item) => (
              <div className="register-input-wrapper">
                <SignUpInput
                  type={item.type}
                  title={item.title}
                  setText={item.setText}
                  formType={item.formType}
                  reqId={item.reqId}
                  limit={item.limit}
                  placeholder={item.placeholder}
                  width="100%"
                  height="auto"
                />
              </div>
            ))}
            <SubmitButton
              text="가입하기"
              height="50px"
              fontSize="17px"
              isActive={activator()}
              width="100%"
            />
          </div>
          {/* <button type="submit" className="register-form-submit-btn">
            가입하기
          </button> */}
        </div>
      </form>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
  position: relative;
  top: 8vh;
  width: 388px;
  height: 671px;

  background: #ffffff;
  box-shadow: 0px 0px 35px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  margin: auto;
`;

export default SignUp;
