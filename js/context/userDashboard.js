class UserDashboard{
    constructor(){};

    // note: this sanitize function may be insufficient to cover all code injection attacks,
    // use a proper sanitizing function
    static escapeHTML(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    static htmlCard(name, board_id, repr, timestamp) {
        // const safeName = escapeHTML(name);
        // const safeBoardId = escapeHTML(board_id);
        // const safeRepr = escapeHTML(repr);
        // const safeTimestamp = escapeHTML(timestamp);

        return `
            <div id="card-board-${board_id}">
                <div class="card">
                    <div class="card-content">
                        <strong><p>${name}</p></strong>
                        <p class="card-date">Created on ${timestamp}</p>
                    </div>
                    <div class="card-content">
                        <button class="button secondary-container" onclick="loadNewRepr('${repr}')">Load it!</button>
                        <button class="button secondary-container" onclick="handleDeleteBoard('${board_id}')">Delete</button>
                    </div>
                </div>
                <div class="horizontal-sep">
            </div>
        `;
    }

    addBoard({ name, board_id, repr, timestamp }) {
        const newBoard = UserDashboard.htmlCard(name, board_id, repr, timestamp);
        const boardsList = document.getElementById("user-boards");

        boardsList.insertAdjacentHTML("beforeend", newBoard);
    }

    removeBoard(board_id) {
        const boardCard = document.getElementById(`card-board-${board_id}`);
        boardCard.remove();
    }

    displayUserProfile() {
        this.hideForms();
        const userProfile = document.getElementById("user-profile");
        userProfile.classList.remove("hidden");

        const { username, boards } = authContext.user;

        const usernameElement = document.getElementById("user-name");
        usernameElement.innerText = username;

        const boardsList = document.getElementById("user-boards");
        boardsList.innerHTML = "";

        boards.map((board) => {
            this.addBoard(board);
        });
    }

    showLoginForm(){
        document.getElementById("user-dashboard").classList.remove("hidden"); 
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
        document.getElementById("user-dashboard").classList.add("hidden"); 
    }
}