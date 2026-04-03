# 🚀 Deploying to Vercel

Complete guide to deploy **Rutina Perfecta** to Vercel with all required environment variables.

## ✅ Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Search and select `rutinaperfecta` repository
5. Click **"Import"**

## ✅ Step 2: Configure Environment Variables

### In Vercel Dashboard:

1. After import, go to **Project Settings** → **Environment Variables**
2. Add the following variables:

#### Required Variables:

| Variable | Value | Type | Environments |
|----------|-------|------|--------------|
| `GROQ_API_KEY` | Your Groq API key | Secret | Production, Preview, Development |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Normal | Production, Preview, Development |
| `NEXT_PUBLIC_ADSENSE_ID` | `ca-pub-XXXXXXXX` | Normal | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Normal | Production |

### How to Get Each Variable:

#### GROQ_API_KEY
```
1. Go to https://console.groq.com
2. Sign in / Create account
3. Go to "API Keys" section
4. Create new API key
5. Copy and paste here (KEEP SECRET!)
```

#### NEXT_PUBLIC_GA_ID
```
1. Go to https://analytics.google.com
2. Create/Select property for your domain
3. Copy Measurement ID (format: G-XXXXXXXXXX)
4. Add to environment variables
```

#### NEXT_PUBLIC_ADSENSE_ID
```
1. Go to https://adsense.google.com
2. SignUp or Sign in
3. Go to Account > Account information
4. Copy Publisher ID (format: ca-pub-XXXXXXXX)
5. Add to environment variables
```

#### NEXT_PUBLIC_SITE_URL
```
Production: https://yourdomain.com
Preview: https://[branch].yourdomain.com
Development: http://localhost:3000
```

## ✅ Step 3: Build & Deploy

1. After adding variables, click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. You'll see: ✅ **"Deployment Successful"**
4. Click to open your live site

## ✅ Step 4: Verify Deployment

Visit your deployed site and check:

- [ ] Page loads without errors
- [ ] Smooth scrolling works (Lenis)
- [ ] Scroll animations trigger
- [ ] Routine generator works
- [ ] Google Analytics tracking
- [ ] AdSense ads display

## 📋 Quick Checklist

```
GitHub:
- [ ] Code committed and pushed
- [ ] .env.local NOT committed (check .gitignore)
- [ ] .env.example has all variable templates

Vercel:
- [ ] Project imported from GitHub
- [ ] All environment variables added
- [ ] Correct values for each variable
- [ ] Different URL for production

Post-Deployment:
- [ ] Site is live and accessible
- [ ] No build errors in Vercel logs
- [ ] Analytics working (check GA dashboard)
- [ ] AdSense ads showing (24h+ to show)
```

## 🔄 Continuous Deployment

Once connected, every `git push` to main branch will:
1. Trigger automatic build
2. Run tests
3. Deploy to preview URL
4. Deploy to production on merge to main

## 📊 Monitoring

In Vercel Dashboard:
- **Analytics** → View traffic, performance
- **Logs** → Check runtime errors
- **Deployments** → Rollback if needed

## ❌ Troubleshooting

### Build Fails
- Check Vercel logs for errors
- Verify all env vars are set correctly
- Run `npm run build` locally first

### Site Shows Errors
- Check Google Analytics ID format
- Verify AdSense ID is correct
- Check browser console for errors

### Analytics Not Tracking
- Wait 24-48 hours for GA to show data
- Verify `NEXT_PUBLIC_GA_ID` is set
- Check GA dashboard configuration

## 🎯 Next Steps After Deployment

1. **Update domain in env vars** if using custom domain
2. **Set up DNS** if using custom domain
3. **Enable HTTPS** (automatic on Vercel)
4. **Monitor performance** in Analytics
5. **Optimize images** if needed

---

**Need help?** Check Vercel docs: https://vercel.com/docs
