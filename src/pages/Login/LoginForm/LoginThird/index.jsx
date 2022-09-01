import styled from 'styled-components';

function LoginThird() {
  return (
    <ThirdParty>
      <span>간편 로그인</span>
      <KakaoIcon
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        className="kakao"
      >
        <rect width="37.5" height="37.5" transform="translate(-3.75 -3.75)" fill="#EDE64E" />
        <path
          d="M15 7.69423C16.6272 7.69423 18.1323 8.01064 19.5151 8.64345C20.8979 9.27626 21.9911 10.1368 22.7946 11.2249C23.5982 12.3131 24 13.5 24 14.7857C24 16.0715 23.5982 17.2601 22.7946 18.3516C21.9911 19.4431 20.8996 20.3053 19.5201 20.9381C18.1406 21.5709 16.6339 21.8873 15 21.8873C14.4844 21.8873 13.952 21.8505 13.4029 21.7768C11.019 23.4308 9.75 24.2679 9.59598 24.288C9.52232 24.3148 9.45201 24.3114 9.38504 24.2779C9.35826 24.2578 9.33817 24.2311 9.32478 24.1976C9.31138 24.1641 9.30469 24.134 9.30469 24.1072V24.067C9.34487 23.8058 9.64955 22.7177 10.2188 20.8025C8.92634 20.1596 7.90011 19.3075 7.14007 18.2461C6.38002 17.1847 6 16.0313 6 14.7857C6 13.5 6.40179 12.3131 7.20536 11.2249C8.00893 10.1368 9.10212 9.27626 10.4849 8.64345C11.8677 8.01064 13.3728 7.69423 15 7.69423Z"
          fill="black"
        />
      </KakaoIcon>
    </ThirdParty>
  );
}

export default LoginThird;

const ThirdParty = styled.div`
  margin-top: 20.25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KakaoIcon = styled.svg`
  border-radius: 50%;
`;
