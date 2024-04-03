import { useEffect, useReducer, useState } from "react";
import "./index.css";

import box from "./images/box.png";
import boxLid from "./images/box-lid.png";
// import ConfettiGenerator from "./CanvasConfetti";
import Confetti from "./confetti/Confetti";
import GiftModal from "./modal";
import Manat from "./images/manat.png";
import axios from "axios";

const init_state = {
  move: "move",
  jump: "",
  rotated: "",
  rotating: "",
};
export default function GiftBoxAnimation() {
  const [state, setState] = useReducer(
    (state, new_state) => ({
      ...state,
      ...new_state,
    }),
    init_state
  );

  const { move, rotating, rotated, jump } = state;

  const [salam, setSalam] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function animate() {
    setSalam(!salam);
    let isDone = rotated === "rotated" ? true : false;

    if (!isDone) {
      setState({ rotating: "rotating" });
      setTimeout(() => {
        setState({ jump: "jump" });
      }, 300);
      setTimeout(() => {
        setState({ rotated: "rotated" });
      }, 1000);
    } else {
      setState(init_state);
    }
    let moving = move === "move" ? "" : "move";
    setState({ move: moving });
  }

  const API = axios.create({ baseURL: "https://gift-be.onrender.com" });

  useEffect(() => {
    const getInfo = async () => {
      await API.get("/api/information");
    };

    // Call fetchData initially
    getInfo();

    // Call fetchData every 3 minutes
    const intervalId = setInterval(getInfo, 3 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      {!isOpenModal && (
        <>
          <Confetti open={jump === "jump"} />
          {!salam ? (
            <div style={{ marginTop: "180px" }}>
              <h2 style={{ color: "white", textShadow: "#f5f5f5 0 0 20px" }}>
                Salam!
              </h2>
              <h4 style={{ color: "white", textShadow: "#f5f5f5 0 0 20px" }}>
                Hədiyyənizi açın
              </h4>
            </div>
          ) : (
            <div>
              <div>
                <h2 style={{ color: "violet", textShadow: "violet  0 0 20px" }}>
                  təbrik edirəm
                </h2>
                <h4 style={{ color: "white", textShadow: "violet  0 0 20px" }}>
                  siz illik Render xeyriyyə təşkilatının 100 şanslı qalibindən
                  birisiniz.
                </h4>
              </div>
              <img src={Manat} width={200} />
              <h2 style={{ color: "yellow ", textShadow: "yellow  0 0 20px" }}>
                3000 AZN
              </h2>
              <button
                style={{
                  padding: "11px 17px",
                  border: "none",
                  borderRadius: "6px",
                  boxShadow: "white  0 0 20px",
                  background: "violet",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpenModal(true)}
              >
                Hədiyyəni götür
              </button>
            </div>
          )}

          <div className="img-container">
            <button className="box" onClick={() => animate()}>
              <img src={box} alt="box" />
            </button>
            <img
              className={`lid ${move} ${rotating} ${rotated}`}
              src={boxLid}
              alt="box-lid"
            />
          </div>
        </>
      )}
      <GiftModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
}
