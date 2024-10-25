import styles from "./iconButton.module.css";

interface IconButtonProps {
  iconUrl: string;
  onClick: () => void;
  alt?: string;
}

const IconButton = ({ iconUrl, alt = "", onClick }: IconButtonProps) => {
  return (
    <div className={`${styles.iconButtonContainer}`} onClick={onClick}>
      <img src={iconUrl} alt={alt} className={`${styles.iconImg}`} />
    </div>
  );
};

export default IconButton;
