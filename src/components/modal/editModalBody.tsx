import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./editmodalbody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { showDelConfModalAction, closeModalAction } from "../../redux/modal/actionsModal";
import {
  wantDelGameAction,
  doNotWantDelEditGameAction,
  getGameDataAction,
  editGameAction,
  createGameAction,
} from "../../redux/games/actionsGames";
import InputTextAdmin from "../elements/inputTextAdmin";
import InputNumberAdmin from "../elements/inputNumberAdmin";
import TextArea from "../elements/textArea";
import { ReducerState } from "../../redux/reducerRoot";

const ageArr = [6, 7, 11, 13, 15, 16, 18];

const genreArr = ["action-adventure", "first-person shooter", "fighting game", "survival game", "nonlinear gameplay"];

const EditModalBody: React.FC = () => {
  const gameData = useSelector((state: ReducerState) => state.games.gameWantToEdit);
  const { title, category, price, imgUrl, description, age, genre, id, rating } = gameData;

  const incomGenreArr = genre ? genre.split(", ") : ["fighting game"];
  const incomcategoryArr = category ? category.split(", ") : ["", "", ""];
  const [pcGenre, psGenre, xbxGenre] = incomcategoryArr;
  const [titleInp, setTitleInp] = useState<string>(title || "");
  const [categoryInp, setCategoryInp] = useState(incomGenreArr[0]);
  const [priceInp, setPriceInp] = useState<number>(price || 0.99);
  const [imgUrlInp, setImgUrlInp] = useState<string>(imgUrl || "");
  const [descriptionInp, setDescriptionInp] = useState<string>(description);
  const [ageInp, setAgeInp] = useState<number>(age);
  const [pcCheckedInp, setPcCheckedInp] = useState<boolean>(Boolean(pcGenre));
  const [psCheckedInp, setPsCheckedInp] = useState<boolean>(Boolean(psGenre));
  const [xbxCheckedInp, setXbxCheckedInp] = useState<boolean>(Boolean(xbxGenre));
  const [formValid, setFormValid] = useState<boolean>(false);
  const dispatch = useDispatch();

  const outerTabRef = useRef<HTMLDivElement | null>(null);
  const topTabRef = useRef<HTMLElement | null>(null);
  const bottomTabRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    const topTab = focusableElements[0];
    topTabRef.current = topTab;
    setTimeout(() => topTabRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const focusableElements = Array.from<HTMLElement>(outerTabRef.current?.querySelectorAll("[type]") ?? []);
    if (formValid) {
      const bottomTab = focusableElements[focusableElements.length - 1];
      bottomTabRef.current = bottomTab;
    } else {
      const bottomTab = focusableElements[focusableElements.length - 2];
      bottomTabRef.current = bottomTab;
    }
    bottomTabRef.current.focus();
    console.log(bottomTabRef.current);
  }, [formValid]);

  const location = useLocation();
  let partOfUrl = "/";
  if (location.pathname.includes("pc")) {
    partOfUrl = "?category_like=pc";
  }
  if (location.pathname.includes("ps")) {
    partOfUrl = "?category_like=ps";
  }
  if (location.pathname.includes("xbx")) {
    partOfUrl = "?category_like=xbx";
  }

  const finalPc = pcCheckedInp ? "pc" : null;
  const finalPs = psCheckedInp ? "ps" : null;
  const finalXbx = xbxCheckedInp ? "xbx" : null;
  const categories = [finalPc, finalPs, finalXbx];
  const finalCategory = categories.filter((categor) => Boolean(categor)).join(", ");
  const finalRating = rating || 4;

  const closeHandler = () => {
    dispatch(closeModalAction());
    dispatch(doNotWantDelEditGameAction());
  };

  const deleteHandler = () => {
    dispatch(showDelConfModalAction());
    const delGameObj = {
      id,
      title: titleInp,
      imgUrl: imgUrlInp,
      price: Number(priceInp),
      description: descriptionInp,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
    };
    dispatch(wantDelGameAction(delGameObj));
  };

  const titleGetter = (nameData: string) => {
    setTitleInp(nameData);
  };

  const priceGetter = (priceData: number) => {
    if (Number(priceData) <= 0.01 && Number(priceData) > 999) {
      return;
    }
    const num = Number(Math.round(priceData * 100) / 100);
    setPriceInp(num);
  };

  const imgUrlGetter = (imgUrlData: string) => {
    setImgUrlInp(imgUrlData);
  };

  const descriptionGetter = (inputName: string) => {
    setDescriptionInp(inputName);
  };

  const submitHandlerEdit = () => {
    const editGameObj = {
      id,
      title: titleInp,
      imgUrl: imgUrlInp,
      price: Number(priceInp),
      description: descriptionInp,
      rating: finalRating,
      age: Number(ageInp),
      genre: categoryInp,
      category: finalCategory,
    };
    dispatch(getGameDataAction(editGameObj));
    dispatch(editGameAction(editGameObj, partOfUrl));
    dispatch(closeModalAction());
  };

  const createGameObj = {
    title: titleInp,
    imgUrl: imgUrlInp,
    price: priceInp,
    description: descriptionInp,
    rating: 4,
    age: Number(ageInp),
    genre: categoryInp,
    category: finalCategory,
  };

  useEffect(() => {
    if (
      Boolean(createGameObj.title) !== false &&
      Boolean(createGameObj.imgUrl) !== false &&
      Boolean(createGameObj.price) !== false &&
      Boolean(createGameObj.description) !== false &&
      Boolean(createGameObj.rating) !== false &&
      Boolean(createGameObj.category) !== false
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [titleInp, imgUrlInp, priceInp, descriptionInp, finalCategory]);

  const submitHandlerCreate = () => {
    dispatch(getGameDataAction(createGameObj));
    dispatch(createGameAction(createGameObj, partOfUrl));
    dispatch(closeModalAction());
  };

  const pcCheckHandler = () => {
    setPcCheckedInp(!pcCheckedInp);
  };

  const onKeyUpPc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPcCheckedInp(!pcCheckedInp);
    }
  };

  const psCheckHandler = () => {
    setPsCheckedInp(!psCheckedInp);
  };

  const onKeyUpPs = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPsCheckedInp(!psCheckedInp);
    }
  };

  const xbxCheckHandler = () => {
    setXbxCheckedInp(!xbxCheckedInp);
  };

  const onKeyUpXbx = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setXbxCheckedInp(!xbxCheckedInp);
    }
  };

  const onKeyDownFunk = (e: React.KeyboardEvent) => {
    if (document.activeElement === bottomTabRef.current && e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      topTabRef.current?.focus();
    }
    if (document.activeElement === topTabRef.current && e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      bottomTabRef.current?.focus();
    }
    if (e.key === "Escape") {
      closeHandler();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div className="editModal__container" ref={outerTabRef} onKeyDown={onKeyDownFunk} role="note">
      <div className="editModal__upper_container">
        <h1 className="editModal__title">Edit card</h1>
        <button className="editModal__closeBtn" type="button" onClick={closeHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="editModal__content_container">
        <div className="editModal__contentImg_container">
          <p className="editModal__contentImg_title">Card image</p>
          <img className="editModal__contentImg_img" src={imgUrlInp} alt="Here will be pic of game" />
        </div>
        <div className="editModal__contentForm_container">
          <p className="editModal__contentForm_title">Information</p>
          <form className="editModal__contentForm_form">
            <InputTextAdmin name="Name" id="titleInput" type="text" onChange={titleGetter} value={titleInp} />
            <label htmlFor="genre" className="editModal__contentForm_labelGen">
              <p className="editModal__contentForm_paragraph">Category</p>
              <select
                className="editModal__contentForm_genre"
                id="genre"
                onChange={(e) => setCategoryInp(e.target.value)}
                value={categoryInp}
              >
                {genreArr.map((gen) => (
                  <option value={gen} key={gen}>
                    {gen}
                  </option>
                ))}
              </select>
            </label>
            <InputNumberAdmin name="Price" id="priceInput" type="number" onChange={priceGetter} value={priceInp} />
            <InputTextAdmin name="Image" id="imgUrlInput" type="text" onChange={imgUrlGetter} value={imgUrlInp} />
            <TextArea name="Description" id="Description" onChange={descriptionGetter} value={descriptionInp} />
            <label htmlFor="age" className="editModal__contentForm_labelAge">
              <p className="editModal__contentForm_paragraph">Age</p>
              <select
                className="editModal__contentForm_age"
                id="age"
                onChange={(e) => {
                  setAgeInp(Number(e.target.value));
                }}
                value={ageInp}
              >
                {ageArr.map((ageOp) => (
                  <option value={ageOp} key={ageOp}>
                    {ageOp}
                  </option>
                ))}
              </select>
            </label>
            <p className="editModal__contentForm_platformTitle">Platgorm</p>
            <label htmlFor="PC" className="editModal__contentForm_labelPc">
              PC
              <input
                type="checkbox"
                className="editModal__contentForm_PcCheck"
                checked={pcCheckedInp}
                onChange={pcCheckHandler}
                onKeyUp={onKeyUpPc}
              />
            </label>
            <label htmlFor="PS" className="editModal__contentForm_labelPs">
              PlayStation 5
              <input
                type="checkbox"
                className="editModal__contentForm_PsCheck"
                checked={psCheckedInp}
                onChange={psCheckHandler}
                onKeyUp={onKeyUpPs}
              />
            </label>
            <label htmlFor="XBX" className="editModal__contentForm_labelXbx">
              XBox One
              <input
                type="checkbox"
                className="editModal__contentForm_XbxCheck"
                checked={xbxCheckedInp}
                onChange={xbxCheckHandler}
                onKeyUp={onKeyUpXbx}
              />
            </label>
            {gameData.title ? (
              <div className="editModal__contentForm_btnContainer">
                <button type="button" className="editModal__contentForm_btn" onClick={submitHandlerEdit}>
                  Submit
                </button>
                <button type="button" className="editModal__contentForm_btn" onClick={deleteHandler}>
                  Delete card
                </button>
              </div>
            ) : (
              <div className="editModal__contentForm_btnContainer">
                <button
                  type="button"
                  className="editModal__contentForm_btn"
                  onClick={submitHandlerCreate}
                  disabled={!formValid}
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModalBody;
