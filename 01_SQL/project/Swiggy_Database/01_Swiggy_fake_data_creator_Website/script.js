// SECTION: State
const state = {
  tables: {
    users: [],
    addresses: [],
    restaurants: [],
    menuItems: [],
    orders: [],
    orderDetails: [],
    deliveryPartners: [],
    payments: []
  },
  csvByTable: {},
  activeTable: 'users'
};

// SECTION: Helpers - random utils
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomFromPattern(pattern) {
  // Simple pattern replacer for names / emails etc.
  return pattern
    .replace('{first}', choice(['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Sai', 'Ishaan', 'Krishna', 'Kabir', 'Aadhya', 'Pari', 'Ananya', 'Siya', 'Myra', 'Sara', 'Eva', 'Navya', 'Riya']))
    .replace('{last}', choice(['Sharma', 'Verma', 'Gupta', 'Agarwal', 'Khan', 'Singh', 'Patel', 'Reddy', 'Nair', 'Kulkarni']))
    .replace('{domain}', choice(['example.com', 'mail.com', 'test.io', 'sample.in']));
}

// City → State mapping to keep addresses realistic
const CITY_STATE_MAP = [
  // Maharashtra
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Nagpur', state: 'Maharashtra' },
  { city: 'Nashik', state: 'Maharashtra' },

  // Delhi (UT)
  { city: 'Delhi', state: 'Delhi' },

  // Karnataka
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: 'Mysuru', state: 'Karnataka' },
  { city: 'Mangaluru', state: 'Karnataka' },

  // Telangana
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Warangal', state: 'Telangana' },

  // Gujarat
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Surat', state: 'Gujarat' },
  { city: 'Vadodara', state: 'Gujarat' },
  { city: 'Rajkot', state: 'Gujarat' },
  { city: 'Bhavnagar', state: 'Gujarat' },
  { city: 'Jamnagar', state: 'Gujarat' },

  // Rajasthan
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Jodhpur', state: 'Rajasthan' },
  { city: 'Udaipur', state: 'Rajasthan' },
  { city: 'Kota', state: 'Rajasthan' },

  // Tamil Nadu
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Madurai', state: 'Tamil Nadu' },

  // West Bengal
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Howrah', state: 'West Bengal' },
  { city: 'Durgapur', state: 'West Bengal' }
];

function randomCityState() {
  return choice(CITY_STATE_MAP);
}

function randomCuisine() {
  return choice([
    'North Indian',
    'South Indian',
    'Chinese',
    'Bakery',
    'Fast Food',
    'Street Food',
    'Pizza',
    'Biryani',
    'Healthy Food'
  ]);
}

function randomCategory() {
  return choice([
    'Main Course',
    'Starter',
    'Dessert',
    'Beverage',
    'Snack'
  ]);
}

function randomVehicle() {
  return choice(['Bike', 'Scooter', 'Bicycle']);
}

function randomPaymentMethod() {
  return choice(['UPI', 'Card', 'COD']);
}

function randomPaymentStatus(includeFailed) {
  if (!includeFailed) return 'Success';
  const roll = Math.random();
  if (roll < 0.85) return 'Success';
  if (roll < 0.93) return 'Failed';
  return 'Pending';
}

function randomPartnerStatus() {
  return choice(['Available', 'Busy']);
}

function randomFloat(min, max, decimals = 2) {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(decimals));
}

function randomPincode() {
  return String(randInt(100000, 999999));
}

function randomOrderTime() {
  // Last 60 days
  const now = new Date();
  const past = new Date(now.getTime() - randInt(0, 60) * 24 * 60 * 60 * 1000);
  return past.toISOString().slice(0, 19).replace('T', ' '); // MySQL DATETIME format
}

function randomAccountCreationDate() {
  const now = new Date();
  const past = new Date(now.getTime() - randInt(30, 365) * 24 * 60 * 60 * 1000);
  return past.toISOString().slice(0, 10); // MySQL DATE
}

// SECTION: CSV Helpers
function toCsv(headers, rows) {
  const escapeCell = (value) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    const needsQuotes = /[",\n]/.test(str);
    const escaped = str.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const headerLine = headers.join(',');
  const dataLines = rows.map((row) => headers.map((h) => escapeCell(row[h])).join(','));
  return [headerLine, ...dataLines].join('\n');
}

// SECTION: Data Generators
function generateUsers(count) {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const name = randomFromPattern('{first} {last}');
    const emailSlug = name.toLowerCase().replace(/[^a-z]/g, '.');
    const user = {
      User_ID: i,
      Name: name,
      Email: `${emailSlug}${randInt(1, 999)}@${choice(['example.com', 'mail.com', 'test.io', 'sample.in'])}`,
      Phone_Number: `9${randInt(100000000, 999999999)}`,
      Account_Creation_Date: randomAccountCreationDate()
    };
    users.push(user);
  }
  return users;
}

function generateAddresses(users) {
  const addresses = [];
  let id = 1;
  const locationTypes = ['Home', 'Work', 'Other'];

  users.forEach((user) => {
    const addressCount = randInt(1, 3);
    for (let i = 0; i < addressCount; i++) {
      const cityState = randomCityState();
      addresses.push({
        Address_ID: id++,
        User_ID: user.User_ID,
        Address_Line_1: `${randInt(1, 300)}, ${choice(['MG Road', 'Link Road', 'Park Street', 'Ring Road', 'Main Street'])}`,
        City: cityState.city,
        State: cityState.state,
        Pincode: randomPincode(),
        Location_Type: choice(locationTypes)
      });
    }
  });

  return addresses;
}

function generateRestaurants(count) {
  const restaurants = [];
  for (let i = 1; i <= count; i++) {
    const cuisine = randomCuisine();
    restaurants.push({
      Restaurant_ID: i,
      Restaurant_Name: `${choice(['Swad', 'Tasty', 'Royal', 'Street Box', 'Spice Hub', 'Desi Bite'])} ${choice(['Kitchen', 'Cafe', 'House', 'Corner', 'Dhaba', 'Express'])}`,
      Cuisine_Type: cuisine,
      Rating: randomFloat(3.2, 4.9, 1),
      Location_Coordinates: `${randomFloat(12.0, 28.0, 6)},${randomFloat(72.0, 88.0, 6)}`
    });
  }
  return restaurants;
}

function generateMenuItems(restaurants) {
  const menuItems = [];
  let id = 1;

  const menuByCuisine = {
    'North Indian': ['Paneer Butter Masala', 'Dal Makhani', 'Butter Naan', 'Rajma Chawal', 'Chole Bhature'],
    'South Indian': ['Masala Dosa', 'Idli Sambar', 'Medu Vada', 'Curd Rice', 'Pongal'],
    Chinese: ['Veg Hakka Noodles', 'Manchurian', 'Fried Rice', 'Chilli Paneer'],
    Bakery: ['Chocolate Brownie', 'Croissant', 'Red Velvet Cake', 'Cheese Garlic Bread'],
    'Fast Food': ['Veg Burger', 'French Fries', 'Veg Wrap', 'Cheese Sandwich'],
    'Street Food': ['Pani Puri', 'Bhel Puri', 'Vada Pav', 'Kachori'],
    Pizza: ['Margherita Pizza', 'Farmhouse Pizza', 'Paneer Tikka Pizza'],
    Biryani: ['Veg Biryani', 'Hyderabadi Biryani'],
    'Healthy Food': ['Grain Bowl', 'Salad Bowl', 'Smoothie Bowl']
  };

  restaurants.forEach((rest) => {
    const baseItems = menuByCuisine[rest.Cuisine_Type] || ['Chef Special'];
    const itemCount = randInt(5, 12);
    for (let i = 0; i < itemCount; i++) {
      const itemName = baseItems[i % baseItems.length] || choice(baseItems);
      const category = randomCategory();
      const priceBase = category === 'Beverage' ? 70 : category === 'Dessert' ? 120 : 180;
      menuItems.push({
        Item_ID: id++,
        Restaurant_ID: rest.Restaurant_ID,
        Item_Name: itemName,
        Price: randomFloat(priceBase * 0.7, priceBase * 1.4, 2),
        Category: category
      });
    }
  });

  return menuItems;
}

function generateDeliveryPartners(targetOrders) {
  // Reasonable number of partners vs orders
  const partnerCount = Math.max(5, Math.min(80, Math.round(targetOrders / 20)));
  const partners = [];
  for (let i = 1; i <= partnerCount; i++) {
    partners.push({
      Partner_ID: i,
      Name: randomFromPattern('{first} {last}'),
      Vehicle_Type: randomVehicle(),
      Real_Time_Status: randomPartnerStatus()
    });
  }
  return partners;
}

function generateOrders(count, users, restaurants, partners) {
  const orders = [];

  for (let i = 1; i <= count; i++) {
    const user = choice(users);
    const restaurant = choice(restaurants);
    const partner = choice(partners);

    orders.push({
      Order_ID: i,
      User_ID: user.User_ID,
      Restaurant_ID: restaurant.Restaurant_ID,
      Delivery_Partner_ID: partner.Partner_ID,
      Order_Time: randomOrderTime(),
      Total_Amount: 0 // placeholder, set after order details
    });
  }

  return orders;
}

function generateOrderDetails(orders, menuItems) {
  const details = [];
  let id = 1;

  // Group menu items by restaurant for quick lookup
  const itemsByRestaurant = {};
  menuItems.forEach((item) => {
    if (!itemsByRestaurant[item.Restaurant_ID]) {
      itemsByRestaurant[item.Restaurant_ID] = [];
    }
    itemsByRestaurant[item.Restaurant_ID].push(item);
  });

  orders.forEach((order) => {
    const itemsForRestaurant = itemsByRestaurant[order.Restaurant_ID] || [];
    const lineCount = randInt(1, 5);
    let total = 0;

    for (let i = 0; i < lineCount; i++) {
      const item = choice(itemsForRestaurant);
      if (!item) continue;
      const quantity = randInt(1, 4);
      total += item.Price * quantity;

      details.push({
        Order_Detail_ID: id++,
        Order_ID: order.Order_ID,
        Item_ID: item.Item_ID,
        Quantity: quantity
      });
    }

    order.Total_Amount = parseFloat(total.toFixed(2));
  });

  return details;
}

function generatePayments(orders, includeFailed) {
  const payments = [];
  let id = 1;

  orders.forEach((order) => {
    const status = randomPaymentStatus(includeFailed);
    payments.push({
      Payment_ID: id++,
      Order_ID: order.Order_ID,
      Transaction_Method: randomPaymentMethod(),
      Status: status
    });
  });

  return payments;
}

// SECTION: Orchestrator
function generateDataset({ usersCount, restaurantsCount, ordersCount, includeFailedPayments }) {
  // Users & addresses
  const users = generateUsers(usersCount);
  const addresses = generateAddresses(users);

  // Restaurants & menu
  const restaurants = generateRestaurants(restaurantsCount);
  const menuItems = generateMenuItems(restaurants);

  // Delivery partners
  const partners = generateDeliveryPartners(ordersCount);

  // Orders + details + payments (all represent confirmed orders)
  const orders = generateOrders(ordersCount, users, restaurants, partners);
  const orderDetails = generateOrderDetails(orders, menuItems);
  const payments = generatePayments(orders, includeFailedPayments);

  state.tables = {
    users,
    addresses,
    restaurants,
    menuItems,
    orders,
    orderDetails,
    deliveryPartners: partners,
    payments
  };

  // Build CSV for each table in MySQL-friendly shape
  state.csvByTable = {
    users: toCsv(['User_ID', 'Name', 'Email', 'Phone_Number', 'Account_Creation_Date'], users),
    addresses: toCsv(['Address_ID', 'User_ID', 'Address_Line_1', 'City', 'State', 'Pincode', 'Location_Type'], addresses),
    restaurants: toCsv(['Restaurant_ID', 'Restaurant_Name', 'Cuisine_Type', 'Rating', 'Location_Coordinates'], restaurants),
    menuItems: toCsv(['Item_ID', 'Restaurant_ID', 'Item_Name', 'Price', 'Category'], menuItems),
    orders: toCsv(['Order_ID', 'User_ID', 'Restaurant_ID', 'Delivery_Partner_ID', 'Order_Time', 'Total_Amount'], orders),
    orderDetails: toCsv(['Order_Detail_ID', 'Order_ID', 'Item_ID', 'Quantity'], orderDetails),
    deliveryPartners: toCsv(['Partner_ID', 'Name', 'Vehicle_Type', 'Real_Time_Status'], partners),
    payments: toCsv(['Payment_ID', 'Order_ID', 'Transaction_Method', 'Status'], payments)
  };
}

// SECTION: UI Binding
const form = document.getElementById('config-form');
const generateBtn = document.getElementById('generate-btn');
const statusMessage = document.getElementById('status-message');
const includeFailedPaymentsCheckbox = document.getElementById('includeFailedPayments');
const includePartnerStatusCheckbox = document.getElementById('includePartnerStatus');

const tabs = Array.from(document.querySelectorAll('.tab'));
const previewTable = document.getElementById('preview-table');
const emptyState = document.getElementById('empty-state');
const csvOutput = document.getElementById('csv-output');
const rowCountLabel = document.getElementById('row-count');

const copyCsvBtn = document.getElementById('copyCsvBtn');
const downloadCsvBtn = document.getElementById('downloadCsvBtn');

// SECTION: Rendering helpers
function renderActiveTable() {
  const tableKey = state.activeTable;
  const csv = state.csvByTable[tableKey];
  const rows = state.tables[tableKey] || [];

  if (!csv || !rows.length) {
    previewTable.tHead.innerHTML = '';
    previewTable.tBodies[0].innerHTML = '';
    emptyState.style.display = 'flex';
    csvOutput.value = '';
    rowCountLabel.textContent = 'No data yet. Generate to begin.';
    return;
  }

  emptyState.style.display = 'none';

  const headers = Object.keys(rows[0]);

  // Render head
  const theadHtml = `<tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>`;
  previewTable.tHead.innerHTML = theadHtml;

  // Render body (limit rows for preview)
  const maxPreview = 40;
  const bodyRows = rows.slice(0, maxPreview);
  const tbodyHtml = bodyRows
    .map((row) => `<tr>${headers.map((h) => `<td>${row[h]}</td>`).join('')}</tr>`)
    .join('');
  previewTable.tBodies[0].innerHTML = tbodyHtml;

  // CSV textarea
  csvOutput.value = csv;
  rowCountLabel.textContent = `${rows.length} row(s) in ${tableKey} table.`;
}

function setLoading(isLoading) {
  if (isLoading) {
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    statusMessage.textContent = 'Generating random dataset…';
    statusMessage.classList.remove('error', 'success');
  } else {
    generateBtn.classList.remove('loading');
    generateBtn.disabled = false;
  }
}

// SECTION: Event Handlers
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const usersCount = Number(document.getElementById('usersCount').value || '0');
  const restaurantsCount = Number(document.getElementById('restaurantsCount').value || '0');
  const ordersCount = Number(document.getElementById('ordersCount').value || '0');

  if (!usersCount || !restaurantsCount || !ordersCount) {
    statusMessage.textContent = 'Please enter valid numbers for users, restaurants, and orders.';
    statusMessage.classList.remove('success');
    statusMessage.classList.add('error');
    return;
  }

  if (usersCount < 1 || restaurantsCount < 1 || ordersCount < 1) {
    statusMessage.textContent = 'All counts must be at least 1.';
    statusMessage.classList.remove('success');
    statusMessage.classList.add('error');
    return;
  }

  setLoading(true);

  // Small timeout to let UI update
  setTimeout(() => {
    try {
      generateDataset({
        usersCount,
        restaurantsCount,
        ordersCount,
        includeFailedPayments: includeFailedPaymentsCheckbox.checked
      });

      statusMessage.textContent = 'Dataset generated. Switch tables above to explore & export.';
      statusMessage.classList.remove('error');
      statusMessage.classList.add('success');

      renderActiveTable();
    } catch (err) {
      console.error(err);
      statusMessage.textContent = 'Something went wrong while generating data.';
      statusMessage.classList.remove('success');
      statusMessage.classList.add('error');
    } finally {
      setLoading(false);
    }
  }, 50);
});

// Tabs switching
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    state.activeTable = tab.dataset.table;
    renderActiveTable();
  });
});

// Copy CSV
copyCsvBtn.addEventListener('click', async () => {
  const csv = csvOutput.value;
  if (!csv) return;
  try {
    await navigator.clipboard.writeText(csv);
    statusMessage.textContent = 'CSV copied to clipboard.';
    statusMessage.classList.remove('error');
    statusMessage.classList.add('success');
  } catch (err) {
    statusMessage.textContent = 'Unable to copy CSV. Please copy manually.';
    statusMessage.classList.remove('success');
    statusMessage.classList.add('error');
  }
});

// Download CSV
function downloadCsv(tableKey) {
  const csv = state.csvByTable[tableKey];
  if (!csv) return;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${tableKey}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

downloadCsvBtn.addEventListener('click', () => {
  downloadCsv(state.activeTable);
});

// Initial setup
window.addEventListener('DOMContentLoaded', () => {
  // Ensure table has a tbody for our script
  if (!previewTable.tBodies[0]) {
    previewTable.appendChild(document.createElement('tbody'));
  }
  renderActiveTable();
});
