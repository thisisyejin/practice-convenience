import OutputView from './OutputView.js';
import Product from './Product.js';
import Promotion from './Promotion.js';
import Cart from './Cart.js';

class App {
  async run() {
    Promotion.initialize();
    Product.initialize();
    OutputView.printStock();

    await Cart.shopping();
    Cart.adjustQuantity();
  }
}

export default App;
