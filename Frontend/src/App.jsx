import { useState } from "react";
import "./App.css";

const products = [
  { name: "Midnight Oud", category: "Perfumes", price: 4500, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600" },
  { name: "Golden Bloom", category: "Perfumes", price: 3800, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600" },
  { name: "Rose Essence", category: "Perfumes", price: 3200, image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600" },
  { name: "Royal Musk", category: "Perfumes", price: 4200, image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600" },
  { name: "Amber Touch", category: "Perfumes", price: 3500, image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600" },

  { name: "Hydrating Face Cream", category: "Skincare", price: 2200, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600" },
  { name: "Daily Face Serum", category: "Skincare", price: 1800, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600" },
  { name: "Gentle Cleanser", category: "Skincare", price: 1500, image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600" },
  { name: "Glow Moisturizer", category: "Skincare", price: 2000, image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600" },
  { name: "Skin Care Kit", category: "Skincare", price: 3500, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600" },

  { name: "Classic Shirt", category: "Fashion", price: 2800, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
  { name: "Premium Hoodie", category: "Fashion", price: 4200, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },
  { name: "Casual Jacket", category: "Fashion", price: 5500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
  { name: "Everyday T-Shirt", category: "Fashion", price: 1800, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600" },
  { name: "Urban Outfit", category: "Fashion", price: 4800, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" },

  { name: "Classic Watch", category: "Accessories", price: 3500, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600" },
  { name: "Premium Sunglasses", category: "Accessories", price: 2200, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600" },
  { name: "Leather Wallet", category: "Accessories", price: 1800, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600" },
  { name: "Elegant Bracelet", category: "Accessories", price: 1500, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600" },
  { name: "Premium Bag", category: "Accessories", price: 3200, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600" },

  { name: "Luxury Gift Box", category: "Gift Sets", price: 5000, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600" },
  { name: "Perfume Gift Set", category: "Gift Sets", price: 6500, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600" },
  { name: "Self Care Box", category: "Gift Sets", price: 4200, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600" },
  { name: "Special Gift Pack", category: "Gift Sets", price: 3800, image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600" },
  { name: "Signature Collection", category: "Gift Sets", price: 7500, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600" },
];

const categories = [
  "All",
  "Perfumes",
  "Skincare",
  "Fashion",
  "Accessories",
  "Gift Sets",
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoggedIn(true);
  }

  async function handlePlaceOrder() {
    if (cart.length === 0) {
      setOrderMessage("Your cart is empty!");
      return;
    }

    setPlacingOrder(true);
    setOrderMessage("");

    try {
      const response = await fetch(
        "https://three-minds-azure.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price, 0),
            customerEmail: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Order could not be placed.");
      }

      setOrderMessage(data.message || "Order received successfully!");
      setCart([]);
    } catch (err) {
      setOrderMessage("Backend connection failed. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  }

  if (!loggedIn) {
    return (
      <main className="login-page">
        <section className="login-card">
          <p className="brand-small">THREE MINDS</p>
          <div className="gold-line"></div>

          <h1>Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to explore our collection.
          </p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button className="login-button" type="submit">
              LOGIN
            </button>
          </form>

          <p className="login-footer">
            A little luxury, a lot of personality.
          </p>
        </section>
      </main>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="store">
      <div className="announcement">
        THREE MINDS — A WORLD OF EVERYDAY LUXURY
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          THREE MINDS
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#collections">Collections</a>
          <a href="#products">Shop</a>
          <a href="#story">About Us</a>
        </nav>

        <div className="nav-right">
          <button onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">THE ART OF LIVING BEAUTIFULLY</p>

          <h1>
            Find Your
            <br />
            <em>Signature.</em>
          </h1>

          <p>
            Discover fragrances, skincare and timeless essentials
            made to express you.
          </p>

          <a href="#products" className="gold-button">
            EXPLORE COLLECTION
          </a>
        </div>

        <div className="hero-image"></div>
      </section>

      <section className="categories-section" id="collections">
        <p className="eyebrow">CURATED FOR YOU</p>
        <h2>Our Collections</h2>

        <div className="category-grid">
          {categories.slice(1).map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                document.getElementById("products").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="products">
        <p className="eyebrow">THE THREE MINDS EDIT</p>
        <h2>Discover Our Products</h2>

        <input
          className="search-box"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-buttons">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <img src={product.image} alt={product.name} />

              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>

              <p className="price">
                Rs. {product.price.toLocaleString("en-PK")}
              </p>

              <button
                onClick={() => {
                  setCart([...cart, product]);
                  setOrderMessage("");
                }}
              >
                ADD TO CART
              </button>
            </article>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Your Cart ({cart.length})</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  className="cart-item"
                  key={`${item.name}-${index}`}
                >
                  <span>{item.name}</span>

                  <span>
                    Rs. {item.price.toLocaleString("en-PK")}
                  </span>

                  <button
                    onClick={() => {
                      setCart(
                        cart.filter((_, i) => i !== index)
                      );
                      setOrderMessage("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h3>
                Total: Rs.{" "}
                {cart
                  .reduce((total, item) => total + item.price, 0)
                  .toLocaleString("en-PK")}
              </h3>

              <button
                className="place-order-button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
              >
                {placingOrder
                  ? "PLACING ORDER..."
                  : "PLACE ORDER"}
              </button>
            </>
          )}

          {orderMessage && (
            <p className="order-message">{orderMessage}</p>
          )}
        </div>
      </section>

      <section className="story-section" id="story">
        <p className="eyebrow">OUR PHILOSOPHY</p>
        <h2>About THREE MINDS</h2>

        <p>
          Three Minds is a lifestyle and fashion brand created with one
          vision: to bring elegance, quality and confidence into everyday
          life. We offer a carefully selected collection of perfumes,
          skincare, fashion, accessories and luxury gift sets.
        </p>

        <h3>Three Perspectives. One Vision.</h3>
      </section>

      <footer className="main-footer">
        <div className="footer-grid">
          <div>
            <h2>THREE MINDS</h2>
            <p>Three Perspectives. One Vision.</p>
            <p>Discover luxury in everyday life.</p>
          </div>

          <div>
            <h3>ABOUT US</h3>
            <p>
              Three Minds is a lifestyle brand offering perfumes,
              skincare, fashion, accessories and luxury gift sets.
            </p>
          </div>

          <div>
            <h3>FOLLOW US</h3>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook — THREE MINDS
            </a>
          </div>

          <div>
            <h3>CONTACT US</h3>
            <p>Malik Hussnain</p>
            <a href="tel:03078888550">03078888550</a>
            <a href="mailto:hussnainmalik740@gmail.com">
              hussnainmalik740@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 THREE MINDS. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;