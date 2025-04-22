document.addEventListener('DOMContentLoaded', function() {
    // Google Form configuration
    const formConfig = {
        formId: '1FAIpQLSfS5IL1GMOQu7bwehu2iwFmybqqLTRz2O4G7s4GRbGgHSVjjQ',
        fields: {
            name: 'entry.2029503187',       // Submitting individual's name
            attendance: 'entry.1392189701',
            seats: 'entry.619132016',       // Submitting '1' for the individual
            table: 'entry.1453828050',       // Submitting individual's table
            notes: 'entry.582075689'        // Submitting individual's notes/role + invitationId
        }
        // Optional: Add a field for invitationId if you add it to your Google Form
        // invitationIdField: 'entry.YOUR_INVITATION_ID_FIELD'
    };

    // --- NEW: Global variable to hold guest list ---
    let guestList = [];

    // DOM elements (keep as is)
    const elements = {
        nameInput: document.getElementById('name'),
        checkButton: document.getElementById('checkRsvp'),
        resultCard: document.getElementById('resultCard'),
        notFoundDiv: document.getElementById('notFound'),
        foundDiv: document.getElementById('found'),
        guestNameSpan: document.getElementById('guestName'),
        seatCountSpan: document.getElementById('seatCount'),
        tableNumberSpan: document.getElementById('tableNumber'),
        additionalInfoP: document.getElementById('additionalInfo'), // Will show individual's role/notes
        tryAgainDiv: document.getElementById('tryAgain'),
        tryAgainButton: document.getElementById('tryAgainButton'),
        confirmationModal: document.getElementById('confirmationModal'),
        confirmationMessage: document.getElementById('confirmationMessage'),
        closeModalButton: document.getElementById('closeModal'),
        loadingModal: document.getElementById('loadingModal'),
        hiddenIframe: document.getElementById('hiddenIframe'),
        searchFormSection: document.getElementById('searchForm'),
        confirmIdentitySection: document.getElementById('confirmIdentitySection'),
        resultSection: document.getElementById('resultSection'),
        confirmNameSpan: document.getElementById('confirmName'),
        confirmDetailsSpan: document.getElementById('confirmDetails'),
        confirmYesButton: document.getElementById('confirmYes'),
        confirmNoButton: document.getElementById('confirmNo'),
        attendanceSection: document.getElementById('attendanceSection'),
        // --- NEW: Add an element for loading/error messages for guest list ---
        guestListStatus: document.createElement('p') // Create dynamically or add to HTML
    };
    // Style the status message (optional)
    elements.guestListStatus.className = "text-center text-sm text-slate-500 mt-2";
    // Add it to the DOM, e.g., after the search button
    elements.searchFormSection.querySelector('.card').appendChild(elements.guestListStatus);


    // Current guest data (will hold the *individual* guest object)
    let currentGuest = null;
    let matchedGuests = []; // Will likely only hold one match now, but keep for structure
    let selectedGuestIndex = 0; // Keep for structure

    // --- NEW: Function to load guest data ---
    async function loadGuestList() {
        elements.guestListStatus.textContent = "Loading guest list...";
        elements.checkButton.disabled = true; // Disable search while loading
        try {
            const response = await fetch('guests.json'); // Fetch the local JSON file
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            guestList = await response.json();
            console.log("Guest list loaded:", guestList.length, "guests");
            elements.guestListStatus.textContent = ""; // Clear status on success
            elements.checkButton.disabled = false; // Re-enable search
            initEventListeners(); // Initialize listeners *after* data is loaded
        } catch (error) {
            console.error("Could not load guest list:", error);
            elements.guestListStatus.textContent = "Error loading guest list. Please try refreshing.";
            // Keep button disabled or add specific error handling
            elements.checkButton.disabled = true;
        }
    }

    // Initialize event listeners (NOW CALLED BY loadGuestList)
    function initEventListeners() {
        // Check button
        elements.checkButton.addEventListener('click', handleCheckButtonClick);

        // Try again button
        elements.tryAgainButton.addEventListener('click', handleTryAgainClick);

        // Confirm Yes button
        elements.confirmYesButton.addEventListener('click', handleConfirmYesClick);

        // Confirm No button (logic might simplify if only one match expected)
        elements.confirmNoButton.addEventListener('click', handleConfirmNoClick);

        // Close modal button
        elements.closeModalButton.addEventListener('click', function() {
            elements.confirmationModal.classList.remove('show');
        });

        // Input field listeners (keep as is)
        elements.nameInput.addEventListener('input', function() {
            elements.nameInput.classList.remove('border-red-500');
        });
        elements.nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                elements.checkButton.click();
            }
        });
    }

    // Attach submit attendance event listener (keep as is)
    function attachSubmitAttendanceListener() { /* ... function content unchanged ... */ }

    // --- MODIFIED: Simplified Search Logic ---
    // Function to find guests by name (case insensitive, exact or partial match on NAME field only)
    function findGuests(name) {
        const searchNameLower = name.toLowerCase();
        // Now searches the loaded guestList
        return guestList.filter(guest => {
            const guestNameLower = guest.name.toLowerCase();
            // Prioritize exact match, then partial contains, then partial word match
            return guestNameLower === searchNameLower ||
                   guestNameLower.includes(searchNameLower) ||
                   searchNameLower.split(' ').some(part => guestNameLower.includes(part) && part.length > 2);
        });
    }


    // Handle check button click (logic largely the same, calls updated findGuests)
    function handleCheckButtonClick() {
        const name = elements.nameInput.value.trim();

        if (name === '') {
            // Shake animation (keep as is)
            elements.nameInput.classList.add('border-red-500', 'animate-shake');
            setTimeout(() => elements.nameInput.classList.remove('animate-shake'), 500);
            return;
        }

        // Find matching individuals
        matchedGuests = findGuests(name);

        if (matchedGuests.length > 0) {
            // Show identity confirmation for the first match
            // If multiple matches, the "No, try again" button handles showing the next
            selectedGuestIndex = 0;
            showIdentityConfirmation(matchedGuests[selectedGuestIndex]); // No need to pass searchedName now
        } else {
            // Show not found result
            showNotFoundResult();
        }
    }

    // Handle confirm yes click (logic the same)
    function handleConfirmYesClick() { /* ... function content unchanged ... */ }

    // Handle confirm no click (logic the same, handles multiple partial matches)
    function handleConfirmNoClick() { /* ... function content unchanged ... */ }

    // Handle try again click (logic the same)
    function handleTryAgainClick() { /* ... function content unchanged ... */ }

    // Handle submit attendance (logic the same)
    function handleSubmitAttendance() { /* ... function content unchanged ... */ }

    // --- MODIFIED: Show Identity Confirmation ---
    // Shows confirmation for the *individual* found
    function showIdentityConfirmation(guest) { // Removed searchedName parameter
        elements.searchFormSection.classList.add('hidden');
        elements.resultSection.classList.add('hidden');

        // --- REVERTED: Heading is always "Is this you?" ---
        const confirmHeading = elements.confirmIdentitySection.querySelector('h2.title');
        confirmHeading.textContent = "Is this you?";

        // Update confirmation details for the individual
        elements.confirmNameSpan.textContent = guest.name;

        // Create details text for the individual
        let detailsText = `Table: ${guest.table || "Head Table"}`; // Show individual table
        // Use role or notes for context
        if (guest.role) {
             detailsText += ` • Role: ${guest.role}`;
        }
        if (guest.notes) {
            detailsText += ` • Note: ${guest.notes}`; // Display notes from JSON
        }
         // Clarify seat allocation
        detailsText += ` • (1 seat allocated)`;


        elements.confirmDetailsSpan.textContent = detailsText;

        // Show confirmation section (keep as is)
        elements.confirmIdentitySection.classList.remove('hidden');
        setTimeout(() => {
            elements.confirmIdentitySection.querySelector('.result-card').classList.add('fade-in');
        }, 10);
    }

    // --- MODIFIED: Show Guest Details ---
    // Shows details for the *individual*
    function showGuestDetails(guest) {
        elements.confirmIdentitySection.classList.add('hidden');
        elements.resultSection.classList.remove('hidden');

        elements.notFoundDiv.classList.add('hidden');
        elements.foundDiv.classList.remove('hidden');

        // Update with individual's details
        elements.guestNameSpan.textContent = guest.name;
        elements.seatCountSpan.textContent = "1"; // Individual RSVP = 1 seat
        document.getElementById('eventLocation').innerHTML = "Function Hall, Ma. Lina Building<br>National Highway, Dakit, Bogo City, Cebu"; // Location is static

        elements.tableNumberSpan.textContent = guest.table || "Head Table"; // Individual's table

        // Use role or notes for additional info display
        let infoText = guest.role ? `Role: ${guest.role}` : '';
        if(guest.notes) {
             infoText += (infoText ? ' | ' : '') + `Note: ${guest.notes}`;
        }
        elements.additionalInfoP.textContent = infoText || "We look forward to seeing you!";


        resetAttendanceSection(); // Keep as is

        // Show result card (keep as is)
        elements.resultCard.classList.add('show');
        elements.tryAgainDiv.classList.remove('hidden');
    }

    // Show not found result (logic the same)
    function showNotFoundResult() { /* ... function content unchanged ... */ }


    // --- MODIFIED: Submit Form Functions ---
    // Submit data for the *individual*
    function submitFormDirectly(guest, attendanceValue) {
        const formData = new FormData();
        formData.append(formConfig.fields.name, guest.name); // Individual's name
        formData.append(formConfig.fields.attendance, attendanceValue);
        formData.append(formConfig.fields.seats, "1"); // Always 1 seat for individual RSVP
        formData.append(formConfig.fields.table, guest.table || "Head Table"); // Individual's table

        // Combine notes/role/ID for the notes field to help host grouping
        let notesToSubmit = `Role: ${guest.role || 'Guest'} | Invitation ID: ${guest.invitationId || 'N/A'} | Notes: ${guest.notes || ''}`;
        formData.append(formConfig.fields.notes, notesToSubmit.substring(0, 400)); // Limit notes length if needed

        // Optional: Submit invitationId to a dedicated field if configured
        // if (formConfig.invitationIdField) {
        //     formData.append(formConfig.invitationIdField, guest.invitationId || 'N/A');
        // }

        const formUrl = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;

        fetch(formUrl, { /* ... rest of fetch unchanged ... */ })
        .then(() => { /* ... success unchanged ... */ })
        .catch(error => { /* ... error/fallback unchanged ... */ });
    }

    function submitViaIframe(guest, attendanceValue) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;
        form.target = 'hiddenIframe';

        let notesToSubmit = `Role: ${guest.role || 'Guest'} | Invitation ID: ${guest.invitationId || 'N/A'} | Notes: ${guest.notes || ''}`;

        const fields = [
            { name: formConfig.fields.name, value: guest.name },
            { name: formConfig.fields.attendance, value: attendanceValue },
            { name: formConfig.fields.seats, value: "1" }, // Individual seat
            { name: formConfig.fields.table, value: guest.table || "Head Table" },
            { name: formConfig.fields.notes, value: notesToSubmit.substring(0, 400) }
        ];
        // Optional: Add invitationId field if configured
        // if (formConfig.invitationIdField) {
        //     fields.push({ name: formConfig.invitationIdField, value: guest.invitationId || 'N/A' });
        // }

        fields.forEach(field => { /* ... input creation unchanged ... */ });

        document.body.appendChild(form);
        try { /* ... form submission unchanged ... */ }
        catch (error) { /* ... error handling unchanged ... */ }
    }

    // Show success/error messages (functions unchanged)
    function showSuccessMessage(isAttending) { /* ... function content unchanged ... */ }
    function showErrorMessage() { /* ... function content unchanged ... */ }

    // Reset attendance section (function unchanged)
    function resetAttendanceSection() { /* ... function content unchanged ... */ }

    // Iframe load listener (keep as is)
    elements.hiddenIframe.addEventListener('load', function() { /* ... function content unchanged ... */ });

    // --- NEW: Start loading the guest list when DOM is ready ---
    loadGuestList();

}); // End DOMContentLoaded