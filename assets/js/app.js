/* app.js — FoodieHub frontend logic
   - Holds sample data (foods, categories, reviews)
   - Renders page-specific UI
   - Cart and theme persisted in localStorage
*/

const DATA_KEY = 'fh_data_v1';
const CART_KEY = 'fh_cart';
const THEME_KEY = 'fh_theme';

const sample = (function(){
  const categories = ['Nigerian','Rice & Pasta','Grills','Soups & Stews','Snacks','Desserts'];
  const foods = [
    {id:1,  name:'Chicken Pepper Sauce',   category:'Nigerian',      price:5500,  rating:4.9, desc:'Tender chicken slow-cooked in rich, smoky pepper sauce.',         image:'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80'},
    {id:2,  name:'Fluffy Pancakes',        category:'Desserts',      price:3500,  rating:4.8, desc:'Golden stacked pancakes drizzled with maple syrup.',              image:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80'},
    {id:3,  name:'Banana Pancake Stack',   category:'Desserts',      price:3800,  rating:4.9, desc:'Soft pancakes layered with fresh banana slices & honey drizzle.', image:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80'},
    {id:4,  name:'Suya Skewers',           category:'Grills',        price:4500,  rating:4.8, desc:'Spiced beef skewers with yaji powder & sliced onion.',            image:'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=800&q=80'},
    {id:5,  name:'Tomato Cream Soup',      category:'Soups & Stews', price:4000,  rating:4.7, desc:'Velvety roasted tomato bisque with cream & fresh herbs.',         image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80'},
    {id:6,  name:'Nigerian Curry Stew',    category:'Nigerian',      price:5500,  rating:4.6, desc:'Hearty stew with chunky vegetables, chicken & aromatic spices.',  image:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80'},
    {id:7,  name:'Steamed Rice Bowl',      category:'Rice & Pasta',  price:4000,  rating:4.7, desc:'Fluffy steamed white rice with a side of warm miso soup.',        image:'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80'},
    {id:8,  name:'Pumpkin Bisque',         category:'Soups & Stews', price:4500,  rating:4.7, desc:'Silky roasted pumpkin soup with cinnamon & toasted seeds.',       image:'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80'},
    {id:9,  name:'Yam Fries',              category:'Snacks',        price:1800,  rating:4.5, desc:'Crispy golden yam fries with a side of spiced dipping sauce.',    image:'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&q=80'},
    {id:10, name:'BBQ Beef Ribs',          category:'Grills',        price:5500,  rating:4.8, desc:'Slow-smoked beef ribs glazed with tangy BBQ sauce.',             image:'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80'},
    {id:11, name:'Fried Chicken',           category:'Snacks',        price:4500,  rating:4.7, desc:'Crispy golden fried chicken seasoned with a secret spice blend.',  image:'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80'},
    {id:12, name:'Pepperoni Pizza',        category:'Snacks',        price:14000, rating:4.6, desc:'Classic thin-crust with spicy pepperoni & mozzarella.',           image:'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80'},
    {id:13, name:'Beef Burger',            category:'Grills',        price:9500,  rating:4.5, desc:'Juicy smashed beef patty, melted cheese & gherkins.',             image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80'},
    {id:14, name:'Jerk Chicken',           category:'Grills',        price:12000, rating:4.7, desc:'Caribbean-style marinated chicken, charred & smoky.',             image:'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80'},
    {id:15, name:'Nigerian Fried Rice',    category:'Rice & Pasta',  price:5000,  rating:4.6, desc:'Stir-fried rice with mixed vegetables, chicken & spices.',        image:'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80'},
    {id:16, name:'Creamy Penne Pasta',     category:'Rice & Pasta',  price:7500,  rating:4.4, desc:'Penne tossed in a light cream sauce with fresh herbs & chilli.',  image:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80'},
    {id:17, name:'Naan & Tikka Masala',    category:'Soups & Stews', price:11000, rating:4.6, desc:'Creamy chicken tikka masala with warm charred garlic naan.',      image:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80'},
    {id:18, name:'Crispy French Fries',    category:'Snacks',        price:2000,  rating:4.5, desc:'Golden crispy fries seasoned with sea salt & smoked paprika.',    image:'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=800&q=80'},
    {id:19, name:'Glazed Donuts',          category:'Desserts',      price:2500,  rating:4.8, desc:'Soft chocolate-glazed donuts with rainbow sprinkles.',            image:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80'},
    {id:20, name:'Chapman Mocktail',       category:'Desserts',      price:2500,  rating:4.7, desc:"Nigeria's favourite chilled fruit mocktail with Angostura bitters.", image:'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80'}
  ];
  const reviews = [
    {name:'Chidinma',  text:'The Chicken Pepper Sauce is unmatched — smoky and perfect every time!', rating:5},
    {name:'Tunde',     text:'Suya Skewers arrived hot and well-spiced. Will definitely order again.', rating:5},
    {name:'Blessing',  text:'Great mix of Nigerian and international options. Love the Shawarma!', rating:4},
    {name:'Emeka',     text:'BBQ Ribs were fall-off-the-bone tender. Excellent portions.', rating:5},
    {name:'Fatima',    text:'Fast delivery and the Glazed Donuts were still fresh. Amazing!', rating:4}
  ];
  return {categories, foods, reviews, restaurant:{name:'FoodieHub', phone:'08124393536', email:'chidiebereonyili@gmail.com'}};
})();

/* LocalStorage helpers */
function getCart(){return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}
function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart)); renderCartCount();}
function addToCart(itemId,qty=1){
  const cart=getCart();
  const existing=cart.find(i=>i.id===itemId);
  if(existing){existing.qty+=qty}else{cart.push({id:itemId,qty})}
  saveCart(cart); showToast('Added to cart');}
function removeFromCart(itemId){let cart=getCart();cart=cart.filter(i=>i.id!==itemId);saveCart(cart);showToast('Removed from cart')}
function updateQty(itemId,qty){let cart=getCart();const it=cart.find(i=>i.id===itemId);if(it){it.qty=qty<1?1:qty;saveCart(cart)}}

/* Theme */
function initTheme(){
  const saved=localStorage.getItem(THEME_KEY)||'light';
  document.documentElement.setAttribute('data-theme',saved);
}
function toggleTheme(){const cur=document.documentElement.getAttribute('data-theme')||'light';const next=cur==='light'?'dark':'light';document.documentElement.setAttribute('data-theme',next);localStorage.setItem(THEME_KEY,next)}

/* Toast */
let toastTimer=null;function showToast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2000)}

/* Utilities */
function findFood(id){return sample.foods.find(f=>f.id===Number(id))}
const currencyFormatter = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 });
function formatPrice(v){
  try{return currencyFormatter.format(Number(v))}catch(e){return '₦'+Number(v).toFixed(2)}
}

/* Renderers */
function renderFeatured(){const el=document.getElementById('featured-list');if(!el)return;el.innerHTML='';const list=sample.foods.slice(0,6);list.forEach(f=>{el.insertAdjacentHTML('beforeend',cardHTML(f))});}
function renderCategories(){const row=document.getElementById('categories-row');const filter=document.getElementById('categoryFilter');if(row)row.innerHTML='';if(filter){filter.innerHTML='<option value="all">All Categories</option>'}
  sample.categories.forEach(c=>{if(row){const btn=document.createElement('button');btn.className='category';btn.textContent=c;btn.onclick=()=>location.href='menu.html?cat='+encodeURIComponent(c);row.appendChild(btn)}
    if(filter){const opt=document.createElement('option');opt.value=c;opt.textContent=c;filter.appendChild(opt)}})
}
function renderTestimonials(){
  const el=document.getElementById('testimonials-row');
  if(!el) return;
  // clear previous
  el.innerHTML='';
  sample.reviews.forEach(r=>{
    const t=document.createElement('article');
    t.className='testimonial';
    const initial = (r.name||'?').charAt(0).toUpperCase();
    const stars = Array(Math.round(r.rating)).fill('★').join('');
    t.innerHTML = `
      <div class="meta">
        <div class="avatar" aria-hidden="true">${initial}</div>
        <div style="margin-left:8px"><strong>${r.name}</strong><div class="rating-stars">${stars} <span class="muted">${r.rating}</span></div></div>
      </div>
      <div class="quote">${r.text}</div>
    `;
    el.appendChild(t);
  });
  // simple auto-scroll carousel (safe-guard: only one interval)
  try{
    if(el._testimonialInterval) clearInterval(el._testimonialInterval);
    const first = el.querySelector('.testimonial');
    if(first){
      const step = first.offsetWidth + 12;
      el._testimonialInterval = setInterval(()=>{
        if(el.scrollWidth - el.scrollLeft <= el.clientWidth + 10){ el.scrollTo({left:0,behavior:'smooth'}) }
        else { el.scrollBy({left:step,behavior:'smooth'}) }
      },4000);
    }
  }catch(e){console.warn('testimonial scroll init',e)}
}
function cardHTML(f){
  return `
  <article class="card" data-id="${f.id}" onclick="(function(e){if(e.target.closest('button'))return;window.location='food-details.html?id=${f.id}';})(event)" style="cursor:pointer">
    <figure class="card-figure">
      <img src="${f.image}" alt="${f.name}" loading="lazy" width="320" height="200">
      <div style="position:absolute;left:10px;top:10px"><span class="category-badge">${f.category}</span></div>
    </figure>
    <div class="card-body">
      <div class="card-info">
        <h3 class="card-title">${f.name}</h3>
        <div class="card-meta muted">${f.desc}</div>
      </div>
      <div class="card-actions">
        <span class="price-pill">${formatPrice(f.price)}</span>
        <span class="rating-pill">${f.rating}★</span>
        <button class="add-btn" onclick="addToCart(${f.id},1)">Add</button>
      </div>
    </div>
  </article>`
}

/* Menu page */
function renderMenuGrid(list){const g=document.getElementById('menu-grid');if(!g)return;g.innerHTML='';list.forEach(f=>g.insertAdjacentHTML('beforeend',cardHTML(f)))}
function initMenu(){const search=document.getElementById('searchInput');const filter=document.getElementById('categoryFilter');const sort=document.getElementById('sortSelect');
  const urlParams=new URLSearchParams(location.search);const initialCat=urlParams.get('cat');
  if(initialCat && filter) filter.value=initialCat;
  function apply(){let out=sample.foods.slice();const q=search?search.value.trim().toLowerCase():'',cat=filter?filter.value:'all';if(q)out=out.filter(f=>f.name.toLowerCase().includes(q));if(cat && cat!=='all')out=out.filter(f=>f.category===cat);
    const s=sort?sort.value:'popular';
    if(s==='price-asc') out.sort((a,b)=>a.price-b.price);
    if(s==='price-desc') out.sort((a,b)=>b.price-a.price);
    if(s==='rating') out.sort((a,b)=>b.rating - a.rating);
    renderMenuGrid(out);
  }
  if(search)search.addEventListener('input',apply);if(filter)filter.addEventListener('change',apply);if(sort)sort.addEventListener('change',apply);apply();}

/* Food details */
function renderFoodDetail(){
  const el=document.getElementById('food-detail');
  if(!el) return;
  const params=new URLSearchParams(location.search);
  const id=params.get('id');
  const f=findFood(id);
  if(!f){el.innerHTML='<div class="fd-not-found"><p>Item not found.</p><a class="btn-primary" href="menu.html">Back to Menu</a></div>';return}

  // update page title
  document.title = `FoodieHub — ${f.name}`;

  const stars = '★'.repeat(Math.round(f.rating)) + '☆'.repeat(5-Math.round(f.rating));
  const inCart = getCart().find(i=>i.id===f.id);
  const cartQty = inCart ? inCart.qty : 1;

  el.innerHTML = `
    <!-- Hero banner -->
    <div class="fd-hero">
      <img class="fd-hero-img" src="${f.image}" alt="${f.name}">
      <div class="fd-hero-overlay">
        <a class="fd-back-btn" href="menu.html">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back to Menu
        </a>
        <div class="fd-hero-meta">
          <span class="fd-category-badge">${f.category}</span>
          <h1 class="fd-hero-title">${f.name}</h1>
          <div class="fd-hero-rating">
            <span class="fd-stars">${stars}</span>
            <span class="fd-rating-val">${f.rating}</span>
            <span class="fd-rating-count muted">· 128 reviews</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="fd-body">
      <!-- Info panel -->
      <div class="fd-info">
        <p class="fd-desc">${f.desc}</p>

        <div class="fd-pills">
          <div class="fd-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <span>20–30 min</span>
          </div>
          <div class="fd-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <span>Serves 1–2</span>
          </div>
          <div class="fd-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" fill="currentColor"/></svg>
            <span>Fresh daily</span>
          </div>
          <div class="fd-pill fd-pill--spicy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2s-5 4-5 10a5 5 0 0 0 10 0C17 6 12 2 12 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            <span>Medium spice</span>
          </div>
        </div>

        <div class="fd-section-title">What's Included</div>
        <ul class="fd-includes">
          <li>✓ Freshly prepared ${f.name}</li>
          <li>✓ Choice of sauce on the side</li>
          <li>✓ Disposable cutlery &amp; serviette</li>
          <li>✓ Sealed, tamper-proof packaging</li>
        </ul>
      </div>

      <!-- Order card -->
      <div class="fd-order-card">
        <div class="fd-price">${formatPrice(f.price)}</div>
        <p class="fd-price-note muted">Per serving · tax inclusive</p>

        <div class="fd-qty-row">
          <span class="fd-qty-label">Quantity</span>
          <div class="fd-qty-ctrl">
            <button class="fd-qty-btn" id="fdDec" aria-label="Decrease">−</button>
            <span class="fd-qty-val" id="fdQtyVal">${cartQty}</span>
            <button class="fd-qty-btn" id="fdInc" aria-label="Increase">+</button>
          </div>
        </div>

        <button class="btn-primary fd-add-btn" id="addDetail">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Add to Cart
        </button>

        <div class="fd-delivery-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="1" y="3" width="15" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M16 8h4l3 5v3h-7V8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="1.8"/><circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>
          <span>Free delivery on orders over ₦10,000</span>
        </div>
        <div class="fd-trust-row">
          <span class="fd-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            Safe checkout
          </span>
          <span class="fd-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            4.8★ rated
          </span>
          <span class="fd-trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4 9h16" stroke="currentColor" stroke-width="1.8"/></svg>
            Easy refund
          </span>
        </div>
      </div>
    </div>`;

  // qty stepper logic
  let qty = cartQty;
  const qtyVal = document.getElementById('fdQtyVal');
  document.getElementById('fdDec').addEventListener('click', ()=>{ if(qty>1){qty--;qtyVal.textContent=qty} });
  document.getElementById('fdInc').addEventListener('click', ()=>{ qty++;qtyVal.textContent=qty });

  document.getElementById('addDetail').addEventListener('click', ()=>{
    addToCart(f.id, qty);
  });

  // render related
  renderRelated(f);
}

function renderRelated(f){
  const el = document.getElementById('related-list');
  if(!el) return;
  const related = sample.foods.filter(x => x.id !== f.id && x.category === f.category).slice(0,4);
  const fallback = sample.foods.filter(x => x.id !== f.id).slice(0,4);
  const list = related.length >= 2 ? related : fallback;
  el.innerHTML = '';
  list.forEach(item => el.insertAdjacentHTML('beforeend', cardHTML(item)));
}

/* Cart page */
function renderCartPage(){
  const el = document.getElementById('cart-items');
  if(!el) return;
  const cart = getCart();

  // helpers to update summary
  function updateSummary(){
    const c = getCart();
    let subtotal = 0;
    c.forEach(ci=>{ const f=findFood(ci.id); if(f) subtotal += f.price * ci.qty; });
    const freeThreshold = 10000;
    const delivery = subtotal >= freeThreshold ? 0 : 1500;
    const total = subtotal + delivery;
    const subEl = document.getElementById('cart-subtotal');
    const delEl = document.getElementById('cart-delivery');
    const totEl = document.getElementById('cart-total');
    const freeNote = document.getElementById('free-delivery-note');
    if(subEl) subEl.textContent = formatPrice(subtotal);
    if(delEl) delEl.textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
    if(totEl) totEl.textContent = formatPrice(total);
    if(freeNote) freeNote.hidden = delivery !== 0;
    // legacy selector fallback
    const legacyTotal = document.querySelector('.order-total');
    if(legacyTotal) legacyTotal.textContent = '';
  }

  if(cart.length === 0){
    el.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p class="muted">Browse our menu and add something delicious.</p>
        <a class="btn-primary" href="menu.html">Browse Menu</a>
      </div>`;
    updateSummary();
    return;
  }

  el.innerHTML = '';
  cart.forEach(ci => {
    const f = findFood(ci.id);
    if(!f) return;
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img class="cart-item-img" src="${f.image}" alt="${f.name}">
      <div class="cart-item-info">
        <p class="cart-item-name">${f.name}</p>
        <p class="cart-item-price">${formatPrice(f.price)}</p>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="dec" data-id="${f.id}" aria-label="Decrease">−</button>
          <span class="qty-val">${ci.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${f.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-remove="${f.id}" aria-label="Remove ${f.name}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>`;
    el.appendChild(item);
  });

  // qty buttons
  el.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const c = getCart();
      const it = c.find(i => i.id === id);
      if(!it) return;
      if(btn.dataset.action === 'inc') it.qty++;
      else if(it.qty > 1) it.qty--;
      else { removeFromCart(id); renderCartPage(); return; }
      saveCart(c);
      renderCartPage();
    });
  });

  // remove buttons
  el.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.remove));
      renderCartPage();
    });
  });

  updateSummary();
}

/* Order summary */
function renderOrderSummary(){
  const el=document.getElementById('order-summary');
  const breakdown=document.getElementById('order-breakdown');
  if(!el||!breakdown)return;
  const cart=getCart();
  if(cart.length===0){
    el.innerHTML=`<div class="os-empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><h3>Your cart is empty</h3><p>Add some delicious items from our menu!</p><a class="btn-primary" href="menu.html">Browse Menu</a></div>`;
    breakdown.innerHTML='';
    return;
  }
  let subtotal=0;
  el.innerHTML=`<div class="os-items-panel"><div class="os-items-header"><h2 class="os-items-title">Your Items</h2><span class="os-item-count">${cart.reduce((s,i)=>s+i.qty,0)} item${cart.reduce((s,i)=>s+i.qty,0)!==1?'s':''}</span></div><div class="os-items-list" id="osItemsList"></div></div>`;
  const list=el.querySelector('#osItemsList');
  cart.forEach(ci=>{
    const f=findFood(ci.id);
    subtotal+=f.price*ci.qty;
    list.insertAdjacentHTML('beforeend',`
      <div class="os-item">
        <div class="os-item-img">
          <img src="${f.image.replace('w=800','w=120')}" alt="${f.name}" loading="lazy">
        </div>
        <div class="os-item-info">
          <div class="os-item-name">${f.name}</div>
          <div class="os-item-cat">${f.category}</div>
          <div class="os-item-bottom">
            <span class="os-item-qty">× ${ci.qty}</span>
            <span class="os-item-price">${formatPrice(f.price*ci.qty)}</span>
          </div>
        </div>
      </div>`);
  });
  const freeDeliveryThreshold=10000;
  const delivery=subtotal>=freeDeliveryThreshold?0:1500;
  const total=subtotal+delivery;
  breakdown.innerHTML=`
    <div class="os-card">
      <h2 class="os-card-title">Order Total</h2>
      <div class="os-breakdown-rows">
        <div class="os-breakdown-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="os-breakdown-row"><span>Delivery</span><span>${delivery===0?'<span class="os-free-tag">FREE</span>':formatPrice(delivery)}</span></div>
        ${subtotal<freeDeliveryThreshold?`<div class="os-free-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>Add ${formatPrice(freeDeliveryThreshold-subtotal)} more for free delivery</div>`:''}
      </div>
      <div class="os-promo-row">
        <input class="promo-input" type="text" placeholder="Promo code" id="osPromoInput" aria-label="Enter promo code">
        <button class="promo-btn" type="button">Apply</button>
      </div>
      <div class="os-total-row">
        <span>Total</span>
        <span class="os-total-amount">${formatPrice(total)}</span>
      </div>
      <a class="btn-primary checkout-btn" href="checkout.html">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        Proceed to Checkout
      </a>
      <div class="os-trust-row">
        <span class="trust-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Secure</span>
        <span class="trust-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>Fast delivery</span>
        <span class="trust-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>Best prices</span>
      </div>
    </div>`;
}

/* Checkout */
function initCheckout(){
  const form=document.getElementById('checkoutForm');
  if(!form)return;

  // Render order summary sidebar
  const itemsList=document.getElementById('co-items-list');
  const breakdownEl=document.getElementById('co-breakdown');
  if(itemsList&&breakdownEl){
    const cart=getCart();
    if(cart.length===0){
      itemsList.innerHTML='<p style="color:var(--muted);font-size:0.9rem">No items in cart.</p>';
    } else {
      let subtotal=0;
      itemsList.innerHTML='';
      cart.forEach(ci=>{
        const f=findFood(ci.id);subtotal+=f.price*ci.qty;
        itemsList.insertAdjacentHTML('beforeend',`
          <div class="co-sum-item">
            <img src="${f.image.replace('w=800','w=80')}" alt="${f.name}">
            <div class="co-sum-item-info">
              <span class="co-sum-item-name">${f.name}</span>
              <span class="co-sum-item-qty">× ${ci.qty}</span>
            </div>
            <span class="co-sum-item-price">${formatPrice(f.price*ci.qty)}</span>
          </div>`);
      });
      const delivery=subtotal>=10000?0:1500;
      const total=subtotal+delivery;
      breakdownEl.innerHTML=`
        <div class="co-breakdown-rows">
          <div class="co-breakdown-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="co-breakdown-row"><span>Delivery</span><span>${delivery===0?'<span class="os-free-tag">FREE</span>':formatPrice(delivery)}</span></div>
          <div class="co-breakdown-row co-breakdown-total"><span>Total</span><span>${formatPrice(total)}</span></div>
        </div>`;
    }
  }

  // Payment option toggle
  const payOptions=document.querySelectorAll('.co-pay-option');
  payOptions.forEach(opt=>{
    opt.addEventListener('click',()=>{
      payOptions.forEach(o=>o.classList.remove('co-pay-option--selected'));
      opt.classList.add('co-pay-option--selected');
      opt.querySelector('input[type=radio]').checked=true;
    });
  });

  // Submit
  form.addEventListener('submit',e=>{
    e.preventDefault();
    localStorage.removeItem(CART_KEY);
    document.getElementById('modal').hidden=false;
  });

  // Modal close
  const modal=document.getElementById('modal');
  if(modal){
    document.getElementById('modalClose').addEventListener('click',()=>{
      modal.hidden=true;
      location.href='index.html';
    });
  }
}

/* Header utilities */
function renderCartCount(){const count=getCart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll('[id^="cart-count"]').forEach(el=>el.textContent=count)}

/* Init on DOM */
function init(){initTheme();renderCartCount();renderCategories();renderTestimonials();renderFeatured();
  if(document.getElementById('menu-grid')) initMenu();
  if(document.getElementById('food-detail')) renderFoodDetail();
  if(document.getElementById('cart-items')) renderCartPage();
  if(document.getElementById('order-summary') || document.getElementById('order-breakdown')) renderOrderSummary();
  initCheckout();
  // subscribe
  const sub=document.getElementById('subscribeForm');if(sub)sub.addEventListener('submit',e=>{e.preventDefault();showToast('Subscribed!');sub.reset()});
  const contact=document.getElementById('contactForm');if(contact)contact.addEventListener('submit',e=>{e.preventDefault();showToast('Message sent!');contact.reset()});
  // nav toggles & theme
  document.querySelectorAll('[id^="navToggle"]').forEach(btn=>btn.addEventListener('click',e=>{const nav=btn.nextElementSibling;const open=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open')}));
  document.querySelectorAll('[id^="themeToggle"]').forEach(btn=>btn.addEventListener('click',()=>{toggleTheme();btn.setAttribute('aria-pressed',String(document.documentElement.getAttribute('data-theme')==='dark'))}));
  // header search button: focus search on menu page or navigate to menu
  document.querySelectorAll('.nav-search').forEach(btn=>btn.addEventListener('click',()=>{
    const search=document.getElementById('searchInput');
    if(search){ if(location.pathname.endsWith('menu.html')){ search.focus() } else { location.href='menu.html' } }
    else { location.href='menu.html' }
  }));
  // active nav link
  (function markActive(){const cur=(location.pathname.split('/').pop()||'index.html');document.querySelectorAll('.nav-list a').forEach(a=>{const href=a.getAttribute('href');if(href&&href===cur) a.classList.add('active')})})();
  // contact & checkout modal handled above

  // Hero image carousel
  (function initHeroCarousel(){
    const track = document.getElementById('heroTrack');
    const dotsEl = document.getElementById('heroDots');
    if(!track || !dotsEl) return;
    const imgs = track.querySelectorAll('img');
    const total = imgs.length;
    let current = 0;
    // build dots
    imgs.forEach((_,i)=>{
      const d = document.createElement('button');
      d.className = 'hero-dot' + (i===0?' active':'');
      d.setAttribute('aria-label','Slide '+(i+1));
      d.addEventListener('click',()=>goTo(i));
      dotsEl.appendChild(d);
    });
    function goTo(n){
      current = (n + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsEl.querySelectorAll('.hero-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
    }
    // auto-advance every 3.5s
    let timer = setInterval(()=>goTo(current+1), 3500);
    track.closest('.hero-carousel').addEventListener('mouseenter',()=>clearInterval(timer));
    track.closest('.hero-carousel').addEventListener('mouseleave',()=>{timer=setInterval(()=>goTo(current+1),3500)});
  })();
}

window.addEventListener('DOMContentLoaded',init);
