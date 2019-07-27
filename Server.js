const express = require("express");
const jwt = require("express-jwt"); // validate JWt and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from JSON web key set (JWKS) endpoint
//require("dotenv").config();
const checkScope = require("express-jwt-authz"); // validate JWT scopes

/*
JWT validation contains two steps
1) Validate the signature
2) Validate the claim (like issuer, audience, expiration date)
*/

const checkJwt = jwt({
  // dynamically provide a signing key based on the access token in the incoming request header and the signing key provided by the JWKS endpoint.
  // verifies the jwt signature with the below method. AUTH0 provide JWKS and with that key set our signature is validated.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: "https://myreactapp-dev.eu.auth0.com/.well-known/jwks.json"
  }),
  // validate the audience and the issuer
  audience: "http://localhost:3002",
  issuer: "https://myreactapp-dev.eu.auth0.com/",
  // this must match the algorithm selected in the AUTH0 Signing Algorithm
  algorithm: ["RS256"]
});

const app = express();

var allowCrossDomain = function(req, res, next) {
  console.log("AH?");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

app.use(allowCrossDomain);

app.get("/public", function(req, res) {
  res.json({
    message: "Hello from public API"
  });
});

// express supports declaring multiple arguments to validate the requests. If any checks fails, then the request will fail.
// This is for authentication
app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from private API"
  });
});

// In real world, it would read the subscriber id and fetch the data from database depending on the subscriber id
// This is for authorization. One way of doing authorization is by scope.
app.get("/courses", checkJwt, checkScope(["read:apiCourses"]), function(
  req,
  res
) {
  res.json([
    {
      id: 1,
      title: "React Redux",
      authorName: "Raja",
      category: "",
      slug: 0
    },
    {
      id: 2,
      title: "Using AUTH0 with react app",
      authorName: "Raja Kondla",
      category: "",
      slug: 0
    }
  ]);
});

function checkRole(role) {
  return function(req, res, next) {
    const grantedRoles = req.user["http://localhost:3000/roles"];
    if (Array.isArray(grantedRoles) && grantedRoles.includes(role)) {
      console.log("role success");
      return next();
    } else {
      console.log("Insufficient role");
      return res.status(401).send("Insufficient role");
    }
  };
}

app.get("/admin", checkJwt, checkRole("admin"), function(req, res) {
  res.json({
    message: "Hello from admin API"
  });
});

app.listen(3002);

console.log("API server listening on " + process.env.AUTH0_AUDIENCE);
