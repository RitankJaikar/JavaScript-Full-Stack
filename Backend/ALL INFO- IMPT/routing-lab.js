// Express routing major methods: Standard, Chained, Modular, Array/Middleware, and Pattern-based

const express = require('express');
const app = express();

/**
 * 1. The "Standard" Way (Separately)
 * Simple aur readable, lekin agar path lamba ho toh repeat karna padta hai.
 */
app.get('/ritank', (req, res) => res.send('Get Ritank'));
app.post('/ritank', (req, res) => res.send('Post Ritank'));


/**
 * 2. The "Chained" Way (app.route)
 * DRY (Don't Repeat Yourself) principle follow karta hai. 
 * Ek hi path ke liye multiple methods grouped hote hain.
 */
app.route('/ritank-profile')
  .get((req, res) => res.json({ name: "Ritank", action: "view" }))
  .post((req, res) => res.json({ name: "Ritank", action: "create" }))
  .put((req, res) => res.json({ name: "Ritank", action: "update" }));


/**
 * 3. The "Modular" Way (express.Router)
 * Ye Professional apps mein use hota hai. 
 * Ise aap 'ritankRouter.js' jaisi alag file mein rakh sakte hain.
 */
const ritankRouter = express.Router();

ritankRouter.get('/dashboard', (req, res) => res.send('Ritank Dashboard'));
ritankRouter.get('/settings', (req, res) => res.send('Ritank Settings'));

// Is router ko kisi specific prefix par mount kar sakte hain
app.use('/ritank-admin', ritankRouter); 
// Final URL: /ritank-admin/dashboard


/**
 * 4. The "Array" Way (Hidden Trick)
 * Kya aapko pata tha aap ek hi route par multiple handlers 
 * array ki tarah bhej sakte hain? (Middleware logic)
 */
const checkRitank = (req, res, next) => {
  console.log("Checking if it is Ritank...");
  next();
};

app.get('/ritank-secure', [checkRitank, (req, res) => {
  res.send('Secure access for Ritank');
}]);


/**
 * 5. Dynamic / Pattern Routing
 * Regex ya wildcards ka use karke.
 */
app.get('/ritank-*', (req, res) => {
  // Ye /ritank-anything ko catch kar lega
  res.send('Caught a Ritank wildcard route!');
});


app.listen(3000, () => console.log('Ritank\'s server running on 3000'));