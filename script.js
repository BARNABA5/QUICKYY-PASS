// Paste your deployed Google Web App URL here
const API_URL = "https://script.google.com/macros/s/AKfycbxKu6iSVarn_Euk94kjVBtL3fhnSfvAWYjjxL_ikh3G5FnhAFsG9WcZxUtX_d1RBwro5A/exec";

document.getElementById('submitBtn').addEventListener('click', async function() {
    // 1. Capture values from input fields
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const event = document.getElementById('eventName').value.trim();
    const venue = document.getElementById('eventVenue').value.trim();
    const price = document.getElementById('eventPrice').value.trim();

    // 2. Simple form validation
    if (!name || !phone || !event || !venue || !price) {
        alert("Please fill in all booking details before saving.");
        return;
    }

    // Change button text to show activity status
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = "Saving Booking... Please wait";
    submitBtn.disabled = true;

    // 3. Assemble the data payload
    const bookingData = {
        name: name,
        phone: phone,
        event: event,
        venue: venue,
        price: price
    };

    try {
        // 4. Send the POST request to Google Sheets
        const response = await fetch(API_URL, {
            method: "POST",
            mode: "no-cors", // Required to bypass CORS barriers with Google Apps Script Web Apps
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        // 5. Successful execution fallback
alert("Booking saved successfully! Please complete your M-PESA payment.");

// FIXED: Changed 'tickets.html' to 'ticket.html' to match your actual file name
window.location.href = `ticket.html?phone=${encodeURIComponent(phone)}`;
    } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Something went wrong while saving your booking. Please try again.");
        
        // Reset button status on failure
        submitBtn.textContent = "Save Booking";
        submitBtn.disabled = false;
    }
});
