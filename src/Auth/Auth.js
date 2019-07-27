import auth0 from "auth0-js";

// store outside class for private variables
let _accessToken = "";
let _expiresAt = "";
//eslint-disable-next-line
let _idToken = "";
let _scopes = "";

class Auth {
  constructor() {
    // this.history = history;
    this.history = null;

    this.str = "";
    this.logout = this.logout.bind(this);
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:apiCourses";

    this.auth0 = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.AUTH0_CALLBACK_URL,
      audience: process.env.AUTH0_AUDIENCE,
      // we are requesting tokens in response
      // id_token is the openID identifier token
      // token is the OAuth access token
      responseType: "token id_token",
      // scope we specify openId means we need openID for authentication
      // we are requesting user profile scope we get name, nickname, picture, updated at depending on identity providers. email is not included in profile we request that too.
      //  user is presented by screen so that he/she can approve our scope.
      scope: this.requestedScopes
    });
  }

  get getStr() {
    return this.str;
  }

  set setStr(value) {
    this.str = value;
  }

  login = () => {
    //  if (!localStorage.getItem("isUserLoggedIn"))
    this.auth0.authorize();
  };

  set routeHistory(value) {
    this.history = value;
  }

  // class property
  handleAuthentication = () => {
    this.auth0.parseHash((err, result) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        this.history.push("/");
      } else if (err) {
        alert(`Error: ${err.error}. Check console log`);
        this.history.push("/");
        console.log(err);
      }
    });
  };

  setSession = result => {
    // const expires_at = JSON.stringify(
    //   result.expiresIn * 1000 + new Date().getTime()
    // );

    // const scopes = result.scope || this.requestedScopes || "";
    // localStorage.setItem("access_token", result.accessToken);
    // localStorage.setItem("expires_at", expires_at);
    // localStorage.setItem("id_token", result.idToken);
    // localStorage.setItem("scopes", scopes);
    sessionStorage.setItem("callRenewalToken", true);
    _expiresAt = result.expiresIn * 1000 + new Date().getTime();
    _scopes = result.scope || this.requestedScopes || "";
    _accessToken = result.accessToken;
    _idToken = result.idToken;
    this.scheduleRenewlToken();
  };

  get isAuthenticated() {
    // const expiresAt = localStorage.getItem("expires_at");
    // return new Date().getTime() < expiresAt;
    return new Date().getTime() < _expiresAt;
  }

  /*
   when login with google and logout and then login, asking for login. But when I login with username and password not asking for passord when logged out and login. auth0 cookie stores in the browser and check if cookie exist 
  */
  logout() {
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("expires_at");
    // localStorage.removeItem("id_token");
    // localStorage.removeItem("scopes");

    _accessToken = "";
    _expiresAt = "";
    _idToken = "";
    _scopes = "";
    this.auth0.logout({
      clientID: process.env.AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    });
  }

  getAccessToken() {
    // const accessToken = localStorage.getItem("access_token");
    // if (!accessToken) {
    //   throw new Error("No access token found");
    // }
    // return accessToken;

    if (_accessToken === "") {
      throw new Error("No access token found");
    }
    return _accessToken;
  }

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      return cb(this.userProfile, err);
    });
  };

  hasScope = scopes => {
    // const grantedScopes = (localStorage.getItem("scopes") || "").split(" ");
    // return scopes.every(scope => grantedScopes.includes(scope));
    const grantedScopes = _scopes.split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  };

  renewToken = callback => {
    this.auth0.checkSession({}, (error, result) => {
      if (error) {
        alert(`Error: ${error.error} -${error.error_description}`);
      } else {
        this.setSession(result);
      }

      if (callback) callback(error, result);
    });
  };

  scheduleRenewlToken = () => {
    const delay = _expiresAt - Date.now();
    if (delay > 0)
      setTimeout(() => {
        this.renewToken();
      }, delay);
  };
}

const authObj = new Auth();
export default authObj;

/*
 the openID will issue standard JWT like
{
 iss: (issuer)
 sub: (subject)
 aud: (audience)
 exp: (expiration time)
 nbf: (not before)
 lat  (issued at)
}
*/
