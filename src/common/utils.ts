interface Result {
  ok: boolean;
  data?: any;
  message?: string;
}

const methodFormat = (callbackfunc: Function) => {
  const method = async (...args: any[]) => {
    let result: Result = {
      ok: false,
    };
    try {
      const data = await callbackfunc(...args);
      result = {
        ok: true,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        result = {
          ok: false,
          message: error.message,
        };
      }
    }
    return result;
  };
  return method;
};

interface IValidationResult<T> {
  userId: T;
  password: T;
  username: T;
  email: T;
}

const validate = (value: string, formType: string) => {
  let isValidate = true;
  const userIdRegex = /^[a-z][a-z\d]{3,11}$/;
  const userIdNumberRegex = /[0-9]/;
  const passwordRegexArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&]/];
  // const usernameRegex = /^[a-z][a-z\d]{2,}$/;
  const usernameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|0-9]{2,20}$/;
  const emailRegex = /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/;
  const errorMessage = {
    userId: '아이디는 영문자로 시작하고 숫자를 포함한 4~12글자입니다.',
    password: '비밀번호는 숫자/문자/특수문자를 포함한 8~15자리입니다.',
    username: '닉네임은 2글자 이상입니다.',
    email: '이메일 형식이 아닙니다. 다시 입력해주세요.',
  };
  const validtaionResult: IValidationResult<string | undefined> = {
    userId: undefined,
    password: undefined,
    username: undefined,
    email: undefined,
  };

  if (formType === 'userId') {
    if (!(userIdRegex.test(value) || userIdNumberRegex.test(value))) {
      isValidate = false;
    }
  }
  if (formType === 'password') {
    passwordRegexArr.forEach((el) => {
      if (!el.test(value)) {
        isValidate = false;
      }
    });
  }
  if (formType === 'username') {
    if (!usernameRegex.test(value)) {
      isValidate = false;
    }
  }
  if (formType === 'email') {
    if (!emailRegex.test(value)) {
      isValidate = false;
    }
  }

  if (!isValidate) {
    validtaionResult[formType] = errorMessage[formType];
  } else {
    validtaionResult[formType] = '';
  }
  return validtaionResult;
};

const getCommentDate = (replyDate: string) => {
  const [sec, min, hour, day, week] = [
    1,
    60,
    3600,
    86400,
    86400 * 7,
    2592000,
    2592000 * 12,
  ];
  const today = new Date();
  const formattedDate = new Date(
    `${replyDate[0]}-${replyDate[1]}-${replyDate[2]} ${replyDate[3]}:${replyDate[4]}:${replyDate[5]}`,
  );
  const elapsedTime = Math.trunc(
    (today.getTime() - formattedDate.getTime()) / 1000,
  );
  let elapsedText = '';

  if (elapsedTime < sec || elapsedTime === undefined) elapsedText = '지금';
  else if (elapsedTime < min) elapsedText = `${elapsedTime}초`;
  else if (elapsedTime < hour)
    elapsedText = `${Math.trunc(elapsedTime / min)}분`;
  else if (elapsedTime < day)
    elapsedText = `${Math.trunc(elapsedTime / hour)}시간`;
  else if (elapsedTime < week)
    elapsedText = `${Math.trunc(elapsedTime / day)}일`;
  else elapsedText = `${Math.trunc(elapsedTime / week)}주`;
  return elapsedText;
};

const getAccessToken = (): string => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken !== null) return accessToken;
  return 'No Access Token';
};

const getPublicURL = (): string => {
  const publicURL = process.env.PUBLIC_URL;
  if (publicURL !== undefined) return publicURL;
  return '';
};

export { methodFormat, validate, getCommentDate, getAccessToken, getPublicURL };
