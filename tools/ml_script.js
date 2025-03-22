async function checkMLAccount() {
    let mlId = document.getElementById("ml_id").value;
    let serverId = document.getElementById("server_id").value;
    let result = document.getElementById("ml_result");

    // Validasi input
    if (!mlId || !serverId) {
        result.innerHTML = "⚠️ Please enter both ML ID and Server ID!";
        result.style.color = "red";
        return;
    }

    result.innerHTML = "🔍 Checking...";

    try {
        let response = await fetch(`https://mlbb-x.vercel.app/api/v1/user/profile?user_id=${mlId}&zone_id=${serverId}`);
        let data = await response.json();

        if (data.status === "success" && data.data) {
            let user = data.data;
            let creationDate = user.created_at || "Unknown";
            let accountAge = user.account_age || "Unknown";
            let username = user.username || `ML_Player_${mlId.slice(-4)}`;
            let server = `Server ${serverId}`;

            result.innerHTML = `
                ✅ <strong>Account Found!</strong><br>
                🏷️ <strong>Username:</strong> ${username} <br>
                📅 <strong>Created On:</strong> ${creationDate} <br>
                ⏳ <strong>Account Age:</strong> ${accountAge} <br>
                🌍 <strong>Original Server:</strong> ${server}
            `;
            result.style.color = "green";
        } else {
            result.innerHTML = "❌ Account Not Found!";
            result.style.color = "red";
        }
    } catch (error) {
        result.innerHTML = "⚠️ Error fetching data. Try again later!";
        result.style.color = "red";
    }
}