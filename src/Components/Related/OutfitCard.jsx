import React, { useState, useEffect, useContext } from 'react';
import { ContextObj } from '../../ContextObj.jsx';
import './styles.css';
import { getServer, grabReviewScore } from '../../helpers';
import actionImg from '../../assets/outfits-x.svg';
import missingImg from '../../assets/pants.svg';
import StarRating from '../StarRatings';

const OutfitCard = ({cardInfo, myOutfits, setMyOutfits}) => {

  const { productId, productInfo, setProductId, ratingAvg, stylesInfo, reviewMetaObj } = useContext(ContextObj);

  const [isOutfitAdded, setIsOutfitAdded] = useState(false);

  useEffect(() => {
    setIsOutfitAdded(false);
  }, [productId]);

  const addOutfit = (id) => {
    if (!isOutfitAdded) {
      let photo = stylesInfo.results[0].photos[0].thumbnail_url || missingImg;
      setIsOutfitAdded(true);
      let itemDetails = {
        productId: productId,
        name: productInfo.name,
        category: productInfo.category,
        thumbnail: photo,
        originalPrice: stylesInfo.results[0].original_price,
        salePrice: stylesInfo.results[0].sale_price,
        rating: ratingAvg,
        features: productInfo.features
      };
      setMyOutfits(prevState => {
        let temp = prevState.slice();
        temp.push(itemDetails);
        return temp;
      });
    }
  };

  const removeOutfit = (id) => {
    setMyOutfits(prevState => {
      let temp = prevState.slice();
      for (let i = 1; i < prevState.length; i++) {
        if (prevState[i].productId === id) {
          temp = temp.slice(0, i).concat(temp.slice(i + 1));
          break;
        }
      }
      return temp;
    });
  };

  const saleDiv = () => {
    if (cardInfo.salePrice) {
      return (
        <div>
          <span style='text-decoration: line-through'>${cardInfo.originalPrice}</span>
          <span style='color: red'>${cardInfo.salePrice}</span>
        </div>
      );
    } else {
      return (<div>${cardInfo.originalPrice}</div>);
    }
  };

  if (cardInfo.productId === 'Add') {
    return (
      <div>
        <div className='productCard add' onClick={() => addOutfit(productId)}>
          <div className='card-wrapper'>
            <div className='addPhoto'>+</div>
          </div></div>
      </div>
    );
  }

  return (
    <div>
      <div className='productCard'>
        <img className='actionButton' src={actionImg} onClick={() => removeOutfit(cardInfo.productId)} alt='Remove outfit'/>
        <div className='card-wrapper' onClick={() => setProductId(cardInfo.productId)}>
          <div><img className='relatedPhoto' src={cardInfo.thumbnail} alt={cardInfo.name}/></div>
          <div>{cardInfo.category}</div>
          <div>{cardInfo.name}</div>
          {saleDiv()}
          <div className='starCard'>
            <StarRating rating={cardInfo.rating} />
          </div></div>
      </div>
    </div>
  );

};

export default OutfitCard;