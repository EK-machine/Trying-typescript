import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartgame.css";
import { CartGameProps } from "../../types/types";
import { changeGameCheckAction, changeGameAmountAction } from "../../redux/cart/actionsCart";
import { ReducerState } from "../../redux/reducerRoot";

const CartGame: React.FC<CartGameProps> = ({ title, category, price }) => {
  const games = useSelector((state: ReducerState) => state.cart.gamesList);
  const [checked, setChecked] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);
  const dispatch = useDispatch();
  const platforms = category.split(", ");

  const amountHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (!(e.target.value <= 0)) {
      const num = Math.floor(e.target.value);
      setNumber(num);
      const amountGame = games.filter((game) => game.title === title);
      amountGame[0].amount = num;
      dispatch(changeGameAmountAction(amountGame));
    }
  };

  const checkHandler = () => {
    setChecked(!checked);
    const checkedGame = games.filter((game) => game.title === title);
    checkedGame[0].check = !checked;
    dispatch(changeGameCheckAction(checkedGame));
  };

  const totalPerGame = number * price;
  const totalPerGameCut = Math.floor(totalPerGame * 100) / 100;

  return (
    <div className="cartGame__container">
      <div className="cartGame__data_name cartGame__data_container">
        <p className="cartGame__data_paragraphName">{title}</p>
      </div>
      <div className="cartGame__data_platform cartGame__data_container">
        <select className="cartGame__platform_selector">
          {platforms.map((platform) => (
            <option value={platform} key={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div className="cartGame__data_date cartGame__data_container">
        <p className="cartGame__data_paragraphDate">date</p>
      </div>
      <div className="cartGame__data_amount cartGame__data_container">
        <input type="number" value={number} onChange={amountHandler} className="cartGame__amount_input" />
      </div>
      <div className="cartGame__data_price cartGame__data_container">
        <p className="cartGame__data_paragraphPrice">{totalPerGameCut}</p>
      </div>
      <div className="cartGame__data_check cartGame__data_container">
        <input type="checkbox" checked={checked} onChange={checkHandler} />
      </div>
    </div>
  );
};

export default CartGame;