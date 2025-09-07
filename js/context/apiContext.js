class ApiContext {
    constructor() { }

    async signup(username, email, password) {
        const payload = { username, email, password };

        /* fetching data for the signup to the php related module */
        try {
            const response = await fetch("../php/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const resData = await response.json();
            if (resData.status === "success") {
                return {
                    user: resData.user,
                    token: resData.token,
                    loggedIn: true
                };
            }
            else {
                alert(resData.message);
                return {
                    user: null,
                    token: null,
                    loggedIn: false
                }
            }
        }
        catch (error) {
            console.error("Error: ", error);
            alert("An unexpected error occurred");
            return {
                user: null,
                token: null,
                loggedIn: false
            };
        }
    }

    async login(username, password) {
        const payload = { username, password };

        /* fetching data for the login to the php related module */
        try {
            const response = await fetch("../php/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const resData = await response.json();
            if (resData.status === "success") {
                return {
                    user: resData.user,
                    token: resData.token,
                    loggedIn: true
                };
            }
            else {
                alert(resData.message);
                return {
                    user: null,
                    token: null,
                    loggedIn: false
                }
            }
        }
        catch (error) {
            console.error("Error: ", error);
            alert("An unexpected error occurred");
            return {
                user: null,
                token: null,
                loggedIn: false
            };
        }
    }

    async saveBoard(boardName, repr) {
        try {
            /* fetching data to save the board to the php related module */
            const response = await fetch("../php/save.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: authContext.user.user_id,
                    board: repr,
                    name: boardName
                })
            });
            const data = await response.json();

            alert("Board saved successfully!");
            return data;
        }
        catch (error) {
            console.error("Error: ", error);
            alert("An error occurred while saving the board!");
        }
    }

    async deleteBoard(boardId) {
        try {
            /* fetching data to delete the board to the php related module */
            const response = await fetch("../php/delete.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: authContext.user.user_id,
                    board_id: boardId
                })
            });
            const data = await response.json();
        }
        catch (error) {
            console.error("Error: ", error);
            alert("An error occurred while deleting the board!");
        }
    }
}