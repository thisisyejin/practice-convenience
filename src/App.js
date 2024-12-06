import OutputView from './OutputView.js';
import Product from './Product.js';
import Promotion from './Promotion.js';
import Cart from './Cart.js';

class App {
  async run() {
    Product.initialize();
    Promotion.initialize();
    OutputView.printStock(Product.list);

    await Cart.shopping();
    Cart.adjustQuantity();
  }
}

export default App;
