import styles from './Card.module.css';
import PropTypes from "prop-types";

import { suits } from './CartImages.js'; // Import the defined cards
const Card = ({ suit, rank}) => {
    const getCardImage = () => {
        return suits[suit][rank];
    };

    return (
        <div className={styles.cart}>
            <img src={getCardImage()} alt={`${rank} of ${suit}`}/>
        </div>
    );
};

Card.propTypes = {
    suit: PropTypes.string,
    rank: PropTypes.string,
};

Card.defaultProps = {
    suit: '',
    rank: '',
};

export default Card;
