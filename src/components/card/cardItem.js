import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import styled from "styled-components";
import { postActions } from "../../reducers/post";
import { selectedPostActions } from "../../reducers/selectedPostData";

const CardItemText = styled.p``;

function CardItem(props) {
  // console.log(props);
  const dispatch = useDispatch();
  const openModal = (to) => {
    // window.location.href = "/#open-modal";
    props.setModalOpacity(1);
  };
  function handleClick() {
    openModal();
    dispatch(
      selectedPostActions.updateData({
        boardNum: props.boardNum,
        src: props.src,
        title: props.title,
        content: props.content,
      })
    );
  }

  // like start

  const [like, setLike] = useState(props.heartState);

  const Fullheart = "/assets/fullHeart.png";
  const Emptyheart = "/assets/heart.png";

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/api/board/getBoard`, {
        headers: {
          "X-ACCESS-TOKEN": localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(postActions.updateItems(res.data));
      })
      .catch((res) => {
        console.log(res);
      });
    console.log("props.heartState:", props.heartState);
  }, [like]);
  const clickHeartEvent = (e) => {
    e.stopPropagation();
    setLike(!like);
    axios
      .post(
        `${process.env.REACT_APP_HOST}/api/heart/boardHeartPlus`,
        {
          boardNum: props.boardNum,
        },
        {
          headers: {
            "X-ACCESS-TOKEN": localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => console.log(res));
  };

  // like end

  return (
    <>
      <li className="cards__item" onClick={handleClick}>
        <figure className="cards__item__pic-wrap">
          <img className="cards__item__img" alt="img" src={props.src} />
          <div className="cards__item__gradientBar" />
        </figure>
        <div className="cards__item__info">
          <h5 className="cards__item__text">{props.title}</h5>
          {/* like */}
          <span className="cards__like__container">
            <img
              className="cards__item__like"
              onClick={clickHeartEvent}
              src={like ? Fullheart : Emptyheart}
              alt="like"
            />
          </span>
          <p className="cards__item__underInfo">{props.content}</p>
        </div>
      </li>
    </>
  );
}

export default CardItem;
