import './styles.css';

type Props = {
  price: number;
};

const ProductPrice = function (props: Props) {
  const { price } = props;

  const priceStr = price.toLocaleString('pt-BR');

  const [integer = '0', decimal = '00'] = priceStr.split(',');

  return (
    <div className="product-price-container">
      <span className="product-price-currency">R$</span>
      <div className="text-primary product-price-value">
        <h3 className="product-price-value-integer">{integer}</h3>
        <h4>,{decimal}</h4>
      </div>
    </div>
  );
};

export default ProductPrice;
