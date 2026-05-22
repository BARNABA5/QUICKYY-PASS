// Google Web App Target URL
const API_URL = "https://script.google.com/macros/s/AKfycbxKu6iSVarn_Euk94kjVBtL3fhnSfvAWYjjxL_ikh3G5FnhAFsG9WcZxUtX_d1RBwro5A/exec";

document.getElementById('submitBtn').addEventListener('click', async function() {
    // 1. Capture values safely from the updated input fields
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const event = document.getElementById('eventName').value.trim();
    const venue = document.getElementById('eventVenue').value.trim();
    const price = document.getElementById('eventPrice').value.trim();

    // 2. Clear validation check
    if (!name || !phone || !event || !venue || !price) {
        alert("Please fill in all booking details before saving.");
        return;
    }

    // Adjust button UI to protect against multi-clicks
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = "Saving Booking... Please wait";
    submitBtn.disabled = true;

    // 3. Create the data object structure matching your Google Sheet parameters
    const bookingData = {
        name: name,
        phone: phone,
        event: event,
        venue: venue,
        price: price
    };

    try {
        // 4. Fire the data cross-origin via POST
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // Bypasses browser restriction blocks on macro scripts
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        // 5. Success handling block
        alert("Booking saved successfully! Please complete your M-PESA payment.");
        window.location.href = `ticket.html?phone=${encodeURIComponent(phone)}`;

    } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Something went wrong while saving your booking. Please try again.");
        
        // Reset button UI if something fails
        submitBtn.textContent = "Save Booking";
        submitBtn.disabled = false;
    }
});
