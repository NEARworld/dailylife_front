import { Link } from 'react-router-dom';

import { getPublicURL } from 'common/utils';
import { postActions } from 'reducers/post';
import { updateSearchedKeyword } from 'reducers/searchResult';
import { useAppDispatch, useAppSelector } from 'store/hooks';

function NavLogo() {
  const store = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  return (
    <div className="nav-header">
      <button
        className="nav-title"
        onClick={() => {
          dispatch(postActions.updateIsLogoClicked(!store.isLogoClicked));
          dispatch(updateSearchedKeyword(''));
        }}
        type="button"
      >
        <Link to="/">
          <img src={`${getPublicURL()}/assets/logo.png`} alt="mainLogo" />
        </Link>
      </button>
    </div>
  );
}

export default NavLogo;
