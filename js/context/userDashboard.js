class UserDashboard{
    showLoginForm(){
        document.getElementById("signup-form").classList.add("hidden"); 
        document.getElementById("login-form").classList.remove("hidden"); 
    }

    showSignupForm(){
        document.getElementById("login-form").classList.add("hidden");         
        document.getElementById("signup-form").classList.remove("hidden"); 
    }

    hideForms(){
        document.getElementById("login-form").classList.add("hidden");         
        document.getElementById("signup-form").classList.add("hidden");
    }
}