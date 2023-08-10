
let logoutTimer;
let countdownInterval;
const LOGOUT_TIME = 10 * 1000; // 0.5 minutes (or 30 seconds) in milliseconds

function startLogoutTimer() {
  // Clear the previous timer, if any
  clearTimeout(logoutTimer);
  clearInterval(countdownInterval);

  let startTime = Date.now();
  // Start a new timer to redirect the user after 0.5 minutes
  logoutTimer = setTimeout(() => {
  	localStorage.clear();
  	alert("Su sesión expiró, favor de iniciar sesión.")
    window.location = "https://imadata.webflow.io/";
    startLogoutTimer(); // Start the logout timer again
    
  }, LOGOUT_TIME); 

  // Start a countdown timer
  countdownInterval = setInterval(() => {
    let elapsed = Date.now() - startTime;
    let remaining = LOGOUT_TIME - elapsed;
  }, 1000); // update every second
}


// Call this function whenever the user interacts with the page
function resetLogoutTimer() {
  startLogoutTimer();
}

// Call this function when the user logs in
function cancelLogoutTimer() {
  clearTimeout(logoutTimer);
  clearInterval(countdownInterval);
}

// Start the timer when the page loads
if (localStorage.getItem("_ms-mem") || localStorage.getItem("_ms-midd")){
    console.log("dentro de if")
    startLogoutTimer();
} else {
    console.log('no hay sesiones')
}

// Add event listeners to reset timer on any page activity
document.addEventListener('mousemove', resetLogoutTimer);
document.addEventListener('keypress', resetLogoutTimer);
document.addEventListener('touchstart', resetLogoutTimer);
