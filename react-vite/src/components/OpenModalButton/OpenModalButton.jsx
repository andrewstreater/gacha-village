import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  imgSrc,
  onModalClose, // optional: callback function that will be called once the modal is closed
  srcClass
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation()
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };
  if (imgSrc) {
    return (
      <img src={imgSrc} className={srcClass} onClick={onClick} ></img>
    )
  }
  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
