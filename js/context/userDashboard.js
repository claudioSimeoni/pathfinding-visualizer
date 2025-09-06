class UserDashboard {
    constructor() { };

    static htmlCard(name, board_id, repr, timestamp) {
        /* Basic HTML escape */
        const escapeHTML = (str) =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        /* Escape for JavaScript strings inside HTML attributes */
        const escapeJS = (str) =>
            String(str)
                .replace(/\\/g, "\\\\")
                .replace(/'/g, "\\'")
                .replace(/"/g, '\\"')
                .replace(/\r/g, "\\r")
                .replace(/\n/g, "\\n")
                .replace(/</g, "\\x3C")
                .replace(/>/g, "\\x3E");

        let safeName = escapeHTML(name);
        let safeBoardId = escapeHTML(board_id);
        let safeRepr = escapeJS(repr);
        let safeTimestamp = escapeHTML(timestamp);

        return `
            <div id="card-board-${safeBoardId}">
                <div class="card">
                    <div class="card-content">
                        <strong><p>${safeName}</p></strong>
                        <p class="card-date">Created on ${safeTimestamp}</p>
                    </div>
                    <div class="card-content">
                        <button class="button secondary-container" onclick="loadNewRepr('${safeRepr}')">Load it!</button>
                        <button class="button secondary-container" onclick="handleDeleteBoard('${safeBoardId}')">Delete</button>
                    </div>
                </div>
                <div class="horizontal-sep"></div>
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

    showLoginForm() {
        document.getElementById("signup-form").classList.add("hidden");
        document.getElementById("login-form").classList.remove("hidden");
    }

    showSignupForm() {
        document.getElementById("login-form").classList.add("hidden");
        document.getElementById("signup-form").classList.remove("hidden");
    }

    hideForms() {
        document.getElementById("login-form").classList.add("hidden");
        document.getElementById("signup-form").classList.add("hidden");
    }
}