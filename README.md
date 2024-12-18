# 🤖 **Pumpfun Copy Trading Bot**

You can monitor a target wallet and automatically copy trade using this bot. Now optimized to **speed up by 1.2x** with a JavaScript build to enhance performance.

---

# 💬 **Contact Me**

If you have any questions or need support, feel free to reach out anytime via **Telegram**, **Discord**, or **Twitter**.  
🌹 **You're always welcome** 🌹  

**Telegram**: [@0xtradingmonster](https://t.me/0xtradingmonster)

---

# 👀 **Usage**

1. **Clone the repository**

    ```bash
    git clone https://github.com/0xtradingmonster/pumpfun-copy-trading-bot.git
    cd pumpfun-copy-trading-bot
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Build for optimized performance**  
   Speed up execution by building the code to JavaScript.  

    ```bash
    npm run build
    ```

4. **Configure the environment variables**  
   Rename the `.env.example` file to `.env` and set the following parameters:

    ```plaintext
    PRIVATE_KEY = # Your wallet private key
    RPC_ENDPOINT = # Your RPC endpoint
    GRPC_ENDPOINT = # Yellowstone GRPC endpoint
    GRPC_TOKEN = # Yellowstone GRPC token
    BUY_AMOUNT = 0.00001
    IS_JITO = true # true/false
    JITO_FEE = 0.0001
    TARGET_ADDRESS = # Your target wallet to copy trade
    PURCHASE_PERCENT = 100  # %
    MAX_LIMIT = 0.0005 # sol
    ```

5. **Run the bot**  

    ```bash
    npm start
    ```

---

# 🚀 **Optimized for Speed**  

To enhance performance, the bot now includes a **JavaScript build process**, improving execution speed by **1.2x**.  

- Use the `npm run build` command to compile and optimize your code.  
- This ensures faster response times when monitoring and copying trades.

---

Happy trading! 🌟