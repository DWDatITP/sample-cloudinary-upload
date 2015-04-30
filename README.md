# Sample Express Cloudinary Heroku App

This is a sample app showing how to get an express app
running with the cloudinary add-on at heroku.

## Install

To install and run this app:

  * clone the code:
  * `git clone ...`
  * cd into the directory:
  * `cd sample-cloudinary-upload`
  * install npm modules from package.json:
  * `npm install`
  * Set up your heroku app and cloudinary environment variables (see below)
  * `env $(cat .env) nodemon server.js`

### Set up Heroku App and Cloudinary

If you haven't already created your heroku app, run `heroku create`.
Check to make sure your heroku app is available by typing `heroku info`.

Add the cloudinary addon:
`heroku addons:add cloudinary`

After you do this, you should see a `CLOUDINARY_URL` config variable when you
type: `heroku config`.

Copy this value and paste it into a `.env` file. Your file should have one
line looking like:

```
CLOUDINARY_URL=your-pasted-url-here
```
