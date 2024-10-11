

interface ButtonProps {
  label: string;
  action: () => void;
  image: string;
  buttonClass: string;
  ImgClass: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({label, action, image, buttonClass, ImgClass}) => {
    return (
      <button
      onClick={action}
      className={buttonClass}>
      <img src={image} className={ImgClass} />
      <p>{label}</p>
    </button>
    )
  }
  
  export default ButtonComponent;