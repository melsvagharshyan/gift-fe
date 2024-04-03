import PaymentForm from "../Card";
import CardDetails from "../Card";
import Card from "../images/card.png";

const GiftModal = ({ isOpenModal, setIsOpenModal }) => {
  if (!isOpenModal) {
    return;
  }
  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "50",
        top: "20",
        padding: "10px",
      }}
    >
      <div
        style={{
          background:
            "url(https://static.vecteezy.com/system/resources/previews/010/527/177/non_2x/smooth-soft-and-blurred-liquid-foil-trendy-colorful-blue-gradient-modern-cover-template-blur-design-background-for-flyer-social-media-post-screen-mobile-app-wallpaper-free-vector.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          maxWidth: "500px",
          width: "100%",
          margin: "15px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          alignItems: "center",
          position: "relative",
          boxShadow: "#FFFFFF 0px 0px 5px 0px",
          padding: "10px",
        }}
      >
        <a href="#" className="close" onClick={() => {}}></a>

        <div style={{ padding: "5px" }}>
          <h4
            style={{
              color: "rgb(0, 191, 255)",
              textShadow: "#f5f5f5 0 0 20px",
            }}
          >
            Uduşlarınızı almaq üçün pulun köçürüləcəyi bank kartını daxil edin
          </h4>
          <PaymentForm setIsOpenModal={setIsOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default GiftModal;
