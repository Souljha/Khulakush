# Railway Deployment Guide

This guide walks you through deploying Highgrounds BLVD to Railway using GitHub.

## Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- Your code pushed to a GitHub repository

## Step 1: Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/khulakush.git
git branch -M main
git push -u origin main
```

**Important**: Make sure `.env` is in `.gitignore` so credentials aren't pushed to GitHub.

## Step 2: Deploy Backend to Railway

### 2.1 Create New Project
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your repository

### 2.2 Configure Backend Service
1. Railway will detect your Node.js backend
2. Click on the service and go to "Settings"
3. Set **Root Directory** to: `backend`
4. Set **Start Command** to: `npm start`
5. Under "Service" → click "Generate Domain" to get your backend URL

### 2.3 Add Environment Variables
Go to "Variables" tab and add the following (use your actual values from .env file):

```env
MONGODB_URI=your_mongodb_connection_string

PORT=5001

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
HIGHGROUNDS_WHATSAPP_NUMBER=whatsapp:+27XXXXXXXXXX

PAYFAST_MODE=live
PAYFAST_MERCHANT_ID=your_payfast_merchant_id
PAYFAST_MERCHANT_KEY=your_payfast_merchant_key
PAYFAST_PASSPHRASE=your_secure_passphrase
```

**Note**: Copy the actual values from your local `.env` file.

**Note**: Copy your actual backend domain URL (e.g., `https://your-app.railway.app`) - you'll need it for the frontend.

### 2.4 Deploy
Railway will automatically deploy your backend. Check the logs to ensure it's running successfully.

## Step 3: Deploy Frontend to Railway

### 3.1 Add Frontend Service
1. In the same Railway project, click "New"
2. Select "GitHub Repo" again (same repository)
3. This creates a second service for the frontend

### 3.2 Configure Frontend Service
1. Click on the frontend service
2. Go to "Settings"
3. Set **Root Directory** to: `.` (root of repo, not backend folder)
4. Set **Build Command** to: `npm install && npm run build`
5. Set **Start Command** to: `npm run preview`
6. Under "Service" → click "Generate Domain" to get your frontend URL

### 3.3 Add Frontend Environment Variables
Go to "Variables" tab and add:

```env
VITE_APP_BACKEND_URL=https://your-backend-domain.railway.app
GEMINI_API_KEY=your_gemini_api_key
```

**Important**: Replace `https://your-backend-domain.railway.app` with the actual backend domain from Step 2.

## Step 4: Update Backend CORS

After getting your frontend domain, you need to update CORS in your backend:

1. Open `backend/server.js`
2. Add your Railway frontend URL to the allowed origins:

```javascript
const allowedOrigins = [
  'https://your-frontend-domain.railway.app', // Add this
  'https://khulakush.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  'http://localhost:4176'
];
```

3. Commit and push the changes:
```bash
git add backend/server.js
git commit -m "Add Railway frontend to CORS"
git push
```

Railway will automatically redeploy the backend.

## Step 5: Configure PayFast Webhook

Now that your backend is live, configure PayFast:

1. Login to https://www.payfast.co.za
2. Go to **Settings → Integration**
3. Set **ITN (Notify URL)** to: `https://your-backend-domain.railway.app/api/payment/notify`
4. Enable ITN notifications
5. Save settings

## Step 6: Test Your Deployment

### 6.1 Check Backend Health
Visit: `https://your-backend-domain.railway.app/api/products`

You should see your products list.

### 6.2 Test Full Flow
1. Visit your frontend URL: `https://your-frontend-domain.railway.app`
2. Browse products and add to cart
3. Go through checkout process
4. Complete a test payment (minimum R5.00)
5. Verify:
   - Order appears in admin dashboard
   - Payment status updates to "paid"
   - WhatsApp notification is sent
   - Customer sees success page

## Step 7: Monitor and Maintain

### View Logs
- Click on each service in Railway
- Go to "Logs" tab to view real-time logs
- Monitor for errors or issues

### Automatic Deployments
Railway automatically redeploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push
```

Railway will detect the push and redeploy automatically.

### Environment Variables Updates
- Go to Railway → Your Service → Variables
- Update any variable
- Click "Redeploy" to apply changes

## Common Issues and Solutions

### Backend Not Starting
- Check "Logs" in Railway for error messages
- Verify all environment variables are set correctly
- Ensure MongoDB connection string is correct

### Frontend Can't Connect to Backend
- Verify `VITE_APP_BACKEND_URL` is set correctly
- Check backend CORS settings include frontend domain
- Ensure backend service is running (check logs)

### PayFast Webhook Not Working
- Verify ITN URL is correct in PayFast dashboard
- Check backend logs for incoming webhook requests
- Ensure backend URL is publicly accessible (not localhost)
- Verify signature validation is working

### CORS Errors
- Add your frontend domain to `allowedOrigins` in `backend/server.js`
- Commit and push changes
- Wait for Railway to redeploy

## Production Checklist

Before going fully live:

- [ ] Backend deployed and running on Railway
- [ ] Frontend deployed and running on Railway
- [ ] All environment variables configured correctly
- [ ] CORS updated with production domains
- [ ] PayFast ITN webhook URL configured
- [ ] Test payment completed successfully (R5.00)
- [ ] WhatsApp notifications working
- [ ] Admin dashboard accessible
- [ ] Payment status updates correctly
- [ ] All routes working (products, cart, checkout, payment)
- [ ] Mobile responsive design tested
- [ ] SSL/HTTPS working on both frontend and backend

## Railway-Specific Tips

### Free Tier Limits
- $5 free credit per month
- Services sleep after 15 minutes of inactivity
- First request may be slow (cold start)

### Upgrade for Production
Consider upgrading if you need:
- Always-on services (no sleeping)
- More bandwidth
- Higher resource limits
- Custom domains

### Custom Domain (Optional)
1. Go to Service → Settings → Domains
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `highgroundsblvd.com`)
4. Update DNS records as shown by Railway
5. Wait for DNS propagation (up to 48 hours)

## Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Issues**: Check your repository issues for deployment logs

---

**Next Steps**: Once deployed, update your README.md with the live URLs and share your application with users!
