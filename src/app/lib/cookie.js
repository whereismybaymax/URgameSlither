const express = require('express');
const router = express.Router();
const shortid = require('shortid');


/* Set up a cookie first. */

function cookie(req, res, next) {
	var cookie = req.cookies.cookie_id; //checking if a cookie exists
	if (cookie === undefined) {
		cookie = shortid.generate();
		res.cookie('cookie_id', cookie);
	}
	req.cookies.cookie_id = cookie;
	res.locals.cookie_id = cookie;
	next();
	
}

module.exports = cookie;